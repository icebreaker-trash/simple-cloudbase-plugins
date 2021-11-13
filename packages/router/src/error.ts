// code -> info
// message
// name
// stack

// https://github.com/Raynos/error/blob/master/index.js

import type { IScfErrorInfo } from '#types'

const nargs = /\{([0-9a-zA-Z_]+)\}/g

const EMPTY_OBJECT = {}

function stringTemplate (string: string, object: IScfErrorInfo) {
  if (!object) return string

  return string.replace(
    nargs,
    function replaceArg (
      /** @type {string} */ match,
      /** @type {string} */ word,
      /** @type {number} */ index
    ) {
      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return word
      } else {
        const result = word in object ? object[word] : null
        if (result === null || result === undefined) {
          return ''
        }

        return String(result)
      }
    }
  )
}

export class ScfError extends Error {
  private __info: IScfErrorInfo

  constructor (message: string, info: IScfErrorInfo) {
    super(message)
    this.name = this.constructor.name
    this.__info = info
  }

  info () {
    return { ...this.__info }
  }

  toJSON () {
    return {
      ...this.__info,
      message: this.message,
      stack: this.stack,
      name: this.name
    }
  }

  static create (messageTmpl: string, info: IScfErrorInfo) {
    const msg = stringTemplate(messageTmpl, info)

    return new this(msg, info || EMPTY_OBJECT)
  }
}
