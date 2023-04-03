import { defineStore } from 'pinia';
import { store } from '/@/store';

export const useBusStore = defineStore({
  // 定义缓存id
  id: 'bus-store',
  // 在这里写当前缓存里储存的变量
  state() {
    return {
      localBean: {},
      msg: 'hello world!!',
    };
  },
  // 定义当前缓存公开的 getters，相当于vue的计算属性
  getters: {
    getMsg(): string {
      return this.msg;
    },
    getLocalBean(): Object {
      return this.localBean;
    },
  },
  // 定义当前缓存公开的方法，可以直接调用并传参
  actions: {
    setMsg(msg: string) {
      this.msg = msg;
    },
    setLocalBean(localBean: any) {
      this.localBean = localBean;
    },
  },
});

// 在vue3的setup方法之外使用时，需要调用此方法
export function useUseMyStoreWithOut() {
  return useBusStore(store);
}
