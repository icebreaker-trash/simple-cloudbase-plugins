import type { IScfErrorInfo } from './error'
import type { ICloudbaseEvent, ICloudbaseContext } from './application'
export interface IBaseContext {
  throw(message: string, info?: IScfErrorInfo): never
}

export interface IExtendableContext extends IBaseContext {
  event: ICloudbaseEvent
  context: ICloudbaseContext
}
