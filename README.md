# umi + qiankun 搭建微前端架构

用umi框架实现qiankun相对简单一点，只需配置.umirc.ts一个文件  

## 1、最简实现umi + qiankun  

主要参考[umi官网](https://umijs.org/zh-CN/docs/getting-started)创建项目  
参考[plugin-qiankun插件](https://umijs.org/zh-CN/plugins/plugin-qiankun#%E4%B8%BB%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE)配置    

### 基座配置

* mkdir main-app && cd main-app  
* yarn create @umijs/umi-app
* yarn add @umijs/plugin-qiankun -D
* .umirc.ts注册qiankun，配置路由  

### 子应用配置

* mkdir sub-app-1 && cd sub-app-1  
* yarn create @umijs/umi-app
* yarn add @umijs/plugin-qiankun -D
* .umirc.ts注册qiankun  
* package.json增加应用名字  

### 测试

* yarn start方式先起基座再起子应用  
* localhost:8000可以访问基座
* localhost:8000/sub-app-1可以访问子应用  

## 2、基座登陆功能

* npm install --save ahooks（等同于yarn add ahook） 
* yarn add qs    
* pages下增加login页面
* services下增加user接口
* utils下增加token操作  
* models下增加umi统一model管理  
* src下新增app.ts，请求头加token，处理402跳登陆  

注意，这块内容后台只起user一个服务即可，其中current_user和menu由于网关需要加入user_id需要走网关才能测试  
