import { useUserStore } from '/@/store/modules/user';
import { computed, unref } from 'vue';

// User permissions related operations
export function useCustomLogin() {
  const userStore = useUserStore();

  return {
    isCustomLogin: computed(() => unref(userStore.getCustomLogin)),
  };
}
