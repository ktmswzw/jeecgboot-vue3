<template>
  <div class="mt-2">
    <AnYiBpmnDesignerCamunda
      @change="handleChange"
      @save="handleSave"
      :show-deployment="false"
      @deployment="handleDeployment"
      ref="diagramDesigner"
      :comps="comps"
    />
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
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { duplicateCheck } from '/@/views/system/user/user.api';
  import {processCreate} from "/@/views/bus/flowTree/category.flow.api";

  const diagramDesigner = ref();
  const record = ref();
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
    if (!diagram.diagramNames) {
      notification.info({ message: '请输入名称！' });
      return;
    }
    if (!diagram.processDefinitionKeys) {
      notification.info({ message: '请输入KEY！' });
      return;
    }
    record.value = getAuthCache(PROCESS_INFO_KEY);
    const id = record.value ? record.value.id : '';
    let params = {
      tableName: 'ACT_RE_DEPLOYMENT',
      fieldName: 'NAME_',
      fieldVal: diagram.diagramNames,
      dataId: id,
    };
    duplicateCheck(params)
      .then((res) => {
        if (!res.success) notification.info({ message: t('bus.flow.duplicateCheckFail', ['名称']) });
        else console.log(res);
      })
      .catch(() => {
        return false;
      });
    params = {
      tableName: 'ACT_RE_DEPLOYMENT',
      fieldName: 'KEY_',
      fieldVal: diagram.processDefinitionKeys,
      dataId: id,
    };
    duplicateCheck(params)
      .then((res) => {
        if (!res.success) notification.info({ message: t('bus.flow.duplicateCheckFail', ['KEY']) });
        else console.log(res);
      })
      .catch(() => {
        return false;
      });

    const info = getAuthCache(PROCESS_INFO_KEY);
    const data = {
      base64: diagram.diagramBase64Data,
      name: diagram.diagramNames,
      category: info.category,
      tenantId: '1',
      key: diagram.processDefinitionKeys,
      id: id,
    };
    // console.error(data);
    processCreate(data).then((res) => {
      console.log(res);
      record.value = res.result;
    });
    notification.success({ message: t('bus.flow.saveSuccess') });
  }
  function handleDeployment(diagram: BpmnDiagramInfo) {
    console.log('---点击了部署按钮---', diagram);
    notification.success({ message: t('bus.flow.deploymentSuccess') });
  }

  function init() {
    // 设置标识
    // setTitle(`流程设计`);
    if (!diagramDesigner.value) {
      throw new Error('diagramDesigner is null!');
    }
    diagramDesigner.value.createNewDiagram();
    // diagramDesigner.value.openBase64Diagram(CAMUNDA_MODEL);
  }

  onMounted(() => {
    init();
  });
</script>
