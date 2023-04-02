import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '视频别名',
    align: 'center',
    dataIndex: 'sourceName',
  },
  {
    title: '来源地址',
    align: 'center',
    dataIndex: 'sourceUrl',
  },
  {
    title: '物理地址',
    align: 'center',
    dataIndex: 'sourceAddress',
  },
  {
    title: '手机视频流',
    align: 'center',
    dataIndex: 'streaming',
  },
  {
    title: '开启状态',
    align: 'center',
    dataIndex: 'status',
    slots: { customRender: 'continuity' },
  },
  {
    title: '区域',
    align: 'center',
    dataIndex: 'departName',
  },
  {
    title: '经度',
    align: 'center',
    dataIndex: 'longitude',
  },
  {
    title: '纬度',
    align: 'center',
    dataIndex: 'latitude',
  },
  {
    title: '摄像头类型',
    align: 'center',
    dataIndex: 'camera',
  },
  {
    title: '控制URL',
    align: 'center',
    dataIndex: 'actionUrl',
  },
  {
    title: 'actionPort',
    align: 'center',
    dataIndex: 'actionPort',
  },
  {
    title: '控制频道',
    align: 'center',
    dataIndex: 'actionChannel',
  },
  {
    title: 'username',
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: 'password',
    align: 'center',
    dataIndex: 'password',
  },
  {
    title: 'feature',
    align: 'center',
    dataIndex: 'feature',
  },
  {
    title: '是否直接推送',
    align: 'center',
    dataIndex: 'flag',
    customRender: ({ text }) => {
      return render.renderSwitch(text, [
        { text: '是', value: 'Y' },
        { text: '否', value: 'N' },
      ]);
    },
  },
  {
    title: '原始摄像头rtsp',
    align: 'center',
    dataIndex: 'sourceRtsp',
  },
  {
    title: '企业ID',
    align: 'center',
    dataIndex: 'tenantId',
  },
  {
    title: 'snap',
    align: 'center',
    dataIndex: 'snap',
  },
  {
    title: '控制接口类型',
    align: 'center',
    dataIndex: 'interfaceType',
  },
  {
    title: 'NVR国标服务器IP',
    align: 'center',
    dataIndex: 'serverIp',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '组织',
    field: 'tenantId',
    component: 'JDictSelectTag',
    helpMessage: ['归属客户'],
    componentProps: {
      dictCode: 'sys_tenant,name,id',
    },
    labelWidth: 50,
  },
  {
    label: '名称',
    field: 'sourceName',
    component: 'JInput',
    helpMessage: ['视频别名'],
    colProps: { span: 3 },
  },
  {
    label: '区域',
    field: 'area',
    component: 'JSelectDept',
    helpMessage: ['摄像头所属区域'],
    colProps: { span: 3 },
    componentProps: { showButton: true, rowKey: 'orgCode', primaryKey: 'orgCode' },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '视频别名',
    field: 'sourceName',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入视频别名!' }];
    },
  },
  {
    label: '来源地址',
    field: 'sourceUrl',
    component: 'Input',
  },
  {
    label: '物理地址',
    field: 'sourceAddress',
    component: 'Input',
  },
  {
    label: '手机视频流',
    field: 'streaming',
    component: 'Input',
  },
  {
    label: '开启状态',
    field: 'status',
    component: 'Input',
  },
  {
    label: '区域',
    field: 'area',
    component: 'JSelectDept',
    componentProps: () => {
      return {
        sync: false,
        multiple: false,
        checkStrictly: true,
        showButton: true,
        rowKey: 'orgCode',
        rowLabel: 'orgName',
        primaryKey: 'orgCode',
        defaultExpandLevel: 2,
      };
    },
  },
  {
    label: '经度',
    field: 'longitude',
    component: 'MapChoose',
    componentProps: ({ formModel }) => {
      return {
        center:
          formModel.longitude != null && formModel.longitude != 'none'
            ? { longitude: formModel.longitude, latitude: formModel.latitude }
            : { longitude: '120.300319', latitude: '28.13513' },
        onChange: (e: any) => {
          formModel.longitude = e;
        },
        onChangeTwo: (e: any) => {
          formModel.latitude = e;
        },
      };
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入经度!' }];
    },
  },
  {
    label: '纬度',
    field: 'latitude',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入纬度!' }];
    },
  },
  {
    label: '摄像头类型',
    field: 'camera',
    component: 'Input',
  },
  {
    label: '控制URL',
    field: 'actionUrl',
    component: 'Input',
  },
  {
    label: 'actionPort',
    field: 'actionPort',
    component: 'InputNumber',
  },
  {
    label: '控制频道',
    field: 'actionChannel',
    component: 'Input',
  },
  {
    label: 'username',
    field: 'username',
    component: 'Input',
  },
  {
    label: 'password',
    field: 'password',
    component: 'Input',
  },
  {
    label: 'feature',
    field: 'feature',
    component: 'Input',
  },
  {
    label: '是否直接推送',
    field: 'flag',
    component: 'JSwitch',
    componentProps: {},
  },
  {
    label: '原始摄像头rtsp',
    field: 'sourceRtsp',
    component: 'Input',
  },
  {
    label: '企业ID',
    field: 'tenantId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_tenant,name,id',
    },
  },
  {
    label: 'snap',
    field: 'snap',
    component: 'Input',
  },
  {
    label: '控制接口类型',
    field: 'interfaceType',
    component: 'Input',
  },
  {
    label: 'NVR国标服务器IP',
    field: 'serverIp',
    component: 'Input',
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
export const busVisionPrefabricatedColumns: BasicColumn[] = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'locationNumber',
  },
  {
    title: '经度',
    align: 'center',
    dataIndex: 'longitude',
  },
  {
    title: '纬度',
    align: 'center',
    dataIndex: 'latitude',
  },
  {
    title: '配置id',
    align: 'center',
    dataIndex: 'configId',
  },
];
//子表表单数据
export const busVisionPrefabricatedFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '序号',
    field: 'locationNumber',
    component: 'Input',
  },
  {
    label: '经度',
    field: 'longitude',
    component: 'MapChoose',
    componentProps: ({ formModel, schema, formActionType, tableAction }) => {
      console.log(schema);
      console.log(formActionType);
      console.log(tableAction);
      return {
        center:
          formModel.longitude != null && formModel.longitude != 'none'
            ? { longitude: formModel.longitude, latitude: formModel.latitude }
            : { longitude: '120.300319', latitude: '28.13513' },
        onChange: (e: any) => {
          formModel.longitude = e;
        },
        onChangeTwo: (e: any) => {
          formModel.latitude = e;
        },
      };
    },
  },
  {
    label: '纬度',
    field: 'latitude',
    component: 'Input',
  },
  {
    label: '配置id',
    field: 'configId',
    component: 'Input',
  },
];
//子表列表数据
export const busVisionConfigSmsColumns: BasicColumn[] = [
  {
    title: '人员名称',
    align: 'center',
    dataIndex: 'realName',
  },
  {
    title: '人员账号',
    align: 'center',
    dataIndex: 'userId',
  },
  {
    title: '是否发送短信',
    align: 'center',
    dataIndex: 'smsStatus',
    customRender: ({ text }) => {
      return render.renderSwitch(text, [
        { text: '是', value: 'Y' },
        { text: '否', value: 'N' },
      ]);
    },
  },
  {
    title: '是否拨打电话',
    align: 'center',
    dataIndex: 'voiceStatus',
    customRender: ({ text }) => {
      return render.renderSwitch(text, [
        { text: '是', value: 'Y' },
        { text: '否', value: 'N' },
      ]);
    },
  },
];
//子表表单数据
export const busVisionConfigSmsFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '配置ID',
    field: 'configId',
    component: 'Input',
  },
  {
    label: '人员ID',
    field: 'userId',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'realname',
    },
  },
  {
    label: '是否发送短信',
    field: 'smsStatus',
    component: 'JSwitch',
    componentProps: {},
  },
  {
    label: '是否拨打电话',
    field: 'voiceStatus',
    component: 'JSwitch',
    componentProps: {},
  },
];
