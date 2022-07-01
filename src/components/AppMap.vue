<template>
  <l-map
    ref="map"
    @update:zoom="setZoom({ value: $event })"
    @update:center="updateCenter($event)"
    @update:bounds="updateBounds($event)"
    @click="onClick($event)"
    @ready="$emit('ready', $refs.map)"
    @mousemove="onMouseMove($event)"
    :options="{ zoomControl: false }"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-control-zoom position="bottomleft"></l-control-zoom>

    <l-control
        :position="'bottomright'"
        class="cursor-position"
        v-if="cursorPosition != null"
      >
        <span class="lat">Широта: {{cursorPosition.lat}}</span>
        <span class="lng">Долгота: {{cursorPosition.lng}}</span>
      </l-control>

    <template v-if="polygon.active">
      <l-marker
        data-number="id"
        :draggable="drawable"
        @dragstart="onDrag"
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
      color="#46a1bf"
    ></l-polygon>

    <l-geo-json
      v-if="filePolygon.active && filePolygon.geometry != null"
      :options="{ fill: false }"
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
  LControl
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
    LControl
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
      cursorPosition: null,
      cursorUpdate: null,
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
    onDrag() {
      console.log(1);
    },
    updateCenter(center) {
      this.$refs.map.mapObject.invalidateSize();
      this.setCenter({ coordinate: center });
    },

    onMouseMove(e) {
      let lat = e.latlng.lat.toFixed(2);
      let lng = e.latlng.lng.toFixed(2);
      console.log(lat, lng);
      // if (this.cursorUpdate == null)  {
      //   this.cursorPosition = {lat, lng}
      //   this.cursorUpdate = Date.now();
      // } else {
      //   if ((Date.now() - this.cursorUpdate) > 100) {
      //     this.cursorPosition = {lat, lng};
      //     this.cursorUpdate = Date.now();
      //   }
      // }
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
      console.log(1);
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
        console.log();
        this.$refs.map.mapObject.flyToBounds(this.bounds, {
          duration: 1.5,
          maxZoom: this.$refs.map.mapObject.getBoundsZoom(this.bounds) - 1
        });
        this.setNeedUpdateBounds({value: false})
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
.cursor-position {
  background: #fff;
  box-shadow: $shadow-small;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  .lat, .lng {
    font-family: monospace;
    display: inline-block;
  }
  .lat {
    margin-right: 10px;
  }
}
</style>