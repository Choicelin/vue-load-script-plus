## install
> npm install vue-load-script-plus --save

## Usage
```javascript 1.6
// main.js
import Vue from 'vue'
import VueLoadScript from 'vue-load-script-plus'
Vue.use(VueLoadScript)
```

```vue
// someComponents.vue
<script>
export default {
  mounted () {
    this.$loadScript(
      'http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js',
      {
        'data-appid': 'APPID',
        'data-redirecturi': 'REDIRECTURI',
        'charset': 'utf-8'
      }
    )
  }
}
</script>
// generated script tag would be
// <script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="APPID" data-redirecturi="REDIRECTURI" charset="utf-8"></script>
```
