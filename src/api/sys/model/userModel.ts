/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface ThirdLoginParams {
  token: string;
  thirdType: string;
}
export interface CaptchaType {
  captchaType: string;
  pointJson: string;
  token: string;
}

export interface RepData {
  captchaId: string;
  projectCode: string;
  captchaType: string;
  captchaOriginalPath: string;
  captchaFontType: string;
  captchaFontSize: string;
  secretKey: string;
  originalImageBase64: string;
  point: string;
  jigsawImageBase64: string;
  wordList: string;
  pointList: string;
  pointJson: string;
  token: string;
  result: false;
  captchaVerification: string;
  clientUid: string;
  ts: string;
  browserInfo: null;
}

export interface CaptchaTypeRep {
  repCode: number;
  repMsg: string;
  repData: RepData;
  success: boolean;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  userInfo?: any
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 用户信息
  userInfo?: any;
  // 缓存字典项
  sysAllDictItems?: any;
}

/**
 * @description: Get user information return value
 */
export interface GetResultModel {
  code: number;
  message: string;
  result: object;
  success: Boolean;
}
