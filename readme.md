### 部署方法

将frontend的host改为自己的服务器ip或者域名

文件放入根目录下的public就行

先本地编译前端和后端`./build.sh`，然后使用`docker-compose up -d`

由于docker镜像的原因，建议单独编译后端，并且不使用CGO
```bash
cd backend
CGO_ENDBLED=0 go build main.go
```