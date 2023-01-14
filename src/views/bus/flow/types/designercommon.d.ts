export declare const NOTICE_TYPE: {
  value: string;
  label: string;
}[];
/**
 * 数据类型
 * 1-系统固定值，2-系统表达式，3-自定义表达式
 */
export declare const DATA_TYPE: {
  SYSTEM_FIXED: number;
  SYSTEM_EXPRESSION: number;
  CUSTOM_EXPRESSION: number;
};
export declare const CUSTOM_COLOR_PICKER_COLORS: ({
  label: string;
  fill: undefined;
  stroke: undefined;
} | {
  label: string;
  fill: undefined;
  stroke: string;
} | {
  label: string;
  fill: string;
  stroke: string;
})[];
export declare const DATA_TYPE_DESCRIPT: {
  1: string;
  2: string;
  3: string;
};
/**
 * 系统数据固定类型
 * 1-单个，2-数组
 */
export declare const SYSTEM_FIXED_DATA_TYPE: {
  SINGLE: number;
  ARRAY: number;
};
export declare const CustomProperty: {
  PROCESS: string;
  START_EVENT: string;
  USER_TASK: string;
  SEQUENCE_FLOW: string;
};
export declare const Constant: {
  ANYI_CUSTOM_PREFIX: string;
  INITIATE_USER: string;
  INITIATE_USER_NAME: string;
};

export interface Group {
  id: string;
  label: string;
  entries: any[];
  items: any[];
  add?: Function;
}

export interface AnYiExtendProperty {
  value?: string;
  valueDescribe?: string;
  valueExtend?: string;
}

export interface AnYiExtendInfoArray {
  value?: AnYiExtendProperty[];
  type: number;
}

export interface AnYiExtendInfoSingle {
  value?: AnYiExtendProperty;
  type: number;
}

export interface ThirdDataComp {
  category?: HTMLElement;
  expression?: HTMLElement;
  Role?: HTMLElement;
  User?: HTMLElement;
}

export interface BpmnDiagramInfo {
  diagramBase64Data: string;
  category: string;
  havePool: number;
  diagramNames: string;
  processDefinitionKeys: string;
  description: string;
}
