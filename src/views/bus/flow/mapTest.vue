<template>
  <div id="cesiumContainer"></div>
</template>

<script>
  import * as Cesium from 'cesium';
  import { onMounted } from 'vue';
  // import './css/widgets.css';

  export default {
    setup() {
      onMounted(() => {
        console.log('Cesium.VERSION', Cesium.VERSION);
        // const custom = new Cesium.ArcGisMapServerImageryProvider({
        //   url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
        // });
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNTFlNWVmMC1jOWRhLTQyMDktOTY4Ny02YTU5YWFlMGYwY2IiLCJpZCI6OTQzNDQsImlhdCI6MTY1Mjg4ODEyNn0.g2vq1qq_rdfZeRTy73nBkEDzhMIM4upkYcbIdFYnCiQ';

        var viewer = new Cesium.Viewer('cesiumContainer', {
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
        viewer.scene.globe.show = true;

        // This works
        viewer.infoBox.frame.removeAttribute('sandbox'); // 必须要加，不然有报错： Can’t run scripts in infobox

        // So does this if you want to limit other things but allow scripts
        //viewer.infoBox.frame.setAttribute("sandbox", "allow-same-origin allow-popups allow-forms allow-scripts");

        // In both cases, you need to do this to force a reload for the change to take affect.
        viewer.infoBox.frame.src = 'about:blank';
        //
        // viewer.selectedEntity = new Cesium.Entity({
        //   id: 'YouTube video',
        //   description:
        //     '<div style="height:315px;"><iframe width=100% height="315" src="https://www.youtube.com/embed/wo5rWeeZxvo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
        // });
      });
    },
  };
</script>

<style></style>
