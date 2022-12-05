import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '系统来源L',
    align: 'center',
    dataIndex: 'source_dictText',
  },
  {
    title: '系统来源',
    align: 'center',
    dataIndex: 'source',
  },
  {
    title: '系统IP',
    align: 'center',
    dataIndex: 'ip',
  },
  {
    title: '监控类型L',
    align: 'center',
    dataIndex: 'msgType_dictText',
  },
  {
    title: '监控类型',
    align: 'center',
    dataIndex: 'msgType',
  },
  {
    title: '间隔分钟',
    align: 'center',
    dataIndex: 'continuity',
    slots: { customRender: 'continuity' },
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '系统来源',
    field: 'source',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_portal',
    },
    colProps: { span: 6 },
  },
  {
    label: '监控类型',
    field: 'msgType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_type',
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '系统来源',
    field: 'source',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_portal',
    },
  },
  {
    label: '系统IP',
    field: 'ip',
    component: 'Input',
  },
  {
    label: '监控类型',
    field: 'msgType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_type',
    },
  },
  {
    label: '间隔分钟',
    field: 'continuity',
    component: 'InputNumber',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

//子表列表数据
export const busMonitorLogColumns: BasicColumn[] = [
  {
    title: 'ID',
    align: 'center',
    dataIndex: 'id',
  },
  {
    title: '主键',
    align: 'center',
    dataIndex: 'configId',
  },
  {
    title: '时间',
    align: 'center',
    dataIndex: 'createTime',
  },
];
//子表表单数据
export const busMonitorLogFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '主键',
    field: 'configId',
    component: 'Input',
  },
];
