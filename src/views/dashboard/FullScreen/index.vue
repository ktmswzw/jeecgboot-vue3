<template>
  <div class="p-4 center" ref="el">
    <div class="md:flex enter-y">
      <div class="md:w-1/3 w-full" :loading="loading">
        <video class="m-auto rounded" src="https://vjs.zencdn.net/v/oceans.mp4" width="600" controls></video>
      </div>
    </div>
    <div class="!my-4 enter-y" :loading="loading">
      <a-button @click="toggle"> Go Fullscreen </a-button>
      <a-button @click="exitCustom"> Exit CustomLogin </a-button>
    </div>
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useFullscreen } from '@vueuse/core';
  import { useUserStore } from '/@/store/modules/user';
  import SiteAnalysis from '/@/views/dashboard/Analysis/components/SiteAnalysis.vue';
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
