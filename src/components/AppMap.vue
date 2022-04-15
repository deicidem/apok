<template>
  <l-map
    ref="map"
    @update:zoom="setZoom($event)"
    @update:center="updateCenter($event)"
    @update:bounds="updateCenter(center)"
    @click="onClick($event)"
    @ready="$emit('ready', $refs.map)"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      data-number="id"
      :draggable="drawable"
      @dragend="handleMarkerDragEnd($event, id)"
      v-for="(marker, id) in polygon"
      :key="id"
      :lat-lng="marker"
    >
      <l-icon :icon-size="[40, 40]" :icon-anchor="[20, 40]" :icon-url="icon">
        <div class="marker-text">{{ id + 1 }}</div>
        <img style="pointer-events: none" :src="icon" alt="" />
      </l-icon>
    </l-marker>
    <l-polygon
      @click="save"
      :fill="true"
      :lat-lngs="polygon"
      color="#476D70"
    ></l-polygon>
    <l-circle :lat-lng="circle.center" :radius="circle.radius" color="red"/>
    <template>
      <l-geo-json
        :options="{ fill: false }"
        v-for="(gj, i) in geoJsons"
        :key="'gj' + i"
        :geojson="gj.json"
      ></l-geo-json>
    </template>
    <template>
      <l-image-overlay
        v-for="(img, i) in images"
        :key="'img' + i"
        :url="require(`@/assets/img/${img.img}`)"
        :bounds="img.bounds"
      ></l-image-overlay>
    </template>
  </l-map>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import * as SHP from "shp-write";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolygon,
  LIcon,
  LImageOverlay,
  // LTooltip
  LGeoJson,
  LCircle
} from "vue2-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("@/assets/img/geo_marker.svg"),
  iconUrl: require("@/assets/img/geo_marker.svg"),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
L.Icon.Default;
export default {
  name: "AppMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LImageOverlay,
    // LTooltip,
    // LPopup,
    LPolygon,
    LGeoJson,
    LCircle
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    ...mapGetters("map", {
      polygon: "getPolygonArea",
      drawable: "getDrawable",
      center: "getCenter",
      zoom: "getZoom",
      circle: "getCirclePolygon",
      geoJsons: "getGeoJsonPolygons",
      images: "getImages",
    }),
    icon() {
      return require("@/assets/img/geo_marker.svg");
    },
  },
  methods: {
    ...mapActions("map", [
      "addCoordinate",
      "changeCoordinate",
      "setCenter",
      "setZoom",
    ]),
    updateCenter(center) {
      this.$refs.map.mapObject.invalidateSize();
      this.setCenter(center)
    },
    // Добавление маркеров
    onClick($event) {
      if (
        this.drawable &&
        $event.originalEvent.target.classList.contains("vue2leaflet-map")
      ) {
        this.addCoordinate($event.latlng);
      }
    },
    // Изменение размеров полигона
    handleMarkerDragEnd($event, id) {
      if (this.drawable) {
        this.changeCoordinate({ latlng: $event.target._latlng, id });
      }
    },
    handleMarkerDrag($event, id) {
      if (this.drawable) {
        this.changeCoordinate({ latlng: $event.latlng, id });
      }
    },
    // Сохранение файла
    save() {
      let polygon = L.polygon(this.polygon);
      let json = polygon.toGeoJSON();
      let string = JSON.stringify(json);
      console.log(string);

      // L.extend(json.properties, polygon.properties);
      // console.log(string);

      // let options = {
      //   folder: "myshapes",
      //   types: {
      //     polygon: "POLYGON",
      //   },
      // };
      // console.log(
      //   SHP.download(
      //     {
      //       type: "FeatureCollection",
      //       features: [json],
      //     },
      //     options
      //   )
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.marker-text {
  color: $color-main-dark;
  font-size: 16px;
  position: absolute;
  top: 45%;
  font-weight: 700;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>