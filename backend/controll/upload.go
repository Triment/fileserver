package controll

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"github.com/Triment/eject"
)

//创建文件夹，如果不存在
func recursionCreateDir(p string) {
	paths := strings.Split(p, "/")
	p = "/"
	for _, v := range paths {
		p = path.Join(p, v)
		_, err := os.Stat(p)
		if err != nil {
			os.MkdirAll(p, os.ModePerm)
		}
	}
}

func UploadFile(c *eject.Context) {
	c.Req.ParseMultipartForm(32 << 20)
	file, _, err := c.Req.FormFile("uploadFile")
	if err != nil {
		c.JSON(&ResMessage{Status: 500, Body: "上传错误"})
		return
	}
	defer file.Close()
	b, err := ioutil.ReadAll(file)
	if err != nil {
		c.JSON(&ResMessage{Status: 500, Body: "上传错误"})
		return
	}
	currentPath, err := os.Getwd()

	recursionCreateDir(path.Join(currentPath, "public", strings.Join(strings.Split(c.Req.FormValue("uploadPath"), "/")[:1], "/")))
	if err != nil {
		panic(err)
	}
	p := path.Join(currentPath, "./public/", c.Req.FormValue("uploadPath"))
	ioutil.WriteFile(p, b, 0777)
	c.JSON(&ResMessage{Status: 200, Body: c.Req.FormValue("uploadPath")})
}

type DeleteDst struct {
	Path string `json:"path"`
}

func DeleteFile(c *eject.Context) {
	currentPath, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	c.Req.ParseForm()
	var dst DeleteDst
	err = json.NewDecoder(c.Req.Body).Decode(&dst)
	if err != nil {
		panic(err)
	}
	err = os.Remove(path.Join(currentPath, "./public/", dst.Path))
	if err != nil {
		c.JSON(&ResMessage{Status: 500, Body: "删除失败: " + dst.Path})
	} else {
		c.JSON(&ResMessage{Status: 200, Body: "删除成功: " + dst.Path})
	}
}
