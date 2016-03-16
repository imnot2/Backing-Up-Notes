#说明文档

##目录文档结构说明
src    --- 源码
build  --- 开发调试
dist   --- 发布线上

src
 - js
  --lib    依赖库
  -- module 模块组件
  -- page   页面脚本

 - scss
  -- lib    页面常用模块
  -- page   页面及样式

 - image   图片
 - font    字体 

注：静态环境iis部署指向build目录下






##watch  监听文件
>grunt watch

开发时候开启文件监听


##build  合并编译
> grunt build

1.src源码目录js文件拷贝至build->js目录
2.src源码目录将lib内合并框架至build环境，page页面及文件拷贝至build->css目录
3.拷贝font文件及image文件到build目录


##dist  压缩 [未完成]
> grunt dist