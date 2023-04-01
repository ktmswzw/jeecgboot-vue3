<!--地图选择组件-->
<template>
  <div>
    <a-input placeholder="请选择" v-model:value="value" style="width: 85%; margin-bottom: 5px; margin-right: 5px;" @input="emitChange"/>
    <a-button type="primary" @click="handleOpen">地图</a-button>
    <MapChooseModal @register="regModal" @getChooseResult="setValue" v-bind="emitChange" />
  </div>
</template>
<script lang="ts">
  import MapChooseModal from './modal/MapChooseModal.vue';
  import { defineComponent, ref, watchEffect, watch, provide } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { isEmpty } from '/@/utils/is';

  export default defineComponent({
    name: 'JSelectDept',
    components: {
      MapChooseModal,
    },
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    emits: ['options-change', 'change', 'select', 'update:value'],
    setup(props, { emit }) {
      const emitData = ref<any[]>();
      //注册model
      const [regModal, { openModal }] = useModal();
      //表单值
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);
      // 是否正在加载回显数据
      const loadingEcho = ref<boolean>(false);
      //下发 loadingEcho,xxxBiz组件接收
      provide('loadingEcho', loadingEcho);

      const tag = ref(false);
      const attrs = useAttrs();

      /**
       * 监听组件值
       */
      watchEffect(() => {
        props.value && initValue();
      });

      watch(
        () => props.value,
        () => {
          initValue();
        }
      );

      /**
       * 打卡弹出框
       */
      function handleOpen() {
        tag.value = true;
        openModal(true, {
          isUpdate: false,
        });
      }

      /**
       * 将字符串值转化为数组
       */
      function initValue() {
        let value = props.value ? props.value : [];
        if (value && typeof value === 'string') {
          state.value = value;
        }
      }

      /**
       * 设置下拉框的值
       */
      function setValue(values) {
        console.log(values);
        emit('update:value', values);
      }
      function emitChange() {
        emit('update:value', isEmpty(props.value) ? '' : props.value);
      }

      return {
        state,
        attrs,
        loadingEcho,
        emitChange,
        tag,
        regModal,
        setValue,
        handleOpen,
      };
    },
  });
</script>
<style lang="less" scoped>
  .j-select-row {
    @width: 82px;

    .left {
      width: calc(100% - @width - 8px);
    }

    .right {
      width: @width;
    }

    .full {
      width: 100%;
    }

    :deep(.ant-select-search__field) {
      display: none !important;
    }
  }
</style>
