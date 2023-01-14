<template>
  <div class="mt-2">
    <AnYiBpmnDesignerCamunda @change="handleChange" @save="handleSave" @deployment="handleDeployment" ref="diagramDesigner" :comps="comps" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { Category } from './components/Category';
  import { Role } from './components/Role';
  import { User } from './components/User';
  import { Time } from './components/Time';
  import type { BpmnDiagramInfo } from '/@/views/bus/flow/types/designercommon.d';
  import { UserSingle } from './components/UserSingle';
  import { Expression } from './components/Expression';
  import { ref } from 'vue';
  import { CAMUNDA_MODEL } from './process';
  import { getAuthCache } from '/@/utils/auth';
  import { PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { ProcessInfo } from '/#/store';
  import { processCreate } from '/@/views/bus/flowTree/category.flow.api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {b64toBlob, dataURLtoFile} from '/@/utils';

  const diagramDesigner = ref();
  const comps = {
    category: Category,
    followUpDate: Time,
    dueDate: Time,
    conditionExpression: Expression,
    candidateStarterGroups: Role,
    candidateStarterUsers: User,
    assignee: UserSingle,
    anYiCopyToUsers: User,
    collection: User,
    candidateGroups: Role,
    candidateUsers: User,
  };
  const { t } = useI18n();
  const { notification } = useMessage();
  function handleChange(diagram: BpmnDiagramInfo) {
    console.log('--模型发生了变更----', diagram);
  }
  function handleSave(diagram: BpmnDiagramInfo) {
    console.log('---点击了保存按钮---', diagram);
  }
  function handleDeployment(diagram: BpmnDiagramInfo) {
    console.log('---点击了部署按钮---', diagram);
    const info = getAuthCache(PROCESS_INFO_KEY);
    console.log(info)
    const data = {
      base64: diagram.diagramBase64Data,
      name: diagram.diagramNames,
      category: info[0],
      tenantId: '1',
      key: diagram.processDefinitionKeys
    };
    console.error(data);
    processCreate(data);
    notification.success({ message: t('bus.flow.deploymentSuccess') });
  }

  function init() {

    // 设置标识
    // setTitle(`流程设计`);
    if (!diagramDesigner.value) {
      throw new Error('diagramDesigner is null!');
    }
    // diagramDesigner.value.createNewDiagram();

    diagramDesigner.value.openBase64Diagram(CAMUNDA_MODEL);
  }

  onMounted(() => {
    init();
  });
</script>
