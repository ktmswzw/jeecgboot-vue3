import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'left',
    width: 150,
    dataIndex: 'name',
  },
  {
    title: '图片',
    align: 'center',
    width: 50,
    dataIndex: 'image',
    customRender: render.renderImage,
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
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { ...rules.duplicateCheckRule('bus_product_category', 'name', model, schema)[0] }];
    },
  },
  {
    label: '图片',
    field: 'image',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '父级节点',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'bus_product_category,name,id',
      pidField: 'pid',
      pidValue: '0',
      hasChildField: 'has_child',
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
