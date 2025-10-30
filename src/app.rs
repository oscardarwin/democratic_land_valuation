use leptos::ev;
use leptos::prelude::*;
use leptos::wasm_bindgen::JsCast;
use leptos::web_sys::{window, Document, HtmlElement};
use leptos_meta::provide_meta_context;

#[component]
pub fn App() -> impl IntoView {
    // This runs once after the page is loaded (client-side only)
    #[cfg(feature = "hydrate")]
    window_event_listener(ev::load, |_| {
        leptos::logging::log!("window loaded, setting up map");

        if let Some(window) = window() {
            if let Some(document) = window.document() {
                setup_map(&document);
            }
        }
    });

    view! {
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

            <main class="h-screen w-screen">
                <div id="map" style="height: 100vh; width: 100vw;"></div>
            </main>
        </>
    }
}

#[cfg(feature = "hydrate")]
fn setup_map(document: &Document) {
    let script = r#"
        const map = L.map('map').setView([51.5074, -0.1278], 12);
        L.tileLayer('http://localhost:8080/data/uk/{z}/{x}/{y}.pbf', {
            maxZoom: 19,
            attribution: 'Contains OS data © Crown copyright and database right 2025'
        }).addTo(map);

        fetch('/parcels_wgs84.geojson')
          .then(resp => resp.json())
          .then(data => {
            L.geoJSON(data, {
              style: {
                color: '#ff7800',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.1
              },
              onEachFeature: (feature, layer) => {
                const id = feature.properties?.id || 'Unknown';
                layer.bindPopup(`<b>Parcel ID:</b> ${id}`);
              }
            }).addTo(map);
          });
    "#;

    if let Ok(el) = document.create_element("script") {
        if let Ok(script_el) = el.dyn_into::<HtmlElement>() {
            script_el.set_inner_html(script);
            let _ = document.body().unwrap().append_child(&script_el);
        }
    }
}

#[component]
pub fn Shell(leptos_options: LeptosOptions) -> impl IntoView {
    provide_meta_context();

    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options=leptos_options.clone() />
                <HydrationScripts options=leptos_options.clone() />
                <link rel="stylesheet" href="/pkg/somers-democratic-lvt.css"/>
                <title>"Somers Democratic LVT"</title>
            </head>
            <body>
                <App />
            </body>
        </html>
    }
}
