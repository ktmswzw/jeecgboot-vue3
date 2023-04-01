<template>
  <div>
    <div id="map"></div>
    <div id="overlay-box"></div>
    <div style="position: absolute; left: 0.6rem; top: 4.25rem">
      <a-button type="primary" size="small" @click="addPointList" shape="circle" preIcon="ant-design:plus-outlined" />
    </div>
    <div style="position: absolute; left: 0.6rem; top: 6.25rem">
      <a-button type="primary" size="small" @click="deleteLayer" shape="circle" preIcon="ant-design:minus-outlined" />
    </div>
  </div>
</template>

<script setup>
  import 'ol/ol.css';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import { Map, View, Feature } from 'ol';
  import { fromLonLat } from 'ol/proj';
  import { reactive, ref } from '@vue/reactivity';
  import { onMounted } from 'vue';
  import { bd09toGCJ02 } from '/@/utils';
  import Overlay from 'ol/Overlay';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import { Style, Icon } from 'ol/style';
  import { Point } from 'ol/geom';
  import img from '/@/assets/svg/boat.svg';
  import imgBlue from '/@/assets/svg/boat-blue.svg';

  const mapView = reactive({
    center: fromLonLat(bd09toGCJ02(120.300319, 28.13513)), // 地图中心点
    zoom: 15, // 初始缩放级别
    minZoom: 12, // 最小缩放级别
    maxZoom: 20, // 最大缩放级别
  });
  const markersData = [
    {
      address: '渔船1',
      x: 120.300311,
      y: 28.13514,
    },
    {
      address: '渔船2',
      x: 120.302322,
      y: 28.13223,
    },
  ];
  let pointLayer = ref({});
  let blue = ref < Boolean > false;
  let map = ref(null);

  const layerName = 'activeLayerNAME';
  const layerTextName = 'activeLayerTextNAME';

  // 此处瓦片地址和 vue2 中的一样，可在本地测
  const mapUrl = ref('http://map.shunxvision.com:8181/zjls/tiles/{z}/{x}/{y}.jpg');
  // const mapUrl = ref(`tiles/{z}/{x}/{y}.png`)

  // 初始化地图
  const init = () => {
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: mapUrl.value,
      }),
    });
    map = new Map({
      layers: [tileLayer],
      view: new View(mapView),
      target: 'map',
    });
  };

  const deleteLayer = () => {
    removeLayerByName(layerName);
    removeOverLayerByName(layerTextName);
  };
  const addPointList = () => {
    markersData.forEach((item) => {
      addPoints(item);
      addText(item);
    });
    blue = !blue;
  };
  const clickMap = () => {
    map.on('click', (e) => {
      console.log(e.coordinate);
    });
  };
  /**
   * 根据经纬度坐标添加摄像头要素
   */
  const addPoints = (coordinate) => {
    const ts = bd09toGCJ02(coordinate.x, coordinate.y);
    // 创建图层
    pointLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 9,
      name: layerName,
    });
    // 图层添加到地图上
    map.addLayer(pointLayer);
    // }

    // 创建feature要素，一个feature就是一个点坐标信息
    const feature = new Feature({
      geometry: new Point(fromLonLat(ts)),
    });
    // 设置要素的图标
    feature.setStyle(
      new Style({
        // 设置图片效果
        image: new Icon({
          src: blue.valueOf() ? img : imgBlue,
          // anchor: [0.5, 0.5],
          scale: 0.8,
        }),
      })
    );
    // 要素添加到地图图层上
    console.log(1);
    pointLayer.getSource().addFeature(feature);
  };

  const addText = (coordinate) => {
    // console.log(coordinate)
    const ts = bd09toGCJ02(coordinate.x, coordinate.y);
    const overlayBox = document.getElementById('overlay-box'); //获取一个div
    const oSpan = document.createElement('span'); //创建一个span
    oSpan.contentEditable = true; //设置文字是否可编辑
    oSpan.id = coordinate.address; //创建一个id
    let pText = document.createTextNode(oSpan.id); //创建span的文本信息
    oSpan.appendChild(pText); //将文本信息添加到span
    oSpan.setAttribute('style', 'color: red');
    overlayBox.appendChild(oSpan); //将span添加到div中
    let textInfo = new Overlay({
      position: fromLonLat(ts), //设置位置
      element: document.getElementById(oSpan.id),
      offset: [-20, 20], //设置偏移,
      name: layerTextName,
    });
    map.addOverlay(textInfo);
  };

  const addMarker = () => {
    const ts = bd09toGCJ02(120.300319, 28.13513);
    const marker = new Overlay({
      position: fromLonLat(ts),
      positioning: 'center-center',
      element: document.getElementById('marker'),
      stopEvent: false,
    });
    map.addOverlay(marker);
  };

  /**
   * @name: 根据图层名获取图层
   * @param {layerName} 图层名称
   */
  const removeLayerByName = (layerName) => {
    const allLayers = map.getLayers().getArray();
    const layer = allLayers.filter((item) => {
      return item.get('name') === layerName;
    });
    layer.forEach((item) => {
      map.removeLayer(item);
    });
  };
  const removeOverLayerByName = (layerName) => {
    const allOverLayers = map.getOverlays().getArray();
    const overLayer = allOverLayers.filter((item) => {
      return item.options.name === layerName;
    });
    overLayer.forEach((item) => {
      map.removeOverlay(item);
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
  #marker {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
  }
</style>
