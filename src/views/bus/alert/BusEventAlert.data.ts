import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '预警日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '更新日期',
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '预警名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '预警类型',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '紧急程度',
    align: 'center',
    dataIndex: 'urgentLevel_dictText',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '预警名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '预警类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'alert_type',
    },
    colProps: { span: 6 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'status',
    },
    colProps: { span: 6 },
  },
  {
    label: '紧急程度',
    field: 'urgentLevel',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'urgent_level',
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '预警名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '预警类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'alert_type',
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'status',
    },
  },
  {
    label: '紧急程度',
    field: 'urgentLevel',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'urgent_level',
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
