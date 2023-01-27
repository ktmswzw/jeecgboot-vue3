export declare const TaskStatus: {
  0: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  1: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  2: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  10: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  11: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  12: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  20: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  21: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  30: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
  31: {
    color: string;
    background: string;
    borderColor: string;
    text: string;
  };
};
export declare enum ProcessInstanceState {
  ACTIVE = 0,
  SUSPENDED = 1,
  COMPLETED = 2,
  REFUSED = 3,
  INVALID = 4,
  EXTERNALLY_TERMINATED = 5,
  INTERNALLY_TERMINATED = 6,
}
export interface ActTreeInstance {
  id: string;
  parentActivityInstanceId: string;
  bpmnActivityId: string;
  bpmnActivityName: string;
  activityType: string;
  state: number;
  multiInstanceNum: number;
  multiCompleteInstanceNum: number;
  multiInstance: boolean;
  taskId: string;
  durationInMillisFormat: string;
  startTime: string;
  endTime: string;
  sequenceCounter: number;
  taskTitle: string;
  children: ActTreeInstance[];
  isLeaf: boolean;
  hasChildren: boolean;
}
export interface SequenceFlow {
  targetActivityState: string;
}
export interface ActSimpleInstance {
  id: string;
  parentActivityInstanceId: string;
  bpmnActivityId: string;
  bpmnActivityName: string;
  activityType: string;
  state: number;
  multiInstanceNum: number;
  multiCompleteInstanceNum: number;
  multiInstance: boolean;
  taskId: string;
  durationInMillisFormat: string;
  startTime: string;
  endTime: string;
  sequenceCounter: number;
  taskTitle: string;
  currentSequenceMap: Map<String, SequenceFlow>;
}
export interface BpmnInstanceInfo {
  bpmnBase64: string;
  id: string;
  processName: string;
  bpmnProcessId: string;
  processDefinitionId: string;
  categoryName: string;
  businessKey: string;
  processState: ProcessInstanceState;
  suspended: boolean;
  durationInMillisFormat: string;
  processStartTime: string;
  processEndTime: string;
  startTitle: string;
  activityInstanceList: ActTreeInstance[];
  currentActivityInstanceMap: Map<String, ActSimpleInstance>;
}
export interface CreateHtmlFuncArgs {
  element: any;
  bpmnProcessId: string;
  userTask: boolean;
  parentActivityInstanceId: string;
  bpmnActivityId: string;
  activityType: string;
  multiInstance: boolean;
  taskId: string;
}
