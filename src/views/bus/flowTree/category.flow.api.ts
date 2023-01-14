import { defHttp } from '/@/utils/http/axios';

enum Api {
  treeList = '/category/busFlowCategory/loadTreeRoot',
  searchBy = '/category/busFlowCategory/loadTreeRoot',
  processList = '/flowable/processList',
  deployList = '/flowable/deployList',
  processCreate = '/flowable/processCreate',
}

/**
 * 获取部门树列表
 */
export const queryTreeList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });

export const processList = (params?) => defHttp.get({ url: Api.processList, params });
export const deployList = (params?) => defHttp.get({ url: Api.deployList, params });

export const processCreate = (params?) => defHttp.post({ url: Api.processCreate, params });
/**
 * 根据关键字搜索部门
 */
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });
