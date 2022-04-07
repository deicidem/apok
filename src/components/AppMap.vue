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
      v-for="(marker, id) in polygon"
      :key="id"
      :lat-lng="marker"
    ></l-marker>
    <l-polygon :fill="true" :lat-lngs="polygon" color="#476D70"></l-polygon>
    <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
  </l-map>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      showParagraph: false,
    };
  },
  computed: {
    ...mapGetters("map", {
      polygon: "getPolygonArea",
      drawable: "getDrawable",
    }),
  },
  methods: {
    ...mapActions("map", {
      addCoordinate: "addCoordinate",
      changeCoordinate: "changeCoordinate",
    }),
    // Добавление маркеров
    onClick($event) {
      if (this.drawable) {
        this.addCoordinate($event.latlng);
      }
    },
    // Изменение размеров полигона
    handleMarkerDrag($event, id) {
      if (this.drawable) {
        this.changeCoordinate({ latlng: $event.latlng, id });
      }
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