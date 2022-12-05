<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <BasicTree @select="onTreeSelect" class="w-1/3" title="搜索" toolbar checkable search :treeData="treeData" :beforeRightClick="getRightMenuList" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="system-depart-user">
  import { provide, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { prefixCls } = useDesign('depart-user');
  provide('prefixCls', prefixCls);

  // 当前选中的部门信息
  let departData = ref({});

  // 左侧树选择后触发
  function onTreeSelect(data) {
    departData.value = data;
  }
</script>
