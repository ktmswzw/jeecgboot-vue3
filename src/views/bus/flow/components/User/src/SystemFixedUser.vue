<template>
  <Table
    :columns="columns"
    :row-selection="{
      onSelect: handleOnSelect,
      selectedRowKeys: selectKeys,
      onSelectAll: handleOnSelectAll,
      type: systemDataType == 1 ? 'radio' : 'checkbox',
    }"
    :customRow="onClick"
    :data-source="dataSource"
    :rowKey="rowKey"
    bordered
    size="small"
  >
  </Table>
</template>

<script lang="ts" setup>
  import { Badge, Table } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { watch, ref, toRaw } from 'vue';
  import { AnYiExtendProperty } from '/@/views/bus/flow/types/designercommon.d';
  import { columns } from './data';
  const rowKey = ref('id');
  const emit = defineEmits(['change']);

  import { getUserList } from '/@/api/common/api';
  const dataSource = ref<any[]>([]);
  const selectRows = ref<any[]>([]);
  const selectKeys = ref<string[]>([]);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendProperty[]>,
      default: () => [],
    },
    systemDataType: {
      type: Number,
      default: 1,
    },
  });
  watch(
    () => props.modelValue,
    (newVal, oldVal) => {
      if ((!oldVal && newVal) || JSON.stringify(toRaw(oldVal)) != JSON.stringify(toRaw(newVal))) {
        initData();
      }
    },
    { immediate: true }
  );
  function getList() {
    const params = {};
    getUserList(params).then((res) => {
      dataSource.value = res.records;
    });
  }
  function initData() {
    selectRows.value = [];
    selectKeys.value = [];
    if (props.modelValue && props.modelValue.length > 0) {
      const currentSelectRows: any[] = [];
      const currentSelectRowKey: string[] = [];
      props.modelValue.forEach((item: AnYiExtendProperty) => {
        currentSelectRows.push({
          id: item.value,
          realname: item.valueDescribe,
          username: item.valueExtend,
        });
        currentSelectRowKey.push(item.value as string);
      });
      selectRows.value = currentSelectRows;
      // 设置选中的key
      selectKeys.value = currentSelectRowKey;
    }
  }
  function selectionChange() {
    const rows = selectRows.value;
    const nowData: AnYiExtendProperty[] = [];
    if (rows && rows.length > 0) {
      rows.forEach((item: any) => {
        nowData.push({
          value: item.id,
          valueDescribe: item.realname,
          valueExtend: item.username,
        });
      });
    }
    emit('change', nowData);
  }
  function handleOnSelect(_record, _selected, selectedRows, _nativeEvent) {
    if (!selectRows.value) {
      selectRows.value = [];
      selectKeys.value = [];
    }
    selectRows.value = selectedRows;
    selectKeys.value = [selectedRows[0][rowKey.value]];
    selectionChange();
  }
  function onClick(record, index) {
    return {
      onClick: (e) => {
        e?.stopPropagation();
        handleClientChange(record, index);
      },
    };
  }
  function handleOnSelectAll(selected, selectedRows, changeRows) {
    if (!selectRows.value) {
      selectRows.value = [];
      selectKeys.value = [];
    }
    if (selected) {
      selectRows.value = selectRows.value.concat(selectedRows);
      const nowKey: string[] = [];
      selectedRows.forEach((item: any) => {
        nowKey.push(item[rowKey.value + '']);
      });
      selectKeys.value = selectKeys.value.concat(nowKey);
    } else {
      const changeRowKey = {} as any;
      if (changeRows && changeRows.length > 0) {
        changeRows.forEach((item: any) => {
          changeRowKey[item[rowKey.value + '']] = item[rowKey.value + ''];
        });
        const nowRows = selectRows.value.filter((item) => {
          return changeRowKey[item[rowKey.value + '']] == undefined;
        });
        const nowKey = selectKeys.value.filter((key) => {
          return changeRowKey[key] == undefined;
        });
        selectRows.value = nowRows;
        selectKeys.value = nowKey;
      }
    }
    selectionChange();
  }
  function handleClientChange(record, index) {
    console.log('-------index-------', index);
    const key = record[rowKey.value];
    selectCustomChange(record, key, props.systemDataType == 1 ? 'radio' : 'checkbox');
  }
  function selectCustomChange(record, key, type) {
    if (!selectKeys.value) {
      selectKeys.value = [];
      selectRows.value = [];
    }
    if (type == 'radio') {
      if (selectKeys.value.length == 0 || !selectKeys.value.includes(key)) {
        selectRows.value = [record];
        selectKeys.value = [key];
      } else {
        selectRows.value = [];
        selectKeys.value = [];
      }
    } else {
      if (selectKeys.value.length == 0 || !selectKeys.value.includes(key)) {
        selectRows.value = selectRows.value.concat([record]);
        selectKeys.value = selectKeys.value.concat([key]);
      } else {
        const nowRows = selectRows.value.filter((item) => {
          return item[rowKey.value + ''] != key;
        });
        const nowKeys = selectKeys.value.filter((nowKey) => {
          return nowKey != key;
        });
        selectRows.value = nowRows;
        selectKeys.value = nowKeys;
      }
    }
    selectionChange();
  }
  getList();
</script>

<style lang="less">
  .ant-table-wrapper {
    margin-top: 20px;
  }
</style>
