export interface ICloudbaseEvent {
  url: string
  data?: {
    [key: string]: any
  }
  [key: string]: any
}

export interface ICloudbaseContext {}
