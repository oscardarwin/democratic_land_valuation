import { v as head, w as attr } from "../../chunks/index.js";
import "surrealdb";
import "@surrealdb/wasm";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const MAP_CONTAINER_ID = "map-container";
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css"/>`);
    });
    $$renderer2.push(`<div${attr("id", MAP_CONTAINER_ID)} class="svelte-1uha8ag"></div>`);
  });
}
export {
  _page as default
};
