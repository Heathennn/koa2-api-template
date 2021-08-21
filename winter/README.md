# Koa2 RESTful API 服务器脚手架

这是一个基于 Koa2 的轻量级 RESTful API Server 脚手架，支持 ES6。

**免责声明：** 此脚手架仅为方便开发提供基础环境，任何人或组织均可随意克隆使用，使用引入的框架需遵循原作者规定的相关协议（部分框架列表及来源地址在下方）。项目维护者均不对采用此脚手架产生的任何后果负责。

## 开发使用说明

```bash
git clone https://github.com/yi-ge/koa2-API-scaffold.git

cd mv koa2-API-scaffold
npm install
npm run dev # 可执行npm start跳过ESlint检查。
```

访问： http://127.0.0.1:3000/

## 调试说明

```bash
npm run dev --debug

Or

npm start --debug
```

支持 Node.js 原生调试功能：https://nodejs.org/api/debugger.html

## 开发环境部署

生成 node 直接可以执行的代码到 dist 目录：

```bash
npm run build
```

```bash
npm run production # 生产模式运行

# Or

node dist/app.js
```

### PM2 部署说明

提供了 PM2 部署 RESTful API Server 的示例配置，位于“pm2.js”文件中。

```bash
pm2 start pm2.js
```

PM2 配合 Docker 部署说明： http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/

### Docker 部署说明

```bash
docker pull node
docker run -itd --name RESTfulAPI -v `pwd`:/usr/src/app -w /usr/src/app node node ./dist/app.js
```

通过'docker ps'查看是否运行成功及运行状态

### Linux/Mac 直接后台运行生产环境代码

有时候为了简单，我们也这样做：

```bash
nohup node ./dist/app.js > logs/out.log &
```

查看运行状态（如果有'node app.js'出现则说明正在后台运行）：

```bash
ps aux|grep app.js
```

查看运行日志

```bash
cat logs/out.log
```

监控运行状态

```bash
tail -f logs/out.log
```

### 配合 Vue-cli 部署说明

Vue-cli（Vue2）运行'npm run build'后会在'dist'目录中生成所有静态资源文件。推荐使用 Nginx 处理静态资源以达最佳利用效果，然后通过上述任意一种方法部署 RESTful API 服务器。前后端是完全分离的，请注意 Koa2 RESTful API Server 项目中 config/main.json 里面的跨域配置。

推荐的 Nginx 配置文件：

```text
server
    {
        listen 80;
        listen [::]:80;
        server_name abc.com www.abc.com; #绑定域名
        index index.html index.htm;
        root  /www/app/dist; #Vue-cli编译后的dist目录

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log off; #访问日志路径
    }
```

Docker 中 Nginx 运行命令(将上述配置文件任意命名放置于 nginx_config 目录中即可)：

```bash
docker run -itd -p 80:80 -p 443:443 -v `pwd`/nginx_config:/etc/nginx/conf.d nginx
```

### 关于 Token 使用的特别说明（JWT 身份认证）

前端处理方案：

```javascript
import axios from "axios";
import { getToken } from "./tool";

const DevBaseUrl = "http://127.0.0.1:8080";
const ProdBashUrl = "https://xxx.xxx";

let config = {
  baseURL: process.env.NODE_ENV !== "production" ? DevBaseUrl : ProdBashUrl, // 配置API接口地址
};

let token = getToken();
if (token) {
  config.headers = { Authorization: "Bearer " + token };
}

let request = axios.create(config);

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (window) {
      let token = getToken();
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // if (config.method === 'get') {
    //   config.url = config.url + 'timestamp=' + Date.now().toString()
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
```

大概原理：
通过某个 API（通常是登录 API）获取成功后的 Token，存于本地，然后每次请求的时候在 Header 带上`Authorization: "Bearer " + token`，通常情况下无需担心本地 Token 被破解。

## 目录结构说明

```bash
.
├── Dockerfile
├── LICENSE
├── README.md
├── assets
│   └── uploads
├── build
│   └── dev-server.js
├── dist
│   ├── app.js
│   ├── config.js
│   ├── controllers
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── douban.js
│   │   ├── index.js
│   │   ├── upload.js
│   │   └── user.js
│   ├── lib
│   │   ├── PluginLoader.js
│   │   ├── pagination.js
│   │   └── sequelize.js
│   ├── middleware
│   │   └── ErrorRoutesCatch.js
│   ├── models
│   │   ├── DBBook.js
│   │   ├── User.js
│   │   └── index.js
│   ├── plugins
│   │   └── smtp_sendemail
│   ├── routes
│   │   ├── douban.js
│   │   ├── error-routes.js
│   │   ├── index.js
│   │   ├── main-routes.js
│   │   └── user.js
│   ├── services
│   │   └── douban.js
│   └── tool
│       └── Common.js
├── gulpfile.js
├── logs
│   └── out.log
├── package.json
├── pm2.js
├── publicKey.pub
├── src
│   ├── app.js
│   ├── config.js
│   ├── controllers
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── douban.js
│   │   ├── index.js
│   │   ├── upload.js
│   │   └── user.js
│   ├── lib
│   │   ├── PluginLoader.js
│   │   ├── pagination.js
│   │   └── sequelize.js
│   ├── middleware
│   │   └── ErrorRoutesCatch.js
│   ├── models
│   │   ├── DBBook.js
│   │   ├── User.js
│   │   └── index.js
│   ├── plugins
│   │   └── smtp_sendemail
│   ├── routes
│   │   ├── douban.js
│   │   ├── error-routes.js
│   │   ├── index.js
│   │   ├── main-routes.js
│   │   └── user.js
│   ├── services
│   │   └── douban.js
│   └── tool
│       └── Common.js
├── test
│   └── app.test.js
└── yarn.lock
```

## 集成 NUXT 请求时身份认证说明

```
import Vue from 'vue'
import axios from 'axios'

const DevBaseUrl = 'http://127.0.0.1:3000'
const ProdBashUrl = 'https://api.xxx.com'

let config = {
  baseURL: process.env.NODE_ENV !== 'production' ? DevBaseUrl : ProdBashUrl // 配置API接口地址
}

if (process.env.VUE_ENV !== 'server') {
  let token = getToken() // 此函数自行实现
  if (token) {
    config.headers = {Authorization: 'Bearer ' + token}
  }
}

let request = axios.create(config)

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (window) {
      let token = getToken()
      if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

Vue.prototype.$request = request
```

## 彻底移除 ESlint 方法

删除 package.json 的 devDependencies 中所有 eslint 开头的插件，根目录下的“.eslintignore、.eslintrc.js”文件，并且修改 package.json 的 dev 为：

```bash
'dev': 'gulp start'
```

删除 gulpfile.js 中的 lint、eslint_start 两个任务，并且把 default 改为“gulp.task('default', ['start']”。

## 更新说明

_v0.0.1 2019 年 02 月 18 日 19:01:48_  
1、初始化项目, 实现基本登录/获取信息等接口

