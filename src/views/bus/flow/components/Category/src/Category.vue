<template>
  <JTreeSelect
    ref="treeSelect"
    placeholder="请选择"
    v-model:value="category"
    @change="functionChange"
    dict="bus_flow_category,name,id"
    pidValue="0"
    loadTriggleChange
  >
  </JTreeSelect>
</template>

<script lang="ts" setup>
  import JTreeSelect from '/@/components/Form/src/jeecg/components/JTreeSelect.vue';
  import { ref, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: String,
    },
  });
  const emit = defineEmits(['change', 'update:value']);
  const category = ref<String>();
  watch(
    () => props.modelValue,
    (val1, val2) => {
      if (val1 != val2) {
        category.value = props.modelValue;
      }
    },
    { immediate: true }
  );
  const options = ref([
    {
      label: '测试1label',
      value: '测试1value',
    },
    {
      label: '测试2label',
      value: '测试2value',
    },
    {
      label: 'bpmn默认',
      value: 'http://bpmn.io/schema/bpmn',
    },
  ]);
  function functionChange(value: any) {
    emit('change', value);
  }
</script>

<style lang="less"></style>
