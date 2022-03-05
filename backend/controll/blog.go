package controll

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"path"

	"github.com/Triment/eject"
	_ "github.com/mattn/go-sqlite3"
)

type Blog struct {
	Title string
	Body  string
}

func PostBlog(c *eject.Context) {
	currentPath, err := os.Getwd()
	if err != nil {
		panic("path err")
	}
	fmt.Println(path.Join(currentPath, "./blog.db"))
	db, err := sql.Open("sqlite3", path.Join(currentPath, "./blog.db"))
	if err != nil {
		panic(err)
	}
	if db == nil {
		panic("db nil")
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(path.Dir("."))
	var blog Blog
	err = json.NewDecoder(c.Req.Body).Decode(&blog)
	if err != nil {
		c.JSON(&ResMessage{Status: 500, Body: "解析异常"})
		return
	}
	fmt.Println(blog)
	stmt, err := db.Prepare("INSERT INTO blog(title, content) values(?,?)")
	if err != nil {
		panic("stmt nil")
	}
	defer stmt.Close()
	_, err = stmt.Exec(blog.Title, blog.Body)
	if err != nil {
		panic("stmt err")
	}
	fmt.Fprintf(c.Res, "%+v", blog)
}
