import { ScfError } from './error'
import type { IScfErrorInfo, IBaseContext, ICloudbaseEvent } from '#types'
export const DEAULT_FAILED_CODE = 'FAIL_TO_INVOKE_FUNCTION'

const proto: IBaseContext = {

  throw (message: string, info?: IScfErrorInfo) {
    throw new ScfError(message, {
      ...info,
      code: info?.code || DEAULT_FAILED_CODE
    })
  }
}

export default proto
