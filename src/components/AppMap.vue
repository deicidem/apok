<template>
  <l-map
    ref="map"
    @update:zoom="setZoom({ value: $event })"
    @update:center="updateCenter($event)"
    @update:bounds="updateBounds($event)"
    @click="onClick($event)"
    @ready="$emit('ready', $refs.map)"
    :options="{ zoomControl: false }"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-control-zoom position="bottomleft"></l-control-zoom>

    <template v-if="polygon.active">
      <l-marker
        data-number="id"
        :draggable="drawable"
        @dragend="handleMarkerDragEnd($event, id)"
        v-for="(marker, id) in polygon.geometry"
        :key="id"
        :lat-lng="marker"
      >
        <l-icon :icon-size="[40, 40]" :icon-anchor="[20, 40]" :icon-url="icon">
          <div class="marker-text">{{ id + 1 }}</div>
          <img style="pointer-events: none" :src="icon" alt="" />
        </l-icon>
      </l-marker>
    </template>

    <l-polygon
      v-if="polygon.active"
      @click="save"
      :fill="true"
      :lat-lngs="polygon.geometry"
      color="#6BA2A6"
    ></l-polygon>

    <l-geo-json
      :options="{ fill: false }"
      v-if="filePolygon.geometry != null"
      :geojson="filePolygon.geometry"
    ></l-geo-json>

    <l-circle
      v-if="circle.active && circle.geometry != null"
      :lat-lng="circle.geometry.center"
      :radius="circle.geometry.radius"
      color="red"
    />

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
        :url="img.img"
        :bounds="img.bounds"
      ></l-image-overlay>
    </template>

    <template>
      <l-image-overlay
        v-for="(img, i) in viewImages"
        :key="'viewImg' + i"
        :url="img.img"
        :bounds="img.bounds"
      ></l-image-overlay>
    </template>
  </l-map>
</template>

<script>
// import {latLngBounds} from "leaflet"
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
  LCircle,
  LControlZoom,
} from "vue2-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("@/assets/img/map-icons/geo_marker.svg"),
  iconUrl: require("@/assets/img/map-icons/geo_marker.svg"),
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
    LCircle,
    LControlZoom,
  },
  data() {
    return {
      // maxBounds: latLngBounds([
      //   [90, 240],
      //   [-90, -240]
      // ]),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    ...mapGetters("map", {
      polygon: "getAreaPolygon",
      drawable: "getAreaPolygonDrawable",
      center: "getCenter",
      bounds: "getBounds",
      zoom: "getZoom",
      circle: "getCirclePolygon",
      geoJsons: "getGeoJsonPolygons",
      images: "getImages",
      viewImages: "getViewImages",
      filePolygon: "getFilePolygon",
      needUpdateBounds: "getNeedUpdateBounds",
    }),

    icon() {
      return require("@/assets/img/map-icons/geo_marker.svg");
    },
  },
  methods: {
    ...mapActions("map", [
      "addCoordinate",
      "changeCoordinate",
      "setCenter",
      "setZoom",
      "setBounds",
      "setNeedUpdateBounds",
    ]),

    updateCenter(center) {
      this.$refs.map.mapObject.invalidateSize();
      this.setCenter({ coordinate: center });
    },

    updateBounds(bounds) {
      this.setBounds({ bounds });
    },

    // Добавление маркеров
    onClick($event) {
      if (
        this.drawable &&
        $event.originalEvent.target.classList.contains("vue2leaflet-map")
      ) {
        this.addCoordinate({ coordinate: $event.latlng });
      }
    },

    // Изменение размеров полигона
    handleMarkerDragEnd($event, id) {
      if (this.drawable) {
        this.changeCoordinate({ id, latlng: $event.target._latlng });
      }
    },

    handleMarkerDrag($event, id) {
      if (this.drawable) {
        this.changeCoordinate({ id, latlng: $event.latlng });
      }
    },

    // Сохранение файла
    save() {
      let polygon = L.polygon(this.polygon.geometry);
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
  watch: {
    needUpdateBounds(b, a) {
      if (b) {
        this.$refs.map.fitBounds(this.bounds);
      }
      return a;
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