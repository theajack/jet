

import axios from 'axios';

var Tool = {
    ip: 'http://xxxx.xxx.xxx/xxx',//定义请求的相同部分
    /**
     * .get('xxx',{},()=>{
     * 
     * })
     */
    get(url, params, call, ecall) {
        this.ajax({
            url: url,
            method: 'get',
            params: params,
            success: call,
            error: ecall
        })
    },
    /**
     * .post('xxx',{},()=>{
     * 
     * })
     */
    post(url, data, call, ecall) {
        this.ajax({
            url: url,
            data: data,
            success: call,
            error: ecall
        })
    },
    //如有需要 可自定义delete put等方法
    ajax(opt) {
        axios({
            method: opt.method || 'post',
            url: (opt.base || (T.ip + '/api')) + opt.url,
            params: opt.params || {},
            data: opt.data || {},
        }).then((response) => {
            // if(response.state=='xxx'){
            //     //在这里可以定义全局的验证处理，比如登录状态验证错误就退出登录
            // }
            opt.success(response.data);
        }).catch((error) => {
            if (opt.error) {
                opt.error(error);
            }
            //alert(error);//可定义全局的错误处理
        });
    },

    /**
     * store方法：
     * .store()：获取所有值
     * .store(null)：清空所有值
     * .store('a',1) :存储一个值
     * .store('a') :获取一个值
     * .store('a',null) :清除一个值
     * .store({
     *   a:1,
     *   b:{b1:11}
     * }) :以json格式存储值
    */
    store(a, b) {
        if (typeof a === 'object' && a !== null) {
            for (var k in a) {
                T.store(k, a[k]);
            }
            return
        }
        var store = sessionStorage;//或localStorage
        if (b === undefined) {
            if (a === undefined) {
                var obj = {};
                Object.keys(store).forEach(function (item) {
                    obj[item] = store.getItem(item);
                });
                return obj;
            } else if (a === null) {
                Object.keys(store).forEach(function (item) {
                    store.removeItem(item);
                });
            } else {
                var d = store.getItem(a);
                try {
                    return JSON.parse(d)
                } catch (e) {
                    if (d === parseFloat(d).toString()) {
                        return parseFloat(d);
                    }
                    return d;
                }
            }
        } else if (b === null) {
            store.removeItem(a)
        } else {
            if (typeof b === 'object') {
                store.setItem(a, JSON.stringify(b))
            } else {
                store.setItem(a, b)
            }
            return b
        }
    },
    /* 
    cookie方法：
    * .cookie('a',1) :存储一个值
    * .cookie('a') :获取一个值
    * .cookie('a',null) :清除一个值
    * .cookie({
    *   a:1,
    *   b:{b1:11}
    * }) :以json格式存储值
    * .cookie('a',1,1,'/'):后面两个参数可选，第一个是过期时间，单位为天。第二个是cookie起作用的目录，默认为当前目录。'/'意思是设置为根目录
    */
    cookie(a, b, d, e) {
        if (typeof a === 'object' && a !== null) {
            for (var k in a) {
                T.cookie(k, a[k], b, d);
            }
            return
        }
        if (arguments.length == 1) {
            if (document.cookie.length > 0) {
                var f = document.cookie.indexOf(a + "=");
                if (f != -1) {
                    f = f + a.length + 1;
                    var g = document.cookie.indexOf(";", f);
                    if (g == -1) g = document.cookie.length;
                    return unescape(document.cookie.substring(f, g))
                }
            }
            return ""
        } else {
            if (b == null) {
                T.cookie(a, "", -1)
            } else {
                var c = a + "=" + escape(b);
                if (d != undefined) {
                    var h = new Date();
                    h.setDate(h.getDate() + d);
                    c += ";expires=" + h.toGMTString()
                }
                if (e != undefined) {
                    if (typeof e == "boolean") {
                        if (e) {
                            c += (";path=/")
                        }
                    } else {
                        c += (";path=" + e)
                    }
                }
                document.cookie = c;
                return a + "=" + b
            }
        }
    }
}
export default Tool;