import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/monitor/busMonitorSys/list',
  save='/monitor/busMonitorSys/add',
  edit='/monitor/busMonitorSys/edit',
  deleteOne = '/monitor/busMonitorSys/delete',
  deleteBatch = '/monitor/busMonitorSys/deleteBatch',
  importExcel = '/monitor/busMonitorSys/importExcel',
  exportXls = '/monitor/busMonitorSys/exportXls',
  busMonitorLogList = '/monitor/busMonitorSys/listBusMonitorLogByMainId',
  busMonitorLogSave='/monitor/busMonitorSys/addBusMonitorLog',
  busMonitorLogEdit='/monitor/busMonitorSys/editBusMonitorLog',
  busMonitorLogDelete = '/monitor/busMonitorSys/deleteBusMonitorLog',
  busMonitorLogDeleteBatch = '/monitor/busMonitorSys/deleteBatchBusMonitorLog',
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
export const busMonitorLogList = (params) => {
  if(params['configId']){
    return defHttp.get({url: Api.busMonitorLogList, params});
  }
  return Promise.resolve({});
}


/**
 * 删除单个
 */
export const busMonitorLogDelete = (params,handleSuccess) => {
  return defHttp.delete({url: Api.busMonitorLogDelete, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const busMonitorLogDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.busMonitorLogDeleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const  busMonitorLogSaveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.busMonitorLogEdit : Api.busMonitorLogSave;
  return defHttp.post({url: url, params});
}
/**
 * 导入
 */
export const busMonitorLogImportUrl = '/monitor/busMonitorSys/importBusMonitorLog'

/**
 * 导出
 */
export const busMonitorLogExportXlsUrl = '/monitor/busMonitorSys/exportBusMonitorLog'
