package main

import (
	"fmt"
	"ymdd/controll"

	"github.com/Triment/eject"
)

func main() {
	router := eject.CreateRouter()
	router.GET("/file", controll.GetDir)
	router.POST("/file", controll.UploadFile)
	router.POST("/file/delete", controll.DeleteFile)
	router.GET("/file/*path", controll.GetFile)
	router.POST("/blog/create", controll.PostBlog)
	for k, _ := range router.Handler {
		fmt.Println(k)
	}
	app := eject.CreateApp()
	app.Inject(controll.CrosMiddle)
	app.Inject(router.Accept())
	app.Listen(":4567")
}
