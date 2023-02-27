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
<script lang="ts" setup name="flow-index">
  import { onMounted } from 'vue';
  import { Category } from './components/Category';
  import { Role } from './components/Role';
  import { User } from './components/User';
  import { Time } from './components/Time';
  import { bpmn2 } from './process';
  import type { BpmnDiagramInfo } from '/@/views/bus/flow/types/designercommon.d';
  import { UserSingle } from './components/UserSingle';
  import { Expression } from './components/Expression';
  import { ref } from 'vue';
  import { getAuthCache, setAuthCache } from '/@/utils/auth';
  import { DEPLOY_INFO, PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { duplicateCheck } from '/@/views/system/user/user.api';
  import { processCreate, processXml } from '/@/views/bus/flowTree/category.flow.api';

  const diagramDesigner = ref();
  const record = ref();
  const isNameCheck = ref(true);
  const isKeyCheck = ref(true);
  let info = ref({ category: '' });
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
    const id = record.value ? record.value.deploymentId : '';
    let params = {
      tableName: 'ACT_RE_DEPLOYMENT',
      fieldName: 'NAME_',
      idName: 'ID_',
      fieldVal: diagram.diagramNames,
      dataId: id,
    };
    duplicateCheck(params)
      .then((res) => {
        if (!res.success) {
          notification.info({ message: t('bus.flow.duplicateCheckFail', ['名称']) })
          isNameCheck.value = false;
        };
      })
      .catch(() => {
        return false;
      });
    params = {
      tableName: 'ACT_RE_DEPLOYMENT',
      fieldName: 'KEY_',
      idName: 'ID_',
      fieldVal: diagram.processDefinitionKeys,
      dataId: id,
    };
    duplicateCheck(params)
      .then((res) => {
        if (!res.success) {
          notification.info({ message: t('bus.flow.duplicateCheckFail', ['KEY']) })
          isKeyCheck.value = false;
        };
      })
      .catch(() => {
        return false;
      });
  }
  function handleSave(diagram: BpmnDiagramInfo) {
    console.log('---点击了保存按钮---', diagram);
    if (!diagram.diagramNames) {
      notification.info({ message: '请输入名称！' });
      return;
    }
    if (!isNameCheck) {
      notification.info({ message: '名称重复！' });
      return;
    }
    if (!diagram.processDefinitionKeys) {
      notification.info({ message: '请输入KEY！' });
      return;
    }
    if (!isKeyCheck) {
      notification.info({ message: 'Key重复！' });
      return;
    }
    const id = record.value ? record.value.id : '';
    const data = {
      base64: diagram.diagramBase64Data,
      name: diagram.diagramNames,
      category: info.value.category,
      tenantId: '1',
      key: diagram.processDefinitionKeys,
      id: id,
      deploymentId: record.value.deploymentId,
    };
    // console.error(data);
    processCreate(data).then((res) => {
      console.log("=-------------");
      console.log(res);
      record.value.deploymentId = res.id;
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
    record.value = getAuthCache(DEPLOY_INFO);
    console.log(record)
    info.value = getAuthCache(PROCESS_INFO_KEY);
    if(record.value.id){
      processXml({id:record.value.id}).then((res)=>{
        // console.log(res)
        diagramDesigner.value.openBase64Diagram(res);
      })
      // diagramDesigner.value.createNewDiagram(bpmn2);
    }
    else
      diagramDesigner.value.createNewDiagram();
  }

  onMounted(() => {
    init();
  });
</script>

<!--<style lang="less" scoped>-->
<!--html[data-theme='dark'] .djs-palette{-->
<!--  color: #c9d1d9;-->
<!--  background: #000;-->
<!--}-->
<!--</style>-->
