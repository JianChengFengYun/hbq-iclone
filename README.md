![my love](./logo.png)

> 轻量级项目脚手架  

## 安装   
> npm i -g iclone-cli   
---

## 命令   

### iclone init
> 根据提示创建一个新项目      

### iclone add    
> 添加一条模板配置       

### iclone delete    
> 删除一条模板配置   

### iclone list   
> 查看当前模板配置   

### 查看帮助  
>   iclone || iclone --help  

----

## 更新纪录  
- git clone 命令增加 --depth=1 参数,减少请求不必要的版本历史
- 考虑到 gitmodule 子模块 ，git clone 增加 --recursive 参数 
- git init 创建项目的时候 连同git init ,git add . git commit -am  ,yarn install 一并做了
- 现在配置文件会保存在 用户目录下的 .iclonerc 文件里了，更新iclone-cli不会丢失模板配置


 