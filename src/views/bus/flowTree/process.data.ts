import { BasicColumn, FormSchema } from '/@/components/Table';
import { duplicateCheck, getAllTenantList } from '/@/views/system/user/user.api';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: 'Key',
    align: 'center',
    dataIndex: 'key',
  },
  // {
  //   title: '类别',
  //   align: 'center',
  //   dataIndex: 'category',
  // },
  // {
  //   title: '企业',
  //   align: 'center',
  //   dataIndex: 'tenantId',
  // },
  {
    title: '描述',
    align: 'center',
    dataIndex: 'description',
  },
  {
    title: '版本',
    align: 'center',
    dataIndex: 'version',
  },
];

// 信息查询条件表单
export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '主键',
    component: 'Input',
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
  },
];

// 弹窗form表单
export const formSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 24 },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              if (!value) {
                return reject('请输入名称！');
              }
              const params = {
                tableName: 'ACT_RE_PROCDEF',
                fieldName: 'NAME_',
                fieldVal: value,
                dataId: model.id,
              };
              duplicateCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject('名称已存在!');
                })
                .catch((err) => {
                  reject(err.message || '校验失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'key',
    label: 'Key',
    component: 'Input',
    colProps: { span: 24 },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              if (!value) {
                return reject('请输入Key！');
              }
              const params = {
                tableName: 'ACT_RE_PROCDEF',
                fieldName: 'KEY_',
                fieldVal: value,
                dataId: model.id,
              };
              duplicateCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject('Key已存在!');
                })
                .catch((err) => {
                  reject(err.message || '校验失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'category',
    component: 'JTreeSelect',
    label: '类别',
    componentProps: {
      dict: 'bus_flow_category,name,id',
      pidField: 'pid',
      hasChildField: 'has_child',
      converIsLeafVal: 0,
    }
  },
  {
    label: '租户',
    field: 'tenantId',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllTenantList,
      numberToString: true,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'JEditor',
    rules: [{ min: 0, max: 126, message: '长度不能超过 126 个字符', trigger: 'blur' }],
  },
];
