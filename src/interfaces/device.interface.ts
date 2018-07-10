export interface DeviceInterface {
  isAvailable(): Promise<string>;

  getTouchSetting(androidClientId?: string, androidToken?: string, iosMessage?: string): Promise<any>;

  setTouchSetting(iosMessage?: string): Promise<any>;
}
