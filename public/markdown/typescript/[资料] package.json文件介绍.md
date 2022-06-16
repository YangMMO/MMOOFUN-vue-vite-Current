## package.json 文件介绍

相信接触过 JavaScript 的同学对于 package.json 文件一定不会陌生。几乎所有现代化的前端或 Node.js 项目根目录下都会有这个文件，那么
它的作用是什么呢？我们来接着往下看。

## package.json 是什么

package.json 是 [npm](https://www.npmjs.com/) 包（npm package）的描述文件

- 其本质是一个 JSON 对象
- npm 是目前 JavaScript 生态中运用最为广泛的包管理工具。

package.json 通过一个 JSON 对象来描述 npm 包的各项属性，包括 name、version、description、main、scripts ...

## 创建一个 package.json 文件

```git
npm init
```
执行命令后 npm 将会通过问答的形式来帮助你初始化一个 package.json 文件，示例如下：
```git
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (code) typescript-tutorial
version: (1.0.0)
description: typescript languare tutorial
entry point: (index.js)
test command:
git repository:
keywords:
author: ivanpeng
license: (ISC)
About to write to /Users/jinvien/code/package.json:

{
"name": "typescript-tutorial",
"version": "1.0.0",
"description": "typescript languare tutorial",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "ivanpeng",
"license": "ISC"
}


Is this OK? (yes) yes
```

输入上述内容，生成如下格式的的 package.json 文件：
```json
{
  "name": "typescript-tutorial",
  "version": "1.0.0",
  "description": "typescript languare tutorial",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "author": "ivanpeng",
  "license": "ISC"
}
```

如果你觉得问答式有些繁琐，那么你可以通过 --yes 来简化这个步骤
```git
npm init --yes
```

通过上述命令将不用输入任何内容即可生成一份 package.json 文件。其中各项属性的默认值遵循如下规则：
```
- name             # 默认为目录名称，但在 git 仓库中，将采用 git 仓库的名称
- version          # 1.0.0
- main             # index.js
- scripts          # 默认情况下会创建一个空test脚本
- keywords         # 空
- author           # 空
- license          # ISC
- repository       # 将从当前目录中提取信息（如果存在）
- bugs             # 将从当前目录中提取信息（如果存在）
- homepage         # 将从当前目录中提取信息（如果存在）
```

我们还可以为 init 命令设置一些配置项，例如：
```git
npm set init.author.email "hi@tencent.com"
npm set init.author.name "Ivan"
npm set init.license "MIT"
```
### 小贴士：

如果 package.json 中没有 description 属性，npm 会使用 README.md 或 README.md 的第一行来帮助人们在 npm 搜索中找到对应的包，所以在 package.json 中 声明 description 属性有助于包被检索到。

## package.json 文件详解
### 
name 和 version 属性

一个符合规范的 package.json 文件必须有 name 和 version 属性，name 用于描述包的名称，version 则表示包的版本
name 命名规则：全部小写、一个单词，不允许空格、允许英文破折号和下划线
```json
{
  "name": "typescript-tutorial",
  "version": "1.0.0"
}
```
### 
main

main 用于指定 npm 包的入口文件

### script

script 是 npm 包的脚本命令对象。它的每一个属性对应一个命令，属性值则对应要执行的命令脚本。例如：
```json
"script":{
  "dev": "node build/dev-server.js"
}
```


我们在终端输入 `npm run dev` 就等同于执行 `node build/dev-server.js`

### package.json 的依赖管理

当我们的 npm 包依赖于其他 npm 包时，我们需要在 package.json 中对依赖进行描述。
npm 包中可以包含两种类型的依赖包：

- "dependencies"：在生产环境中需要的包
- "devDependencies"：这些包仅用于开发和测试


添加依赖项的的方法是执行`npm install`，同时可以使用 --save 或 --save-dev 来区分两种依赖

dependencies：
```git
npm install <package_name> --save
```

devDependencies：
```git
npm install <package_name> --save-dev
```
### 
package.json 的其他属性

完整的 package.json 属性介绍，可以参考[官方文档](https://docs.npmjs.com/files/package.json/)
