<script>
  import "leaflet/dist/leaflet.css";
  import {LeafletMap} from "../services/leaflet-map.js";
  import {onMount, getContext} from "svelte";

  const placeMarkService = getContext("PlaceMarkService");

  const mapConfig = {
    location: {lat: 49.019871, lng: 12.09901},
    zoom: 8,
    minZoom: 1,
  };

  let map = null;
  export async function showCategoryList(categoryList) {
    if (categoryList) {
      for (const category of categoryList) {
        map.addLayerGroup(category.title);
        const tempCat = await placeMarkService.getCategory(category._id);
        if (!tempCat) break;
        category.pois = tempCat.pois;
        for (const poi_idx in category.pois) {
          const poi = category.pois[poi_idx];
          map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name, category.title);
        }
      }
      map.updateLayerControl();
    }
  }
  export async function addCategory(category) {
    map.addLayerGroup(category.title);
    map.updateLayerControl();
  }
  export async function removeCategory(category) {
    map.removeLayerGroup(category.title);
    map.updateLayerControl();
  }

  export async function showPoiList(poiList) {
    for (const poi_idx in poiList) {
      const poi = poiList[poi_idx];
      map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name);
    }
    map.updateLayerControl();
  }
  export function addPoi(poi) {
    map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name);
    map.moveTo(8, {lat: poi.latitude, lng: poi.longitude});
  }
  export function removePoi(poi) {
    //map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name);
    map.removeMarker(poi.name);
  }
  onMount(async () => {
    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    map.showLayerControl();
  });
</script>

<div class="box" id="placemark-map" style="height:800px" />
