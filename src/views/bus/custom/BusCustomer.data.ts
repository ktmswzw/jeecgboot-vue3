import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '称呼',
    align: 'center',
    width: 150,
    dataIndex: 'nickname',
  },
  {
    title: '头像',
    align: 'center',
    dataIndex: 'image',
    width: 80,
    customRender: render.renderImage,
  },
  {
    title: '邮箱',
    align: 'center',
    width: 200,
    dataIndex: 'email',
  },
  {
    title: '手机',
    align: 'center',
    width: 140,
    dataIndex: 'phone',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'bak',
    slots: { customRender: 'htmlSlot' },
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '称呼',
    field: 'nickname',
    component: 'JInput',
    colProps: { span: 4 },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'JInput',
    colProps: { span: 4 },
  },
  {
    label: '手机',
    field: 'phone',
    component: 'JInput',
    colProps: { span: 4 },
  },
  {
    label: '备注',
    field: 'bak',
    component: 'JInput',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '称呼',
    field: 'nickname',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        {
          required: true,
          message: '请输入称呼!',
        },
        { ...rules.duplicateCheckRule('bus_customer', 'nickname', model, schema)[0] },
      ];
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: false },
        {
          pattern: /^([\w]+\.*)([\w]+)@[\w]+\.\w{3}(\.\w{2}|)$/,
          message: '请输入正确的电子邮件!',
        },
        { ...rules.duplicateCheckRule('bus_customer', 'email', model, schema)[0] },
      ];
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '手机',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }, { ...rules.duplicateCheckRule('bus_customer', 'phone', model, schema)[0] }];
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: '头像',
    field: 'image',
    component: 'JImageUpload',
    componentProps: {},
    colProps: {
      span: 24,
    },
  },
  {
    label: '备注',
    field: 'bak',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
    },
    colProps: {
      span: 24,
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
export const busCustomerSpecialListColumns: BasicColumn[] = [
  {
    title: '标题',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '到期日期',
    align: 'center',
    sorter: true,
    dataIndex: 'dueDate',
  },
  {
    title: '循环周期',
    align: 'center',
    dataIndex: 'cycle_dictText',
  },
];
//子表列表数据
export const busCustomContractColumns: BasicColumn[] = [
  // {
  //  title: '客户ID ',
  //  align:"center",
  //  dataIndex: 'customId'
  // },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '签订日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '生效日期',
    align: 'center',
    dataIndex: 'startDate',
  },
  {
    title: '到期日期',
    align: 'center',
    dataIndex: 'dueDate',
  },
  {
    title: '付款模式',
    align: 'center',
    dataIndex: 'payment',
  },
  {
    title: '附件',
    align: 'center',
    dataIndex: 'attachment',
  },
];
//子表列表数据
export const busContactBillColumns: BasicColumn[] = [
  {
    title: '确认日期',
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '账单周期',
    align: 'center',
    dataIndex: 'billLabel',
  },
  {
    title: '金额',
    align: 'center',
    dataIndex: 'amount',
  },
  {
    title: '比例',
    align: 'center',
    dataIndex: 'ratio',
  },
  {
    title: '支付结果',
    align: 'center',
    dataIndex: 'status',
  },
  {
    title: '付款日期',
    align: 'center',
    dataIndex: 'payDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
];
//子表列表数据
export const busCustomQuotedColumns: BasicColumn[] = [
  // {
  //  title: '客户ID',
  //  align:"center",
  //  dataIndex: 'customId'
  // },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  // {
  //  title: '模版ID',
  //  align:"center",
  //  dataIndex: 'templeteId'
  // },
  {
    title: '终价',
    align: 'center',
    dataIndex: 'finalPrice',
  },
  {
    title: '原总价',
    align: 'center',
    dataIndex: 'originalPrice',
  },
  {
    title: '优惠额',
    align: 'center',
    dataIndex: 'discounts',
  },
];
//子表列表数据
export const busCustomerLabelColumns: BasicColumn[] = [
  {
    title: '标签',
    align: 'center',
    dataIndex: 'itemLabel',
  },
  {
    title: '描述',
    align: 'center',
    dataIndex: 'description',
  },
];
//子表表格配置
export const busCustomerSpecialListJVxeColumns: JVxeColumn[] = [
  {
    title: '标题',
    key: 'title',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '到期日期',
    key: 'dueDate',
    type: JVxeTypes.date,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '循环周期',
    key: 'cycle',
    type: JVxeTypes.select,
    options: [],
    dictCode: 'cycle_type',
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
export const busCustomContractJVxeColumns: JVxeColumn[] = [
  // {
  //   title: '客户ID ',
  //   key: 'customId',
  //   type: JVxeTypes.input,
  //   width:"200px",
  //   placeholder: '请输入${title}',
  //   defaultValue:'',
  // },
  {
    title: '名称',
    key: 'name',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '签订日期',
    key: 'createTime',
    type: JVxeTypes.datetime,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '生效日期',
    key: 'startDate',
    type: JVxeTypes.datetime,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '到期日期',
    key: 'dueDate',
    type: JVxeTypes.date,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '付款模式',
    key: 'payment',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '附件',
    key: 'attachment',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
export const busContactBillJVxeColumns: JVxeColumn[] = [
  {
    title: '账单周期',
    key: 'billLabel',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: false }, { pattern: 'only', message: '${title}不能重复' }],
  },
  {
    title: '金额',
    key: 'amount',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: false }, { pattern: 'money', message: '${title}格式不正确' }],
  },
  {
    title: '比例',
    key: 'ratio',
    type: JVxeTypes.inputNumber,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: false }, { pattern: 'z', message: '${title}格式不正确' }],
  },
  {
    title: '支付结果',
    key: 'status',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '付款日期',
    key: 'payDate',
    type: JVxeTypes.date,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
export const busCustomQuotedJVxeColumns: JVxeColumn[] = [
  // {
  //   title: '客户ID',
  //   key: 'customId',
  //   type: JVxeTypes.input,
  //   width:"200px",
  //   placeholder: '请输入${title}',
  //   defaultValue:'',
  // },
  {
    title: '名称',
    key: 'name',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '模版ID',
    key: 'templeteId',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '终价',
    key: 'finalPrice',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '原总价',
    key: 'originalPrice',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '优惠额',
    key: 'discounts',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
export const busCustomerLabelJVxeColumns: JVxeColumn[] = [
  {
    title: '标签',
    key: 'itemLabel',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [
      { required: true, message: '${title}不能为空' },
      { pattern: '*', message: '${title}格式不正确' },
    ],
  },
  {
    title: '描述',
    key: 'description',
    type: JVxeTypes.textarea,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
