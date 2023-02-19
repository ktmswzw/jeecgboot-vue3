import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  taskList = '/task/list',
  taskCheck = '/task/complete',
  deployDelete = '/task/deleteAll',
  exportXls = '/flowable/exportXls',
}

export const getExportUrl = Api.exportXls;

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
export const taskList = (params?) => defHttp.get({ url: Api.taskList, params });
export const taskCheck = (params?) => {
  return defHttp.post({ url: Api.taskCheck, params });
};
