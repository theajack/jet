(function () {
    Jet.__base__._useList.push('res');
    Jet.res = {
        defFileName: {
            image: '.jpg',
            media: '.mp3',
            css: '.css',
            js: '.js',
            html: '.html'
        },
        image: {},
        html: {},
        js: {},
        media: {},
        css: {},
        define: function (obj) {
            for (var k in obj) {
                for (var name in obj[k]) {
                    Jet.res[k][name] = _dealResFile(obj[k][name], k);
                }
            }
        }, getSrc: function (str, type) {
            if (str[0] == '@') {
                if (type == 'html' && str._JT_has('.html')) {//路由时传来的路径，可能会包含参数
                    var arr = str.split('.html');
                    return Jet.res[type][arr[0].substring(1)] + arr[1]
                }
                return Jet.res[type][str.substring(1)];
            }
            return _dealResFile(str, type);
        }
    }
    function _dealResFile(str, type) {
        var def = Jet.res.defFileName[type], file = str;
        if (def == undefined) {
            Jet.__base__._throw('不支持的资源类型：' + type);
        }
        if (type == 'image' || type == 'media') {
            if (str.indexOf('.') == -1) {
                file = str + def;
            }
        } else {
            if (str.substring(str.lastIndexOf('.')) !== def) {
                file = str + def;
            }
        }
        if(Jet.router)
            return Jet.router.conf[type] + Jet.__base__._dealSrc(file);
        return C._dealSrc(file);
    }
})()