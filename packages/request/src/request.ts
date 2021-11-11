import type { IRequestOption, RequestMode } from '#types'

function wxRequest (option: WechatMiniprogram.RequestOption) {
  const p: Promise<unknown> & { task?: WechatMiniprogram.RequestTask } =
    new Promise((resolve, reject) => {
      p.task = wx.request({
        url: option.url,
        data: option.data,
        header: option.header,
        timeout: option.timeout,
        method: 'POST',
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  return p
}

export class Request {
  public mode: RequestMode
  public httpMethod: 'post'
  public baseUrl: string
  constructor (option?: IRequestOption) {
    this.mode = option.mode || 'serverless'
    this.httpMethod = option.httpMethod || 'post'
    this.baseUrl = option.baseUrl || ''
  }

  request (name, data, option?: Partial<WechatMiniprogram.RequestOption>) {
    if (this.mode === 'serverless') {
      return wx.cloud.callFunction({
        name,
        data
      })
    } else {
      return wxRequest(
        Object.assign(
          {
            url: this.baseUrl + name,
            data
          },
          option
        )
      )
    }
  }
}

export default new Request()
