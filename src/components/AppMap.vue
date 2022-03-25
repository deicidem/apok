<template>
  <l-map
    @click="onClick($event)"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      :draggable="true"
      @drag="handleMarkerDrag($event, id)"
      v-for="(marker, id) in markers"
      :key="id"
      :lat-lng="marker"
    ></l-marker>
    <l-polygon
      :fill="true"
      :lat-lngs="markers"
      color="#ff00ff"
    ></l-polygon>
    <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
  </l-map>
</template>

<script>
import * as SHP from "shp-write";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolygon,
  // LGeoJson,
} from "vue2-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "AppMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LPopup,
    LPolygon,
    // LGeoJson,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      showParagraph: false,
      markers: [],
    };
  },
  methods: {
    // Добавление маркеров
    onClick($event) {
      this.markers.push($event.latlng);
      console.log(this.markers);
    },
    // Изменение размеров полигона
    handleMarkerDrag($event, id) {
      this.$set(this.markers, id, $event.latlng);
      this.markers[id] = $event.latlng;
    },
    // Сохранение файла
    save() {
      let polygon = L.polygon(this.markers);
      let json = polygon.toGeoJSON();
      let string = JSON.stringify(json);
      // console.log(json);
      L.extend(json.properties, polygon.properties);
      console.log(string);

      let options = {
        folder: "myshapes",
        types: {
          polygon: "POLYGON",
        },
      };
      console.log(
        SHP.download(
          {
            type: "FeatureCollection",
            features: [json],
          },
          options
        )
      );
    },
  },  
};
</script>