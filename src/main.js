// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/styles/index.scss' // global css
import store from './store'
import {
  Button,
  FormItem,
  Form,
  Input,
  Loading,
  Select,
  Table,
  TableColumn,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload,
  Dialog,
  Option,
  pagination
} from 'element-ui';
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Option);
Vue.use(pagination);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.filter('formatDate',function (value, fmt) {
    let getDate = new Date(value);
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt;
  }
)

import '@/icons' // icon

import * as api from '@/utils/fetch'
Vue.prototype.$api = api.options;
Vue.prototype.$post = api.post;
Vue.prototype.$get = api.get;

import './session'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
