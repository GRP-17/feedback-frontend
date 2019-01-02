import axios from "axios";
import { baseUrl } from "../config";

/**
 * Usage:
 * const api = new Api(baseUrl);
 * api.request('feedback', { method: "get", ... });
 */
class Api {
  constructor(baseUrl) {
    if (process.env.NODE_ENV !== "production") {
      this.baseUrl = "https://cors-anywhere.herokuapp.com/" + baseUrl; // fall back to proxy
    } else {
      this.baseUrl = baseUrl;
    }
    this.resourceNames = ["feedback"];
    this.resources = {};
    this._init();
  }

  /* The key method to request a resource. */
  async request(resourceName, configs = {}) {
    // all options: https://github.com/axios/axios#request-config
    await this._checkResources();
    try {
      configs.url = this.resources[resourceName];
      const { data } = await axios(configs);
      return data;
    } catch (e) {
      // TODO: error handling
    }
  }

  /* Get all available resources. */
  async _init() {
    try {
      const { data } = await axios.get(this.baseUrl);
      const links = data._links;
      this._initResources(links);
      Promise.resolve();
    } catch (e) {
      // TODO: error handling
    }
  }

  _initResources(resourceLinks) {
    this.resourceNames.forEach(name => {
      this.resources[name] = resourceLinks[name].href;
    });
  }

  async _checkResources() {
    if (Object.keys(this.resources).length === 0) {
      // empty resources
      await this._init();
    }
    Promise.resolve();
  }
}

const api = new Api(baseUrl);

export default api;
