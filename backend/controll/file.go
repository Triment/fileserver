package controll

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"github.com/Triment/eject"
)

type File struct {
	Type     string `json:"type"`
	PathName string `json:"name"`
	Children []File `json:"files"`
}

type ResMessage struct {
	Status int         `json:"status"`
	Body   interface{} `json:"body"`
}

const (
	root = "/web/public"
)

func recurse(path string) ([]File, error) { //递归文件夹
	fmt.Println(path)
	var arr []File
	stat, err := os.Stat(path)
	if err != nil {
		return arr, err
	}
	if stat.IsDir() {
		files, err := ioutil.ReadDir(path)
		if err != nil {
			return arr, err
		}
		for _, f := range files {
			if f.IsDir() {
				var file File = File{Type: "directory", PathName: f.Name()}
				children, err := recurse(path + "/" + f.Name())
				if err != nil {
					return arr, err
				}
				file.Children = children
				arr = append(arr, file)
			} else {
				arr = append(arr, File{Type: "file", PathName: f.Name()})
			}
		}
	}
	return arr, nil
}

func GetDir(context *eject.Context) {
	root := "/web/public"
	files, err := recurse(root)
	if err != nil {
		context.JSON(&ResMessage{Status: 500, Body: "文件夹打开失败"})
		return
	}
	context.JSON(&ResMessage{Status: 200, Body: files}) //根文件夹，返回文件夹列表
}

func GetFile(context *eject.Context) {
	fileSystem := os.DirFS(root)
	if len(context.Params["path"]) > 0 && fs.ValidPath(path.Join(path.Base(root), context.Params["path"])) {
		reqPath := path.Join(root, context.Params["path"])
		stat, err := os.Stat(reqPath)
		fmt.Println(reqPath)
		if err != nil {
			context.JSON(&ResMessage{Status: 404, Body: "文件信息读取失败"}) //文件读取信息失败
			return
		}
		if stat.IsDir() {
			files, err := recurse(reqPath)
			if err != nil {
				context.JSON(&ResMessage{Status: 500, Body: "文件夹打开失败"}) //文件夹打开失败
				return
			}
			context.JSON(&ResMessage{Status: 200, Body: files}) //打开文件夹，返回文件夹列表
		} else {
			file, err := fs.ReadFile(fileSystem, context.Params["path"])
			paths := strings.Split(context.Params["path"], "/")
			fileName := paths[len(paths)-1]
			fmt.Println(fileName)
			if err == nil {
				context.Res.Header().Set("Content-Type", "application/octet-stream")
				context.Res.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
				context.Res.Write(file) //下载文件
			} else {
				context.JSON(&ResMessage{Status: 500, Body: "文件加载失败"}) //文件加载失败
			}
		}
	}
}
