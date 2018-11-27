# jet-js-cli
### [theajack](https://www.theajack.com/)
#### [Jet.js](https://www.jet-js.com) 的脚手架工具，帮助您更便捷地使用Jet
#### [Jet.js](https://www.jet-js.com) Scaffolding tools to help you use Jet.js framework more easily
#### Jet 是一个轻量级、渐进式的 JS MVVM框架
#### Jet is a lightweight, progressive JS MVVM framework

#### 1.Installation
1.Use npm to install

<pre>
npm install jet-js-cli -g
</pre>

下载需要一点时间，请耐心等候
Download takes a little time, please be patient

（请使用 `-g` 全局安装，否则后续命令无法执行）
(Please use `-g` to install globally, otherwise subsequent commands cannot be executed)

#### 2.Use

选择一个您希望建立项目的目录，命令行运行以下命令：
Select a directory where you want to build the project, and run the following command from the command line:

<pre>
jet init projectName
</pre>

#### 3.Development

执行上述命令后会下载一个Jet的开发模板和相应开发环境，执行以下命令可以运行这个Jet示例程序：
After executing the above command, you will download a Jet development template and the corresponding development environment. You can run the Jet sample program by executing the following command:

<pre>
cd projectName
jet run
</pre>

详细Jet使用教程请参考 [Jet API](https://www.theajack.com/jet/)
For detailed Jet tutorials, please refer to [Jet API] (https://www.theajack.com/jet/)

#### 4.Package and use in production environment

##### 4.1 Packing Command
使用以下命令打包项目

<pre>jet build</pre>

打包完成后，会在根目录下生成一个`build`文件夹（如已有`build`文件夹，会将旧的打包文件覆盖），将build文件夹中的所有文件复制到您的生产环境中即可运行。
After the package is completed, a build folder will be generated in the root directory (such as the existing build folder, the old package file will be overwritten), and all the files in the build folder will be copied to your production environment to run.

生成`build`文件夹后，可以使用一下命令测试打包之后的项目能否正常工作。
After generating the `build` folder, you can use the following command to test whether the packaged project works properly.

<pre>
cd build
jet run
</pre>

实际上，您可以使用`jet run`命令在任一目录下启动一个http服务器，入口文件是`index.html`
In fact, you can use the `jet run` command to start an http server in any directory. The entry file is `index.html`

##### 4.2 Packing configuration

在根目录中的`build.config.json`文件中，有以下配置项
In the `build.config.json` file in the root directory, there are the following configuration items.

<pre>
...
"jetConfig": {
	"compressHtml": true,
	"compressCss": true,
	"compressJs": true,
	"buildJsWithBabel": false
},
...
</pre>

各项参数含义如下
The meaning of each parameter is as follows

|参数|默认值|描述|
|:--:|:--:|:--:|
|compressHtml|true|是否压缩html文件|
|compressCss|true|是否压缩css文件|
|compressJs|true|是否压缩js文件|
|buildJsWithBabel|false|是否将es6转为es5|

|Parameters|Defaults|Description|
|:--:|:--:|:--:|
|compressHtml|true|whether to compress html files|
|compressCss|true|Currently compress css files|
|compressJs|true|whether to compress js files|
|buildJsWithBabel|false| Whether to convert es6 to es5|

-备注：若您使用es6开发，虽然支持配置 buildJsWithBabel 后在生产环境中转es5。但在开发环境中，请使用es6兼容性较好的浏览器，例如高版本的Chrome。因为在开发环境中，Jet并没有对es6转es5.
- Note: If you use es6 development, although support for configuring buildJsWithBabel, transfer es5 in the production environment. But in a development environment, use a browser with better es6 compatibility, such as a higher version of Chrome. Because in the development environment, Jet did not turn es5 to es5.
