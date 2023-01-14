<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    :width="adaptiveWidth"
    @ok="handleSubmit"
    :showFooter="showFooter"
    destroyOnClose
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../process.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const rowId = ref('');
  //表单配置
  const [registerForm, { setProps, resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const showFooter = ref(true);
  //表单赋值
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    console.log(data);
    showFooter.value = data?.showFooter ?? true;
    setDrawerProps({ confirmLoading: false, showFooter: showFooter.value });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
    }
    await setFieldsValue({ category: data.record.category });
    setProps({ disabled: !showFooter.value });
  });
  //获取标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增模型' : '编辑模型'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();

  //提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      console.log(values);
      setDrawerProps({ confirmLoading: true });
      //提交表单
      // await processCreate(values);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success', { values });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
