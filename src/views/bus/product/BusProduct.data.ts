import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '图片',
    align: 'center',
    dataIndex: 'image',
    customRender: render.renderImage,
  },
  {
    title: '编码',
    align: 'center',
    dataIndex: 'code',
  },
  {
    title: '保修时长(月)',
    align: 'center',
    dataIndex: 'warranty',
  },
  {
    title: '附件',
    align: 'center',
    dataIndex: 'attachment',
    slots: { customRender: 'fileSlot' },
  },
  {
    title: '售价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '成本价',
    align: 'center',
    dataIndex: 'cost',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  // {
  //   label: '分类',
  //   field: 'categoryId',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'bus_product_category,name,id',
  //   },
  //   colProps: { span: 6 },
  // },
  {
    label: '编码',
    field: 'code',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入名称!' }, { ...rules.duplicateCheckRule('bus_product', 'name', model, schema)[0] }];
    },
  },
  {
    label: '分类',
    field: 'categoryId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'bus_product_category,name,id',
    },
  },
  {
    label: '编码',
    field: 'code',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { ...rules.duplicateCheckRule('bus_product', 'code', model, schema)[0] }];
    },
  },
  {
    label: '保修时长(月)',
    field: 'warranty',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' }];
    },
  },
  {
    label: '图片',
    field: 'image',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '附件',
    field: 'attachment',
    component: 'JUpload',
    componentProps: {},
  },
  {
    label: '售价',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '成本价',
    field: 'cost',
    component: 'InputNumber',
  },
  {
    label: '描述',
    field: 'description',
    component: 'JEditor',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
