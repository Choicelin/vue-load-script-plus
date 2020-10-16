/**
 * Creator: JIZHUA<413807584@qq.com>
 * Date: 2019-03-17
 * Time: 15:43
 */

const LoadScript = {
  install: function (Vue) {
    Vue.loadScript = Vue.prototype.$loadScript = function (src, attrObject, beforeBody) { // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + src + '"]')) {
          resolve()

          return
        }

        const el = document.createElement('script')

        el.type = 'text/javascript'
        el.async = true
        el.src = src
        if (Object.prototype.toString.call(attrObject) === '[object Object]') {
          Object.keys(attrObject).forEach(key => {
            el.setAttribute(key, attrObject[key])
          })
        }

        el.addEventListener('load', resolve)
        el.addEventListener('error', reject)
        el.addEventListener('abort', reject)
        if (beforeBody) {
          document.body.appendChild(el)
        } else {
          document.head.appendChild(el)
        }
      })
    }

    Vue.unBlockloadAllScripts = Vue.prototype.$unBlockloadAllScripts = function (scriptsArray) {
      return new Promise(function (resolve, reject) {
        const promise = scriptsArray.reduce((promise, current) => {
          return promise.then(() => {
            return Vue.loadScript(current)
          }).catch(() => {
            return Vue.loadScript(current)
          })
        }, Vue.loadScript(scriptsArray[0]))
        promise
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }

    Vue.unBlockloadAllScriptsAndAttr = Vue.prototype.$unBlockloadAllScriptsAndAttr =  function (scriptsArray) {
      return new Promise(function (resolve, reject) {
        const promise = scriptsArray.reduce((promise, current) => {
          return promise.then(() => {
            return Vue.loadScript(current.script, current.attrObject, current.beforeBody)
          }).catch(() => {
            return Vue.loadScript(current.script, current.attrObject, current.beforeBody)
          })
        }, Vue.loadScript(scriptsArray[0].script, scriptsArray[0].attrObject, scriptsArray[0].beforeBody))
        promise
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }

    Vue.unloadScript = Vue.prototype.$unloadScript = function (src, beforeBody) { // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        const el = document.querySelector('script[src="' + src + '"]')

        if (!el) {
          reject()

          return
        }
        if (beforeBody) {
          document.body.removeChild(el)
        } else {
          document.head.removeChild(el)
        }

        resolve()
      })
    }
    Vue.loadAfterUnloadScript = Vue.prototype.$loadAfterUnloadScript = function (src, attrObject, beforeBody) {
      return new Promise(function (resolve, reject) {
        const loadedScript = document.querySelector('script[src="' + src + '"]')
        if (loadedScript) {
          document.head.removeChild(loadedScript)
        }

        const el = document.createElement('script')

        el.type = 'text/javascript'
        el.async = true
        el.src = src
        if (Object.prototype.toString.call(attrObject) === '[object Object]') {
          Object.keys(attrObject).forEach(key => {
            el.setAttribute(key, attrObject[key])
          })
        }

        el.addEventListener('load', resolve)
        el.addEventListener('error', reject)
        el.addEventListener('abort', reject)

        if (beforeBody) {
          document.body.appendChild(el)
        } else {
          document.head.appendChild(el)
        }
      })
    }
  },
}

export default LoadScript
