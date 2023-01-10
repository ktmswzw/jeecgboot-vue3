import { defHttp } from '/@/utils/http/axios';

enum Api {
  treeList = '/category/busFlowCategory/loadTreeRoot',
  searchBy = '/category/busFlowCategory/loadTreeRoot',
  processList = '/flowable/processList',
  processCreate = '/flowable/processCreate',
  duplicateCheck = '/sys/duplicate/check',
}

/**
 * 获取部门树列表
 */
export const queryTreeList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });

export const processList = (params?) => defHttp.get({ url: Api.processList, params }, { isTransformResponse: false });

export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });

export const processCreate = (params?) => defHttp.post({ url: Api.processCreate, params }, { isTransformResponse: false });
/**
 * 根据关键字搜索部门
 */
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });
