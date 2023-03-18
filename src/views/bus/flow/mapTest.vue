<template>
  <div id="cesiumContainer" class="cesiumContainer"></div>
</template>

<script>
  import * as Cesium from 'cesium';
  import { onMounted } from 'vue';
  import { bd09toGCJ02 } from '/@/utils';
  import img from '/@/assets/svg/boat.svg';
  import boat from '/@/assets/gltf/boat.glb';
  import feiji from '/@/assets/gltf/feiji.glb';
  import imgBlue from '/@/assets/svg/boat-blue.svg';
  import TrackMatte from '/@/views/bus/flow/radar';
  export default {
    setup() {
      onMounted(() => {
        console.log('Cesium.VERSION', Cesium.VERSION);
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNTFlNWVmMC1jOWRhLTQyMDktOTY4Ny02YTU5YWFlMGYwY2IiLCJpZCI6OTQzNDQsImlhdCI6MTY1Mjg4ODEyNn0.g2vq1qq_rdfZeRTy73nBkEDzhMIM4upkYcbIdFYnCiQ';
        let viewer = new Cesium.Viewer('cesiumContainer', {
          animation: false, // 是否显示动画控件
          baseLayerPicker: false, // 是否显示图层选择控件
          vrButton: false, // 是否显示VR控件
          // imageryProvider: custom,
          fullscreenButton: false, // 是否显示全屏按钮
          geocoder: false, // 是否显示地名查找控件
          homeButton: false, // 是否显示返回主视角控件
          sceneModePicker: true, // 是否显示投影方式控件
          selectionIndicator: false, // 是否显示选中指示框
          timeline: false, // 是否显示时间线控件
          navigationHelpButton: false, // 是否显示帮助信息控件
          infoBox: false, // 是否显示点击要素之后显示的信息
          terrainProvider: Cesium.createWorldTerrain({
            //配置地形的3D效果
            requestWaterMask: true,
            requestVertexNormals: true,
          }),
        });

        // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
        const id = Math.floor(Math.random() * 8);
        const tdt = new Cesium.WebMapTileServiceImageryProvider({
          url: `http://t${id}.tianditu.gov.cn/cia_w/wmts?tk=93b13175e8baf910b9360c2ce099f836`,
          layer: 'cia',
          style: 'default',
          tileMatrixSetID: 'w',
          format: 'tiles',
          maximumLevel: 18,
        });
        // let self = new Cesium.TileMapServiceImageryProvider({
        //   url: `http://map.shunxvision.com:8181/zjls/tiles`,
        //   layers: 'store:layer',
        //   fileExtension: 'jpg',
        //   maximumLevel: 20,
        // });
        // const divSelf = viewer.imageryLayers.addImageryProvider(self);
        const divTDT = viewer.imageryLayers.addImageryProvider(tdt);
        viewer.imageryLayers.raise(divTDT);
        viewer.scene.globe.show = true;
        viewer.scene.globe.depthTestAgainstTerrain = true; //地形遮挡效果开关，打开后地形会遮挡看不到的区域
        viewer.scene.globe.enableLighting = true; //对大气和雾启用动态照明效果
        viewer._cesiumWidget._creditContainer.style.display = 'none';
        viewer._cesiumWidget._supportsImageRenderingPixelated = Cesium.FeatureDetection.supportsImageRenderingPixelated();
        viewer._cesiumWidget._forceResize = true;
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
          viewer.resolutionScale = window.devicePixelRatio;
        }
        //
        // // This works
        // viewer.infoBox.frame.removeAttribute('sandbox'); // 必须要加，不然有报错： Can’t run scripts in infobox
        // viewer.infoBox.frame.src = 'about:blank';
        let la1 = bd09toGCJ02(120.300319, 28.13513); // boat
        let la3 = bd09toGCJ02(120.310319, 28.14513); // 雷达
        let cameraLa = bd09toGCJ02(120.300319, 28.10513); // 摄像头
        const destinationOrigin = Cesium.Cartesian3.fromDegrees(la1[0], la1[1], 10.0);
        const destinationCamera = Cesium.Cartesian3.fromDegrees(cameraLa[0], cameraLa[1], 3000.0);
        setTimeout(() => {
          viewer.camera.flyTo({
            // fromDegrees()方法，将经纬度和高程转换为世界坐标
            destination: destinationCamera, // 设置位置
            orientation: {
              // 指向
              heading: Cesium.Math.toRadians(0),
              // 视角
              pitch: Cesium.Math.toRadians(-35),
              roll: 0.0,
            },
            duration: 5, //设置飞行时间,默认会根据距离来计算
            complete: function () {
              // 添加模型方式2
              const hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
              //朝向（弧度单位）
              const orientation = Cesium.Transforms.headingPitchRollQuaternion(destinationOrigin, hpr);
              const entity = viewer.entities.add({
                name: boat,
                description: '<div><p>这是船！</div>', // 这是模型的描述属性，可以是html标签
                position: destinationOrigin,
                orientation: orientation,
                model: {
                  uri: boat,
                  scale: 0.1,
                  minimumPixelSize: 128,
                  maximumScale: 0.3,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000),
                  // 是否显示
                  show: true,
                },
              });

              const radar = new TrackMatte({
                viewer: viewer,
                position: [la3[0], la3[1]],
                radius: 1000.0,
                color: new Cesium.Color(0.0, 0.0, 1, 0.2),
                colorWall: new Cesium.Color(0.0, 1.0, 0.0, 0.5),
                speed: 1.0,
                height: -500,
              });

              //添加点
              // const Point = viewer.entities.add({
              //   position: Cesium.Cartesian3.fromDegrees(la1[0], la1[1], 10),
              //   billboard: {
              //     image: imgBlue,
              //     height: 30,
              //     width: 30,
              //     sizeInMeters: false,
              //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              //     scale: 1.0,
              //     outlineWidth: 0,
              //     Color: Cesium.Color.WHITE,
              //     // 显示在距相机的距离处的属性，多少区间内是可以显示的
              //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
              //     show: true,
              //   },
              // });
              // 添加字体
              // const label = viewer.entities.add({
              //   position: Cesium.Cartesian3.fromDegrees(la2[0], la2[1], 10),
              //   // 文字
              //   label: {
              //     // 文本。支持显式换行符“ \ n”
              //     text: '渔船1',
              //     // 字体样式，以CSS语法指定字体
              //     font: '10pt Source Han Sans CN',
              //     // 字体颜色
              //     fillColor: Cesium.Color.BLUE,
              //     // 背景颜色
              //     backgroundColor: Cesium.Color.YELLOW,
              //     // 是否显示背景颜色
              //     showBackground: false,
              //     // 字体边框
              //     outline: true,
              //     // 字体边框颜色
              //     outlineColor: Cesium.Color.YELLOW,
              //     // 字体边框尺寸
              //     outlineWidth: 4,
              //     // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
              //     scale: 1.0,
              //     // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
              //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              //     // 相对于坐标的水平位置
              //     verticalOrigin: Cesium.VerticalOrigin.CENTER,
              //     // 相对于坐标的水平位置
              //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
              //     // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
              //     pixelOffset: new Cesium.Cartesian2(-20, 25),
              //     // 显示在距相机的距离处的属性，多少区间内是可以显示的
              //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
              //     // 是否显示
              //     show: true,
              //   },
              // });
            },
            pitchAdjustHeight: -90, // 如果摄像机飞越高于该值，则调整俯仰的俯仰角度，并将地球保持在视口中
            maximumHeight: 4000, // 相机最大飞行高度
            flyOverLongitude: 100, // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度
          });
        }, 1000);
      });
    },
  };
</script>

<style scoped>
  @import url(./css/widgets.css);

  #canvas-a {
    top: 10px;
    display: none;
    color: rgba(10, 143, 233, 0.61);
  }
</style>
