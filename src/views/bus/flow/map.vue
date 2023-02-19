<template>
  <div id="map"></div>
</template>

<script setup>
  import 'ol/ol.css';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { fromLonLat } from 'ol/proj';
  import { reactive, ref } from '@vue/reactivity';
  import { onMounted } from 'vue';

  const mapView = reactive({
    center: fromLonLat([119.923516, 28.441691]), // 地图中心点
    zoom: 18, // 初始缩放级别
    minZoom: 10, // 最小缩放级别
    maxZoom: 20, // 最大缩放级别
  });
  let map = ref(null);

  // 此处瓦片地址和 vue2 中的一样，可在本地测
  const mapUrl = ref('http://192.168.0.85/zjlsldtuchu/tiles/{z}/{x}/{y}.jpg');
  // const mapUrl = ref(`tiles/{z}/{x}/{y}.png`)

  // 初始化地图
  const init = () => {
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: mapUrl.value,
      }),
    });
    map.value = new Map({
      layers: [tileLayer],
      view: new View(mapView),
      target: 'map',
    });
  };

  onMounted(() => {
    init();
  });
</script>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
