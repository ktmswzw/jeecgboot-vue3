<template>
  <div ref="el" class="cesiumContainer">
    <div class="cesium-viewer-toolbar-self">
      <div class="cesium-sceneModePicker-wrapper">
        <a-card title="Default size card" style="width: 300px">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
          <a-button @click="toggle"> Go Fullscreen </a-button>
          <a-button @click="exitCustom"> Exit CustomLogin </a-button>
        </a-card>
      </div>
      <dv-border-box8 :dur="5">
        <div dv-bg>
          <a-button @click="toggle"> Go Fullscreen </a-button>
        </div>
      </dv-border-box8>
    </div>
    <map-test />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useFullscreen } from '@vueuse/core';
  import { useUserStore } from '/@/store/modules/user';
  import MapTest from '/@/views/bus/flow/mapTest.vue';
  const el = ref(null);
  let showMenu = useUserStore().getCustomLogin;
  const { toggle } = useFullscreen(el);

  const userStore = useUserStore();
  const loading = ref(true);
  function exitCustom() {
    showMenu = !showMenu;
    userStore.setCustomLogin(showMenu);
  }
  setTimeout(() => {
    loading.value = false;
    console.log('------------------');
    toggle();
  }, 3000);
</script>
<style lang="less" scoped>
  .cesium-viewer-toolbar-self {
    display: block;
    position: absolute;
    top: 5px;
    z-index: 999;
    right: 5px;
  }
  .ant-card-bordered {
    border: 1px solid #2a6486;
  }
  .ant-card {
    color: #c9d1d9;
    background: #15151573;
  }

  .cesiumContainer {
    height: 100%;
  }
</style>
