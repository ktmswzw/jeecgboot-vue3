import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  treeList = '/category/busFlowCategory/loadTreeRoot',
  searchBy = '/category/busFlowCategory/loadTreeRoot',
  processList = '/flowable/processList',
  deployList = '/flowable/deployList',
  processXml = '/flowable/processXml',
  startProcess = '/flowable/processStart',
  processCreate = '/flowable/deploymentCreate',
  deployDelete = '/flowable/deploymentDelete',
}

export const queryTreeList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });
export const processList = (params?) => defHttp.get({ url: Api.processList, params });
export const processXml = (params?) => defHttp.get({ url: Api.processXml, params });
export const deleteOne = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deployDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
export const deployList = (params?) => defHttp.get({ url: Api.deployList, params });
export const startProcess = (params?) => {
  return defHttp.post({ url: Api.startProcess, params });
};
export const processCreate = (params?) => defHttp.post({ url: Api.processCreate, params });
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });
