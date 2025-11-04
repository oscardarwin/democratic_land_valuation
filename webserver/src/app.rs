use crate::maplibre::Map;
use anyhow::Result;
use gloo_net::http::Request;
use js_sys::JSON;
use leptos::ev;
use leptos::prelude::*;
use leptos::task::spawn_local;
use leptos::wasm_bindgen::prelude::*;
use leptos::web_sys;
use leptos::web_sys::Document;
use leptos_meta::{provide_meta_context, Meta, Title};
use serde::Serialize;
use serde_wasm_bindgen::to_value;

#[component]
pub fn App() -> impl IntoView {
    #[cfg(feature = "hydrate")]
    Effect::new(|_| {
        spawn_local(async move {
            web_sys::console::log_1(&"Mounting map...".into());
            if let Some(window) = leptos::web_sys::window() {
                if let Some(document) = window.document() {
                    spawn_local_setup_map(&document);
                }
            }
        });
    });

    view! {
        <>
            <script src="/pkg/maplibre-gl.js"></script>
            <link rel="stylesheet" href="/pkg/maplibre-gl.css"/>
            <main class="h-screen w-screen">
                <div id="map" style="height:100vh; width:100vw"></div>
            </main>
        </>
    }
}

#[cfg(feature = "hydrate")]
fn spawn_local_setup_map(_document: &Document) {
    use std::rc::Rc;

    spawn_local(async move {
        let style = JsValue::from_str("http://127.0.0.1:8080/styles/uk/style.json");

        let container = document()
            .get_element_by_id("map")
            .expect("map container not found")
            .into();

        let options = js_sys::Object::new();

        js_sys::Reflect::set(&options, &JsValue::from_str("container"), &container).unwrap();
        js_sys::Reflect::set(
            &options,
            &JsValue::from_str("center"),
            &to_value(&[-0.1278, 51.5074]).unwrap(),
        )
        .unwrap();
        js_sys::Reflect::set(
            &options,
            &JsValue::from_str("zoom"),
            &JsValue::from_f64(14.0),
        )
        .unwrap();
        js_sys::Reflect::set(&options, &JsValue::from_str("style"), &style).unwrap();

        web_sys::console::log_1(&"Setting up map...".into());
        let map = Rc::new(Map::new(&options.into()));

        let mut selected_id: Option<String> = None;
        let map_clone = map.clone();

        let closure = Closure::wrap(Box::new(move |e: JsValue| {
            let features = js_sys::Reflect::get(&e, &JsValue::from_str("features")).unwrap();
            let features_array = js_sys::Array::from(&features);
            if features_array.length() == 0 {
                return;
            }

            let feature = features_array.get(0);

            web_sys::console::log_1(&feature);

            let feature_id = js_sys::Reflect::get(&feature, &JsValue::from_str("id"))
                .ok()
                .and_then(|v| v.as_string());

            let Some(new_id) = feature_id else {
                return;
            };

            if let Some(old_id) = selected_id.clone() {
                let params = js_sys::Object::new();
                js_sys::Reflect::set(
                    &params,
                    &JsValue::from_str("source"),
                    &JsValue::from_str("parcels"),
                )
                .unwrap();
                js_sys::Reflect::set(
                    &params,
                    &JsValue::from_str("sourceLayer"),
                    &JsValue::from_str("parcels"),
                )
                .unwrap();
                js_sys::Reflect::set(
                    &params,
                    &JsValue::from_str("id"),
                    &JsValue::from_str(&old_id),
                )
                .unwrap();
                let state = js_sys::Object::new();
                js_sys::Reflect::set(
                    &state,
                    &JsValue::from_str("selected"),
                    &JsValue::from_bool(false),
                )
                .unwrap();
                map_clone.setFeatureState(&params.into(), &state.into());
            }

            let params = js_sys::Object::new();
            js_sys::Reflect::set(
                &params,
                &JsValue::from_str("source"),
                &JsValue::from_str("parcels"),
            )
            .unwrap();
            js_sys::Reflect::set(
                &params,
                &JsValue::from_str("sourceLayer"),
                &JsValue::from_str("parcels"),
            )
            .unwrap();
            js_sys::Reflect::set(
                &params,
                &JsValue::from_str("id"),
                &JsValue::from_str(&new_id),
            )
            .unwrap();
            let state = js_sys::Object::new();
            js_sys::Reflect::set(
                &state,
                &JsValue::from_str("selected"),
                &JsValue::from_bool(true),
            )
            .unwrap();
            map_clone.setFeatureState(&params.into(), &state.into());

            selected_id = Some(new_id);
        }) as Box<dyn FnMut(JsValue)>);

        map.on("click", "parcels", closure.as_ref().unchecked_ref());
        closure.forget();
    });
}

pub async fn load_map_style(url: &str) -> JsValue {
    let resp = Request::get(url)
        .send()
        .await
        .expect("failed to get map style sheet");

    let text = resp
        .text()
        .await
        .expect("failed to extract text from response");
    let js_obj = JSON::parse(&text)
        .expect("failed to extract json")
        .unchecked_into::<JsValue>();
    js_obj
}

#[component]
pub fn Shell(leptos_options: LeptosOptions) -> impl IntoView {
    provide_meta_context();

    view! {
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <Title text="Somers Democratic LVT"/>
                <Meta name="description" content="MapLibre demo"/>
                <link rel="stylesheet" href="/pkg/maplibre-gl.css"/>
                <HydrationScripts options=leptos_options.clone() />
            </head>
            <body>
                <App />
            </body>
        </html>
    }
}
