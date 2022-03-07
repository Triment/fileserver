package controll

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"

	"github.com/Triment/eject"
)

func UploadFile(c *eject.Context) {
	c.Req.ParseMultipartForm(32 << 20)
	file, handler, err := c.Req.FormFile("uploadFile")
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
	if err != nil {
		panic(err)
	}
	ioutil.WriteFile(path.Join(currentPath, "./public/", handler.Filename), b, 0777)
	c.JSON(&ResMessage{Status: 200, Body: handler.Filename})
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
