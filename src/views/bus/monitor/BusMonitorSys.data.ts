import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '系统来源',
    align: 'center',
    dataIndex: 'source_dictText',
  },
  {
    title: '日期时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '系统IP',
    align: 'center',
    dataIndex: 'ip',
  },
  {
    title: '监控类型',
    align: 'center',
    dataIndex: 'msgType_dictText',
  },
  {
    title: '连续性',
    align: 'center',
    dataIndex: 'continuity',
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
    label: '连续性',
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

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
