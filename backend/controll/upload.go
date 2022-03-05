package controll

import (
	"io/ioutil"
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
	ioutil.WriteFile(path.Join("/web/public", handler.Filename), b, 0777)
	c.JSON(&ResMessage{Status: 200, Body: handler.Filename})
}
