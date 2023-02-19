import { BasicColumn, FormSchema } from '/@/components/Table';
import { duplicateCheck, getAllTenantList } from '/@/views/system/user/user.api';

export const columns: BasicColumn[] = [
  {
    title: '任务名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '任务类型',
    align: 'center',
    dataIndex: 'flowName',
  },
  {
    title: '生成时间',
    align: 'center',
    dataIndex: 'flowStartTime',
  },
  {
    title: '送达时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '发起人',
    align: 'center',
    dataIndex: 'originalAssignee',
  },
  {
    title: '处理人',
    align: 'center',
    dataIndex: 'owner',
  },
];

// 信息查询条件表单
export const searchFormSchema: FormSchema[] = [
  {
    label: '任务名称',
    component: 'Input',
    field: 'name',
  },
  {
    label: '任务类型',
    field: 'deploymentName',
    component: 'JDictSelectTag',
    helpMessage: ['component模式'],
    componentProps: {
      dictCode: 'ACT_RE_DEPLOYMENT,NAME_,NAME_,1=1 ORDER BY DEPLOY_TIME_',
    },
    colProps: {
      span: 12,
    },
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
    },
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
