<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    @ok="handleOk"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <!--    <AnYiBpmnPreviewInstance-->
    <!--      ref="diagramInstanceDomRef"-->
    <!--      :size="'small'"-->
    <!--      :show-minimap="false"-->
    <!--      :button-position="'top'"-->
    <!--      :show-button="true"-->
    <!--      :createHtml="getHtml"-->
    <!--      tagId="Activity_1s3ocxk:e63351bb-faaa-11ec-9f3a-0242ac1f090f"-->
    <!--    />-->
    <img :src="src" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, defineExpose, nextTick } from 'vue';
  // import type { CreateHtmlFuncArgs, BpmnInstanceInfo } from 'anyi-process-ee-antvue/dist/types/types/instance.d';
  // import instancesdata from './instancesdata.json';
  import { getProcessImage } from '/@/views/bus/flowTree/task.api';
  const title = ref<string>('');
  const width = ref<number>(800);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const src = ref();

  // const diagramInstanceDomRef = ref();
  // function getHtml(info: CreateHtmlFuncArgs) {
  //   console.log('-----info-------', info);
  //   return '<scan>Nihao</scan>';
  // }

  function edit(record) {
    title.value = disableSubmit.value ? '详情' : '编辑';
    visible.value = true;
    console.log(record);
    console.log(record.processInstanceId);
    nextTick(() => {
      // diagramInstanceDomRef.value.viewInstance(instancesdata.data as unknown as BpmnInstanceInfo);
      getProcessImage({ id: record.processInstanceId }).then((res) => {
        console.log(res);
        src.value = res;
        console.log(res);
      });
    });
  }
  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm();
  }
  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    edit,
    disableSubmit,
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
