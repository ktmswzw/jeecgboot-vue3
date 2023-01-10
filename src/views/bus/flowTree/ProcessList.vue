<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="createProcess">新建设计</a-button>
      <template v-if="selectedRowKeys.length > 0">
        <a-dropdown>
          <a-button>
            <span>批量操作 </span>
            <icon icon="akar-icons:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
    </template>
    <!-- 插槽：行内操作按钮 -->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <ProcessDrawer @register="registerDrawer" @success="onUserDrawerSuccess" />
</template>

<script lang="ts" setup>
  import { computed, inject, ref, unref, watch } from 'vue';
  import { ActionItem, BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';

  import ProcessDrawer from './components/ProcessDrawer.vue';
  import { processList } from './category.flow.api';
  import { processInfoColumns, processInfoSearchFormSchema, processModalFormSchema } from './process.data';
  import { ColEx } from '/@/components/Form/src/types';
  import { setAuthCache } from '/@/utils/auth';
  import { PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  import {useGo} from "/@/hooks/web/usePage";

  const prefixCls = inject('prefixCls');
  const props = defineProps({
    data: { require: true, type: Object },
  });
  // 当前选中的部门ID，可能会为空，代表未选择部门
  const treeID = computed(() => props.data?.key);

  // 自适应列配置
  const adaptiveColProps: Partial<ColEx> = {
    xs: 24, // <576px
    sm: 24, // ≥576px
    md: 24, // ≥768px
    lg: 12, // ≥992px
    xl: 12, // ≥1200px
    xxl: 8, // ≥1600px
  };
  // 列表页面公共参数、方法
  const { tableContext, createMessage } = useListPage({
    tableProps: {
      api: processList,
      columns: processInfoColumns,
      canResize: false,
      formConfig: {
        schemas: processInfoSearchFormSchema,
        baseColProps: adaptiveColProps,
        labelAlign: 'left',
        labelCol: {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 9,
          xl: 7,
          xxl: 5,
        },
        wrapperCol: {},
        // 操作按钮配置
        actionColOptions: {
          ...adaptiveColProps,
          style: { textAlign: 'left' },
        },
      },
      // 请求之前对参数做处理
      beforeFetch(params) {
        params.category = treeID.value;
      },
    },
  });

  // 注册 ListTable
  const [registerTable, { reload, setProps, setLoading, updateTableDataRecord }, { rowSelection, selectedRowKeys }] = tableContext;
  const go = useGo();
  watch(
    () => props.data,
    () => reload()
  );
  //注册drawer
  const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();

  // 清空选择的行
  function clearSelection() {
    selectedRowKeys.value = [];
  }

  // 创建用户
  function createProcess() {
    if (!treeID.value) {
      createMessage.warning('请先选择一个分类');
    } else {
      openDrawer(true, {
        isUpdate: false,
        departDisabled: true,
        record: {
          category: treeID.value,
        },
      });
    }
  }

  // 查看用户详情
  function showUserDetail(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
      departDisabled: true,
      showFooter: false,
    });
  }

  // 编辑用户信息
  function editUserInfo(record) {
    openDrawer(true, { isUpdate: true, record, departDisabled: true });
  }

  /**
   * 用户抽屉表单成功回调
   */
  function onUserDrawerSuccess({ isUpdate, values }) {
    setAuthCache(PROCESS_INFO_KEY, values);
    go(`/bpmn/index`);
    isUpdate ? updateTableDataRecord(values.id, values) : reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record): ActionItem[] {
    return [{ label: '编辑', onClick: editUserInfo.bind(null, record) }];
  }
</script>
