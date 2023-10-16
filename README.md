<div align="center">

# satori-server

基于 [Koishi](https://koishi.chat) 和 [@koishijs/plugin-server](https://koishi.chat/zh-CN/plugins/develop/server.html) 的 Satori 协议服务器

通过 Koishi 对接各个聊天平台，并对外暴露 Satori 协议服务

</div>

## 使用

satori-server 本身并不包含适配器，需要自行添加。

克隆此仓库并修改 `config.json`，在 `plugins` 中填入想要装载的适配器包名和配置。适配器列表可在 [Koishi 文档](https://koishi.chat/zh-CN/plugins/)找到。例如：

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 5500
  },
  "plugins": {
    "@koishijs/plugin-adapter-telegram": {
      "protocol": "polling",
      "token": "asdassdasdasdasdadasdad"
    }
  }
}
```

随后即可运行服务

### 直接运行

需要安装 Node.js

```shell
npm install
npm run install-plugins
npm run build
npm run start
```

### Docker

```shell
docker build -t satori-server .
docker run -d -p 5500:5500 satori-server
```

## 开源

[MIT License](./LICENSE)
