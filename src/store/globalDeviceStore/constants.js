const namespace = "golbalDevice";
const actionName = (name)=> {
  return namespace + "/" + name;
};
export const DeviceTypeAction = actionName("SETDeviceTypeAction");
export const DeviceCategoryAction = actionName("SETDeviceCategoryAction");
export const SET_AUTH_MODULE = "golbalDevice/SET_AUTH_MODULE";