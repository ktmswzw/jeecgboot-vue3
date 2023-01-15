<template>
  <JTreeSelect
    ref="treeSelect"
    placeholder="请选择"
    v-model:value="category"
    @change="functionChange"
    dict="bus_flow_category,name,id"
    pidValue="0"
    :multiple="false"
    loadTriggleChange
  />
</template>

<script lang="ts" setup>
  import JTreeSelect from '/@/components/Form/src/jeecg/components/JTreeSelect.vue';
  import { ref } from 'vue';
  import { getAuthCache } from '/@/utils/auth';
  import { PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  const emit = defineEmits(['change', 'update:value']);
  let category = ref<String>();
  const info = getAuthCache(PROCESS_INFO_KEY);
  console.log(info);
  category.value = info.category;
  function functionChange(value: any) {
    console.log(value);
    emit('change', value);
  }
</script>

<style lang="less"></style>
