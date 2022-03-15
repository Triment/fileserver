package main

import (
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
	router.POST("/blog/:id/update", controll.ModifyBlog)
	router.POST("/blog/all", controll.GetAll)
	router.GET("/blog/:id", controll.GetBlogById)
	router.POST("/blog/:id/star", controll.StarBlogById)
	// for k, _ := range router.Handler {
	// 	fmt.Println(k)
	// }
	app := eject.CreateApp()
	app.Inject(controll.CrosMiddle)
	app.Inject(router.Accept())
	app.Listen(":4567")
}
