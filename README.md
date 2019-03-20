## Install
> npm install vue-load-script-plus --save

## Usage
```javascript 1.6
// main.js
import Vue from 'vue'
import VueLoadScript from 'vue-load-script-plus'
Vue.use(VueLoadScript)
```

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

```javascript 1.6
// if you wanna load multiple script tags and don't mind that some of them 
// are in a status of 500 or 301 etc.You can use my unblocking method to 
// load all script tags.This method will load all scripts, and resolve or 
// reject after the last one are loaded.None of the scripts would be 
// blocked, all of them would be loaded whether they are in a status of 500 
// or 301 or etc.

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
The script tags will be loaded in the order of it's order in the array.
