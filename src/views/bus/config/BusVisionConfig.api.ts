import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/config/busVisionConfig/list',
  save='/config/busVisionConfig/add',
  edit='/config/busVisionConfig/edit',
  deleteOne = '/config/busVisionConfig/delete',
  deleteBatch = '/config/busVisionConfig/deleteBatch',
  importExcel = '/config/busVisionConfig/importExcel',
  exportXls = '/config/busVisionConfig/exportXls',
  busVisionPrefabricatedList = '/config/busVisionConfig/listBusVisionPrefabricatedByMainId',
  busVisionPrefabricatedSave='/config/busVisionConfig/addBusVisionPrefabricated',
  busVisionPrefabricatedEdit='/config/busVisionConfig/editBusVisionPrefabricated',
  busVisionPrefabricatedDelete = '/config/busVisionConfig/deleteBusVisionPrefabricated',
  busVisionPrefabricatedDeleteBatch = '/config/busVisionConfig/deleteBatchBusVisionPrefabricated',
  busVisionConfigSmsList = '/config/busVisionConfig/listBusVisionConfigSmsByMainId',
  busVisionConfigSmsSave='/config/busVisionConfig/addBusVisionConfigSms',
  busVisionConfigSmsEdit='/config/busVisionConfig/editBusVisionConfigSms',
  busVisionConfigSmsDelete = '/config/busVisionConfig/deleteBusVisionConfigSms',
  busVisionConfigSmsDeleteBatch = '/config/busVisionConfig/deleteBatchBusVisionConfigSms',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
/**
 * 列表接口
 * @param params
 */
export const busVisionPrefabricatedList = (params) => {
  if(params['configId']){
    return defHttp.get({url: Api.busVisionPrefabricatedList, params});
  }
  return Promise.resolve({});
}


/**
 * 删除单个
 */
export const busVisionPrefabricatedDelete = (params,handleSuccess) => {
  return defHttp.delete({url: Api.busVisionPrefabricatedDelete, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const busVisionPrefabricatedDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.busVisionPrefabricatedDeleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const  busVisionPrefabricatedSaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.busVisionPrefabricatedEdit : Api.busVisionPrefabricatedSave;
  return defHttp.post({url: url, params});
}
/**
 * 导入
 */
export const busVisionPrefabricatedImportUrl = '/config/busVisionConfig/importBusVisionPrefabricated'

/**
 * 导出
 */
export const busVisionPrefabricatedExportXlsUrl = '/config/busVisionConfig/exportBusVisionPrefabricated'
/**
 * 列表接口
 * @param params
 */
export const busVisionConfigSmsList = (params) => {
  if(params['configId']){
    return defHttp.get({url: Api.busVisionConfigSmsList, params});
  }
  return Promise.resolve({});
}


/**
 * 删除单个
 */
export const busVisionConfigSmsDelete = (params,handleSuccess) => {
  return defHttp.delete({url: Api.busVisionConfigSmsDelete, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const busVisionConfigSmsDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.busVisionConfigSmsDeleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const  busVisionConfigSmsSaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.busVisionConfigSmsEdit : Api.busVisionConfigSmsSave;
  return defHttp.post({url: url, params});
}
/**
 * 导入
 */
export const busVisionConfigSmsImportUrl = '/config/busVisionConfig/importBusVisionConfigSms'

/**
 * 导出
 */
export const busVisionConfigSmsExportXlsUrl = '/config/busVisionConfig/exportBusVisionConfigSms'
