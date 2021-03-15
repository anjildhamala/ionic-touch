import { TouchError } from '../models/touch.error';

export interface DeviceInterface {
  isAvailable(): Promise<string | TouchError>;

  getTouchSetting(androidClientId?: string, androidToken?: string, iosMessage?: string): Promise<any>;

  setTouchSetting(iosMessage?: string): Promise<any>;
}
