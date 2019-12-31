# Jet.js:一款轻量级、渐进式的MVVM框架
## 介绍

Jet.js 是一款轻量级、渐进式的MVVM框架 [Jet.js](https://www.theajack.com/jet)，详细使用和安装教程请[点击这里](https://www.theajack.com/jet)
Jet不依赖任何第三方库，采用数据双向绑定，以数据驱动视图。

Jet可以在非服务器环境中开发，但是在非服务其环境中无法使用路由功能和jload属性以及无法使用完整的js模块规范。 Jet可以通过引入script标签的方式局部使用，从而可以与您已有的项目完美结合，实现渐进式的Web开发。

您也可以通过 [jet-js-cli](https://www.npmjs.com/package/jet-js-cli) 建立项目 或是 手动下载 <a href="https://www.theajack.com/jet/jet-template.zip" download='jet-template.zip' class='link'>Jet模板</a> 来在服务器环境中开发， 服务器环境基于lite-server。

当然若您需要使用es6进行您的项目开发，您可以在安装jet-js-cli后通过jet build命令将es6转换为es5在生产环境中使用。

## 图解

在使用和学习Jet之前，先通过一张图了解一下Jet是如何工作，以及Jet能做些什么。

以下是一个标准的Jet应用的所有主要部分和工作流程。

Jet将 DOM树映射成Jet组件树，Jet组件由new Jet()声明， 每一个Jet组件由源数据、响应数据、函数、Jet元素树、生命周期和非响应数据构成。 其中Jet元素树对应的是由Jet容器中的DOM树映射而成。

Jet元素分为两大类：绑定元素和工具元素。这些元素都继承自Jet.Base，Jet元素是Jet MVVM模式的核心。 每个Jet元素由源数据、响应域数据、DOM元素、响应域函数队列、$regist、$refresh还有其他一些方法组成， 其中View对应的就是DOM元素，Modal对应的是源数据，其他部分构成ViewModel，负责源数据与DOM之间的双向绑定。

除此之外，Jet还包含一些外围设施供开发者开箱即用，帮助更高效的构建Web应用。

Jet组件包含的特性和Jet元素包含的修饰属性，为Jet应用赋予更强大的功能。

![Jet 图解](https://www.theajack.com/jet/src/image/Jet%E5%9B%BE%E8%A7%A3.jpg)

每一个Jet组件都有它的生命周期，包含以下9个， 大致流程请参考下图:

![Jet 生命周期](https://www.theajack.com/jet/src/image/Jet%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.jpg)

## 一个基本的Jet实例

以下是一个简单的Jet组件
[点击这里](https://www.theajack.com/jet/#/code) 可以在线使用这个例子
```
<div j='message'></div><br>
<div j='user'>
    <div j=name>'姓名:'+$</div>
    <div>年龄:<input j='age' type='text' class='j-input' jon='input:console.log(this.user.age)'/></div>
    <div j='age'>($<18)?'未成年':'成年人'</div>
</div>
<script>
    new Jet({
        data:{
            message:'Hello Jet',
            user:{
                name:'theajack',
                age:24
            }
        },
        func:{
        }
    })
</script>
```
[点击这里](https://www.theajack.com/jet/#/code) 可以在线使用这个例子