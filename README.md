## Inspired by vue-plugin-load-script
This project is inspired by vue-plugin-load-script, add some new features on it,if you don't need the new features you could use vue-plugin-load-script.
## Install
> npm install vue-load-script-plus --save

## API list

- loadScript
- unBlockloadAllScripts
- unloadScript
- loadAfterUnloadScript

## Usage
```javascript 1.6
// main.js
import Vue from 'vue'
import VueLoadScript from 'vue-load-script-plus'
Vue.use(VueLoadScript)
```
### $loadScript with addtional feature
```vue
// someComponent.vue
<template>
<button @click="removeScriptTag"></button>
</template>
<script>
export default {
  mounted () {
    // load your script tag, if you 
    // don't need to set attributes on script tag.
    // you can stop passing the second parameter
    this.$loadScript(
      'http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js',
      {
        'data-appid': 'APPID',
        'data-redirecturi': 'REDIRECTURI',
        'charset': 'utf-8'
      }
    ).then(() => {
      // do your logic
    })
  },
  methods: {
    // remove script tag from head
    removeScriptTag () {
      this.$unloadScript('http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js')
    }
  }
}
</script>
// generated script tag would be
// <script 
    type="text/javascript"
    async="" 
    src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" 
    data-appid="APPID" 
    data-redirecturi="REDIRECTURI" 
    charset="utf-8"></script>
```
## New Feature
### $unBlockloadAllScripts
It will load an array of scripts, all of the scripts will be loaded,no matter some of them was 404 or 301 
```javascript 1.6

const arr = [
  'https://cdn.bootcss.com/jquery/3.3.1/core.js', // first script loaded
  'https://cdn.bootcss.com/jquery/3.3.1/jquery.js' // then second script loaded
  ]
this.$unBlockloadAllScripts(arr)
    .then(() => {
      // after all loaded, do your logic  
    })
    .catch(() => {
      // after all loaded, do your logic
    })
```
> I suggest you to write your logic both in the then and catch callback, to ensure that your own logic are excuted. 
The script tags will be loaded in the order of its order in the array.

### loadAfterUnloadScript
It will load script after it was unloaded

``` javascript 1.6
    this.$loadAfterUnloadScript(
      'http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js',
      {
        'data-appid': 'APPID',
        'data-redirecturi': 'REDIRECTURI',
        'charset': 'utf-8'
      }
    ).then(() => {
      // do your logic
    })
```
