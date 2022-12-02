import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/custom/busCustomer/list',
  save = '/custom/busCustomer/add',
  edit = '/custom/busCustomer/edit',
  deleteOne = '/custom/busCustomer/delete',
  deleteBatch = '/custom/busCustomer/deleteBatch',
  importExcel = '/custom/busCustomer/importExcel',
  exportXls = '/custom/busCustomer/exportXls',
  busCustomerSpecialListList = '/custom/busCustomer/queryBusCustomerSpecialListByMainId',
  busCustomContractList = '/custom/busCustomer/queryBusCustomContractByMainId',
  busContactBillList = '/custom/busCustomer/queryBusContactBillByMainId',
  busCustomQuotedList = '/custom/busCustomer/queryBusCustomQuotedByMainId',
  busCustomerLabelList = '/custom/busCustomer/queryBusCustomerLabelByMainId',
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
 * 子表单查询接口
 * @param params
 */
export const queryBusCustomerSpecialList = Api.busCustomerSpecialListList;
/**
 * 子表单查询接口
 * @param params
 */
export const queryBusCustomContract = Api.busCustomContractList;
/**
 * 子表单查询接口
 * @param params
 */
export const queryBusContactBill = Api.busContactBillList;
/**
 * 子表单查询接口
 * @param params
 */
export const queryBusCustomQuoted = Api.busCustomQuotedList;
/**
 * 子表单查询接口
 * @param params
 */
export const queryBusCustomerLabel = Api.busCustomerLabelList;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 子表列表接口
 * @param params
 */
export const busCustomerSpecialListList = (params) => defHttp.get({ url: Api.busCustomerSpecialListList, params }, { isTransformResponse: false });
/**
 * 子表列表接口
 * @param params
 */
export const busCustomContractList = (params) => defHttp.get({ url: Api.busCustomContractList, params }, { isTransformResponse: false });
/**
 * 子表列表接口
 * @param params
 */
export const busContactBillList = (params) => defHttp.get({ url: Api.busContactBillList, params }, { isTransformResponse: false });
/**
 * 子表列表接口
 * @param params
 */
export const busCustomQuotedList = (params) => defHttp.get({ url: Api.busCustomQuotedList, params }, { isTransformResponse: false });
/**
 * 子表列表接口
 * @param params
 */
export const busCustomerLabelList = (params) => defHttp.get({ url: Api.busCustomerLabelList, params }, { isTransformResponse: false });
