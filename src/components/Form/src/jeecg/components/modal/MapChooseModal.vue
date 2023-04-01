<!--用户选择框-->
<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="modalTitle"
      width="900px"
      wrapClassName="j-user-select-modal"
      @ok="handleOk"
      destroyOnClose
      @visible-change="visibleChange"
    >
      <div>
        <div id="point">{{ resultPoint[0] + ',' + resultPoint[1] }}</div>
        <div id="map"></div>
        <div id="overlay-box"></div>
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import 'ol/ol.css';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import { Feature, Map, View } from 'ol';
  import { fromLonLat } from 'ol/proj';
  import { bd09toGCJ02 } from '/@/utils';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import { transform } from 'ol/proj';
  import { Point } from 'ol/geom';
  import { Icon, Style } from 'ol/style';
  import img from '/@/assets/svg/boat.svg';

  export default defineComponent({
    components: {
      //此处需要异步加载BasicTable
      BasicModal,
    },
    props: {
      //选择框标题
      modalTitle: {
        type: String,
        default: '选择坐标',
      },
      center: {
        type: Array,
        default: () => [120.300319, 28.13513],
      },
    },
    emits: ['register', 'getChooseResult'],
    setup(props, { emit }) {
      const mapView = reactive({
        center: fromLonLat(bd09toGCJ02(props.center[0], props.center[1])), // 地图中心点
        zoom: 15, // 初始缩放级别
        minZoom: 12, // 最小缩放级别
        maxZoom: 20, // 最大缩放级别
      });
      let map = ref(null);
      let pointLayer = ref({});
      let resultPoint = ref([]);
      const mapUrl = ref('http://map.shunxvision.com:8181/zjls/tiles/{z}/{x}/{y}.jpg');
      //注册弹框
      const [register, { closeModal }] = useModalInner(() => {
        setTimeout(() => {
          const tileLayer = new TileLayer({
            source: new XYZ({
              url: mapUrl.value,
            }),
          });
          console.log('111111');
          map = new Map({
            layers: [tileLayer],
            view: new View(mapView),
            target: 'map',
          });
          map.on('click', (e) => {
            console.log(e.coordinate);
            addPoints(e.coordinate);
          });
        }, 800);
      });
      /**
       * 确定选择
       */
      function handleOk() {
        emit('getChooseResult', resultPoint.value);
        closeModal();
      }

      function addPoints(coordinate) {
        resultPoint.value = transform(coordinate, 'EPSG:3857', 'EPSG:4326');
        removeLayerByName('pointLayer');
        // 创建图层
        pointLayer = new VectorLayer({
          source: new VectorSource(),
          zIndex: 9,
          name: 'pointLayer',
        });
        // 图层添加到地图上
        map.addLayer(pointLayer);
        // }

        // 创建feature要素，一个feature就是一个点坐标信息
        const feature = new Feature({
          geometry: new Point(coordinate),
        });
        // 设置要素的图标
        feature.setStyle(
          new Style({
            // 设置图片效果
            image: new Icon({
              src: img,
              // anchor: [0.5, 0.5],
              scale: 0.8,
            }),
          })
        );
        // 要素添加到地图图层上
        pointLayer.getSource().addFeature(feature);
      }

      const removeLayerByName = (layerName) => {
        const allLayers = map.getLayers().getArray();
        const layer = allLayers.filter((item) => {
          return item.get('name') === layerName;
        });
        layer.forEach((item) => {
          map.removeLayer(item);
        });
      };

      function visibleChange(visible) {
        if (visible) {
          //设置列表默认选中
          // props.showSelected && initSelectRows();
        }
      }

      return {
        handleOk,
        register,
        resultPoint,
        visibleChange,
      };
    },
  });
</script>

<style scoped>
  #point {
    top: 10px;
    left: 40%;
    color: #fff2f0;
    z-index: 999;
    position: absolute;
  }
  #map {
    width: 97%;
    height: 100%;
    position: absolute;
  }
</style>
