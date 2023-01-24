import { defHttp } from '/@/utils/http/axios';

enum Api {
  treeList = '/category/busFlowCategory/loadTreeRoot',
  searchBy = '/category/busFlowCategory/loadTreeRoot',
  processList = '/flowable/processList',
  deployList = '/flowable/deployList',
  startProcess = '/flowable/processStart',
  processCreate = '/flowable/processCreate',
}

export const queryTreeList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });
export const processList = (params?) => defHttp.get({ url: Api.processList, params });
export const deployList = (params?) => defHttp.get({ url: Api.deployList, params });
export const startProcess = (params?) => {
  return defHttp.post({ url: Api.startProcess, params });
};
export const processCreate = (params?) => defHttp.post({ url: Api.processCreate, params });
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });
