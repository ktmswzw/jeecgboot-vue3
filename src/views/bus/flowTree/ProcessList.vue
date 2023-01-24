<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="createProcess">新建流程</a-button>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="startProcessMe">测试发起</a-button>
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
  import { processList, deployList, startProcess } from './category.flow.api';
  import { columns, searchFormSchema } from './process.data';
  import { setAuthCache } from '/@/utils/auth';
  import { PROCESS_INFO_KEY } from '/@/enums/cacheEnum';
  import { useGo } from '/@/hooks/web/usePage';
  import { deleteOne, getExportUrl, getImportUrl } from '/@/views/bus/alert/BusEventAlert.api';

  const prefixCls = inject('prefixCls');
  const props = defineProps({
    data: { require: true, type: Object },
  });
  // 当前选中的部门ID，可能会为空，代表未选择部门
  const treeID = computed(() => props.data?.key);
  const registerModal = ref();
  const queryParam = ref<any>({});
  // 列表页面公共参数、方法
  const { tableContext, createMessage, onExportXls, onImportXls } = useListPage({
    tableProps: {
      api: deployList,
      columns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 150,
        fixed: 'right',
      },
      // 请求之前对参数做处理
      beforeFetch(params) {
        params.category = treeID.value;

        return Object.assign(params, queryParam.value);
      },
    },
    exportConfig: {
      name: '预警清单',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
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
      let values = {
        category: treeID.value,
      };
      setAuthCache(PROCESS_INFO_KEY, values);
      go(`/bpmn/index`);
      // openDrawer(true, {
      //   isUpdate: false,
      //   departDisabled: true,
      //   record: {
      //     category: treeID.value,
      //   },
      // });
    }
  }

  // 编辑用户信息
  function editUserInfo() {
    go(`/bpmn/index`);
  }

  async function startProcessMe(record) {
    await startProcess({
      id: record,
    }).then((res) => {
      console.log(res);
    });
  }

  /**
   * 用户抽屉表单成功回调
   */
  function onUserDrawerSuccess({ isUpdate, values }) {
    // setAuthCache(PROCESS_INFO_KEY, values);
    // go(`/bpmn/index`);
    isUpdate ? updateTableDataRecord(values.id, values) : reload();
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
  /**
   * 操作栏
   */
  function getTableAction(record): ActionItem[] {
    return [
      { label: '发起', onClick: startProcessMe.bind(null, record) },
      { label: '部署', onClick: editUserInfo.bind(null, record) },
    ];
  }
</script>
<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust {
      width: calc(50% - 15px);
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }
  }
</style>
