<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <FlowTree @select="onTreeSelect" />
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <process-list :data="treeData" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="flow-tree">
  import { provide, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ProcessList from './ProcessList.vue';
  import FlowTree from './components/FlowTree.vue';
  import { setAuthCache } from '/@/utils/auth';
  import { DEPLOY_INFO, PROCESS_INFO_KEY } from '/@/enums/cacheEnum';

  const { prefixCls } = useDesign('flow-tree');
  provide('prefixCls', prefixCls);

  // 当前选中的部门信息
  let treeData = ref({});

  // 左侧树选择后触发
  function onTreeSelect(data) {
    treeData.value = data;
  }
  setAuthCache(DEPLOY_INFO, {});
  // setAuthCache(PROCESS_INFO_KEY, {});
</script>

<style lang="less">
  @import './index.less';
</style>
