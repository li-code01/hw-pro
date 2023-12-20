# 指定基础镜像  
FROM node:latest as builder
  
# 将本地文件复制到镜像中  
WORKDIR /usr/src/app  
COPY . .
# 安装依赖项  
#RUN npm install  

EXPOSE 1216
  
# 设置默认命令  
CMD [ "npm", "start" ]
