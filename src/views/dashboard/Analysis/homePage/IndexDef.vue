<template>
  <PageWrapper title="">
    <div class="p-4" ref="domRef">
      <GrowCard :loading="loading" class="enter-y" />
      <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
      <div class="md:flex enter-y">
        <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
        <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
        <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
        <a-button type="primary" @click="toggleDom" class="mr-2"> Exit Dom Full Screen </a-button>
      </div>
      {{ isFullscreen }}
    </div>

    <CollapseContainer class="w-full mt-5 bg-white rounded-md" title="Dom Full Screen">
      <a-button type="primary" @click="toggleDom" class="mr-2"> Enter Dom Full Screen </a-button>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import GrowCard from '../components/GrowCard.vue';
  import SiteAnalysis from '../components/SiteAnalysis.vue';
  import VisitSource from '../components/VisitSource.vue';
  import VisitRadar from '../components/VisitRadar.vue';
  import SalesProductPie from '../components/SalesProductPie.vue';
  import { ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useFullscreen } from '@vueuse/core';

  import { PageWrapper } from '/@/components/Page';

  const domRef = ref<Nullable<HTMLElement>>(null);

  const { toggle: toggleDom } = useFullscreen(domRef);
  const { isFullscreen } = useFullscreen();

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
    console.log('------------------');
    toggleDom();
  }, 3000);
</script>
