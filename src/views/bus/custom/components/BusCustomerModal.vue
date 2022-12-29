<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
    <BasicForm @register="registerForm" ref="formRef" />
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="特殊日期" key="busCustomerSpecialList" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="busCustomerSpecialList"
          :loading="busCustomerSpecialListTable.loading"
          :columns="busCustomerSpecialListTable.columns"
          :dataSource="busCustomerSpecialListTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="合同信息" key="busCustomContract" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="busCustomContract"
          :loading="busCustomContractTable.loading"
          :columns="busCustomContractTable.columns"
          :dataSource="busCustomContractTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="合同账单" key="busContactBill" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="busContactBill"
          :loading="busContactBillTable.loading"
          :columns="busContactBillTable.columns"
          :dataSource="busContactBillTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="客户报价" key="busCustomQuoted" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="busCustomQuoted"
          :loading="busCustomQuotedTable.loading"
          :columns="busCustomQuotedTable.columns"
          :dataSource="busCustomQuotedTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="兴趣标签" key="busCustomerLabel" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="busCustomerLabel"
          :loading="busCustomerLabelTable.loading"
          :columns="busCustomerLabelTable.columns"
          :dataSource="busCustomerLabelTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts';
  import {
    formSchema,
    busCustomerSpecialListJVxeColumns,
    busCustomContractJVxeColumns,
    busContactBillJVxeColumns,
    busCustomQuotedJVxeColumns,
    busCustomerLabelJVxeColumns,
  } from '../BusCustomer.data';
  import {
    saveOrUpdate,
    queryBusCustomerSpecialList,
    queryBusCustomContract,
    queryBusContactBill,
    queryBusCustomQuoted,
    queryBusCustomerLabel,
  } from '../BusCustomer.api';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const formDisabled = ref(false);
  const refKeys = ref(['busCustomerSpecialList', 'busCustomContract', 'busContactBill', 'busCustomQuoted', 'busCustomerLabel']);
  const activeKey = ref('busCustomerSpecialList');
  const busCustomerSpecialList = ref();
  const busCustomContract = ref();
  const busContactBill = ref();
  const busCustomQuoted = ref();
  const busCustomerLabel = ref();
  const tableRefs = { busCustomerSpecialList, busCustomContract, busContactBill, busCustomQuoted, busCustomerLabel };
  const busCustomerSpecialListTable = reactive({
    loading: false,
    dataSource: [],
    columns: busCustomerSpecialListJVxeColumns,
  });
  const busCustomContractTable = reactive({
    loading: false,
    dataSource: [],
    columns: busCustomContractJVxeColumns,
  });
  const busContactBillTable = reactive({
    loading: false,
    dataSource: [],
    columns: busContactBillJVxeColumns,
  });
  const busCustomQuotedTable = reactive({
    loading: false,
    dataSource: [],
    columns: busCustomQuotedJVxeColumns,
  });
  const busCustomerLabelTable = reactive({
    loading: false,
    dataSource: [],
    columns: busCustomerLabelJVxeColumns,
  });
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await reset();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    formDisabled.value = !data?.showFooter;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      requestSubTableData(queryBusCustomerSpecialList, { id: data?.record?.id }, busCustomerSpecialListTable);
      requestSubTableData(queryBusCustomContract, { id: data?.record?.id }, busCustomContractTable);
      requestSubTableData(queryBusContactBill, { id: data?.record?.id }, busContactBillTable);
      requestSubTableData(queryBusCustomQuoted, { id: data?.record?.id }, busCustomQuotedTable);
      requestSubTableData(queryBusCustomerLabel, { id: data?.record?.id }, busCustomerLabelTable);
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //方法配置
  const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(
    requestAddOrEdit,
    classifyIntoFormData,
    tableRefs,
    activeKey,
    refKeys
  );

  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function reset() {
    await resetFields();
    activeKey.value = 'busCustomerSpecialList';
    busCustomerSpecialListTable.dataSource = [];
    busCustomContractTable.dataSource = [];
    busContactBillTable.dataSource = [];
    busCustomQuotedTable.dataSource = [];
    busCustomerLabelTable.dataSource = [];
  }
  function classifyIntoFormData(allValues) {
    let main = Object.assign({}, allValues.formValue);
    return {
      ...main, // 展开
      busCustomerSpecialListList: allValues.tablesValue[0].tableData,
      busCustomContractList: allValues.tablesValue[1].tableData,
      busContactBillList: allValues.tablesValue[2].tableData,
      busCustomQuotedList: allValues.tablesValue[3].tableData,
      busCustomerLabelList: allValues.tablesValue[4].tableData,
    };
  }
  //表单提交事件
  async function requestAddOrEdit(values) {
    try {
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
