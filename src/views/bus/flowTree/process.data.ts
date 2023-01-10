import { BasicColumn, FormSchema } from '/@/components/Table';
import {duplicateCheck, getAllTenantList} from '/@/views/system/user/user.api';

// 用户信息 columns
export const processInfoColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Key',
    dataIndex: 'key',
    width: 180,
  },
  {
    title: '类别',
    dataIndex: 'category',
    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 80,
  },
  {
    title: '企业',
    dataIndex: 'tenantId',
    width: 120,
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: 120,
  },
];

// 信息查询条件表单
export const processInfoSearchFormSchema: FormSchema[] = [
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
export const processModalFormSchema: FormSchema[] = [
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
    label: '类别',
    component: 'Input',
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
