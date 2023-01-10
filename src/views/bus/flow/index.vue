<template>
  <div class="mt-2">
    <AnYiBpmnDesigner @change="handleChange" ref="diagramDesigner" :comps="comps" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { Category } from './components/Category';
  import { Role } from './components/Role';
  import { User } from './components/User';
  import { Time } from './components/Time';
  import { UserSingle } from './components/UserSingle';
  import { Expression } from './components/Expression';
  import { ref } from 'vue';
  import { getAuthCache } from '/@/utils/auth';
  import { PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { ProcessInfo } from '/#/store';

  const { setTitle } = useTabs();
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

  function handleChange(__diagram: any) {
    // console.log('---diagram---', diagram);
  }

  function init() {
    const dig = diagramDesigner;
    const info = getAuthCache<ProcessInfo>(PROCESS_INFO_KEY);

    // 设置标识
    setTitle(`${info.name}-流程设计`);
    if (!dig) {
      throw new Error('diagramDesigner is null!');
    }
    dig.value.createNewDiagram();
  }

  onMounted(() => {
    init();
  });
</script>
