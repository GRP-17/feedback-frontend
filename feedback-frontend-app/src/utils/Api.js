import axios from 'axios'
import { baseUrl, appUrl /* , corsHelper */ } from '../config'

/**
 * Usage:
 * const api = new Api(baseUrl);
 * api.request('feedback', { method: 'get', ... });
 *
 * Append url parameters:
 * api.request('dashboard', { method: 'delete', appendUrl: '/id' + 123 })
 * => '/dashbaord/123'
 */
class Api {
  constructor() {
    this.resources = {}
    this.configs = {}
    if (!this._isProduction()) {
      this.configs.headers = {
        'X-Requested-With': appUrl,
      }
    }

    this.axios = axios.create({
      paramsSerializer(params) {
        // this mainly works for labelId in query params, e.g.
        // it converts: ...&labelId[]={id1}&labelId[]={id2}
        // to: ...&labelId={id1}&labelId={id2}
        // see https://stackoverflow.com/questions/52482203/axios-multiple-values-comma-separated-in-a-parameter
        const searchParams = new URLSearchParams()
        for (const key of Object.keys(params)) {
          const param = params[key]
          if (param === null) {
            continue
          }
          if (Array.isArray(param)) {
            for (const p of param) {
              searchParams.append(key, p)
            }
          } else {
            searchParams.append(key, param)
          }
        }
        return searchParams.toString()
      },
    })

    this._init()
  }

  /* The key method to request a resource. */
  async request(resourceName, configs = {}) {
    // all options: https://github.com/axios/axios#request-config
    await this._checkResources()
    try {
      const url = this.resources[resourceName]
      configs.url =
        this._parseUrl(url) + (configs.appendUrl ? configs.appendUrl : '')
      configs = { ...configs, ...this.configs }
      const { data } = await this.axios(configs)
      return data
    } catch (e) {
      throw e
      // TODO: error handling
    }
  }

  /* Get all available resources. */
  async _init() {
    try {
      const configs = {
        url: this._parseUrl(baseUrl),
        // url: corsHelper + "http://google.com/",
        ...this.configs,
      }
      const { data } = await this.axios(configs)
      const links = data._links
      this._initResources(links)
      Promise.resolve()
    } catch (e) {
      // TODO: error handling
    }
  }

  _initResources(resourceLinks) {
    Object.keys(resourceLinks).forEach(key => {
      this.resources[key] = resourceLinks[key].href
    })
  }

  async _checkResources() {
    if (Object.keys(this.resources).length === 0) {
      // empty resources
      await this._init()
    }
    Promise.resolve()
  }

  _isProduction() {
    return process.env.NODE_ENV === 'production'
  }

  _parseUrl(url) {
    // return this._isProduction() ? url : corsHelper + url;
    return url
  }
}

const api = new Api(baseUrl)

export default api
