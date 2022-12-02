import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '有效期',
    align: 'center',
    dataIndex: 'proid',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '有效期',
    field: 'proid',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
//子表单数据
//子表列表数据
export const busOfferTemplateItemColumns: BasicColumn[] = [
  {
    title: '产品ID',
    align: 'center',
    dataIndex: 'productId_dictText',
  },
  {
    title: '价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '套数',
    align: 'center',
    dataIndex: 'unit',
  },
];
//子表表格配置
export const busOfferTemplateItemJVxeColumns: JVxeColumn[] = [
  {
    title: '产品ID',
    key: 'productId',
    type: JVxeTypes.select,
    options: [],
    dictCode: 'bus_product,name,id',
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },

  {
    title: '价格',
    key: 'price',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: false }, { pattern: 'money', message: '${title}格式不正确' }],
  },
  {
    title: '套数',
    key: 'unit',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: false }, { pattern: 'money', message: '${title}格式不正确' }],
  },
];
