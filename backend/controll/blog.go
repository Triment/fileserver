package controll

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path"
	"strconv"

	"github.com/Triment/eject"
	_ "github.com/mattn/go-sqlite3"
)

type Blog struct {
	Id         int    `json:"id"`
	Title      string `json:"title"`
	Body       string `json:"body"`
	CreateTime string `json:"create_time"`
	UpdateTime string `json:"update_time"`
	Star       int    `json:"star"`
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
		panic(err)
	}
	c.JSON(&blog)
}

type Query struct {
	Limit     int    `json:"limit"`
	Offset    int    `json:"offset"`
	Condition string `json:"condition"`
}
type Blogs struct {
	Total int         `json:"total"`
	Data  interface{} `json:"data"`
}

//查询与搜索
func GetAll(c *eject.Context) {
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
	var query Query
	err = json.NewDecoder(c.Req.Body).Decode(&query)
	if err != nil {
		c.JSON(&ResMessage{Status: 500, Body: "解析异常"})
		return
	}
	rows, err := db.Query("select * from blog where (content like ? or title like ?) order by star desc limit ? offset ?", query.Condition, query.Condition, query.Limit, query.Offset)
	if err != nil {
		panic("query nil")
	}
	defer rows.Close()
	var sum int
	res, err := db.Query("select count(*) from blog")
	res.Next()
	res.Scan(&sum)
	queryData := make([]*Blog, 0)
	var (
		id         int
		title      string
		body       string
		createTime string
		updateTime string
		star       int
	)
	for rows.Next() {
		if err := rows.Scan(&id, &title, &body, &createTime, &updateTime, &star); err != nil {
			log.Fatal(err)
		} else {
			queryData = append(queryData, &Blog{Id: id, Title: title, Body: body, CreateTime: createTime, UpdateTime: updateTime, Star: star})
		}
	}
	c.JSON(&ResMessage{
		Status: 200,
		Body: &Blogs{
			Total: sum,
			Data:  queryData,
		},
		//Body: queryData,
	})
}

//查询详情
func GetBlogById(c *eject.Context) {
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
	id, err := strconv.Atoi(c.Params["id"])
	if err != nil {
		c.JSON(&ResMessage{Status: 403, Body: "参数错误"})
		return
	}
	row, err := db.Query("select * from blog where id=?", id)
	if err != nil {
		panic("row nil")
	}
	defer row.Close()
	row.Next()
	var blog Blog
	row.Scan(&blog.Id, &blog.Title, &blog.Body, &blog.Star, &blog.CreateTime, &blog.UpdateTime)
	c.JSON(&blog)
}

//点赞接口
func StarBlogById(c *eject.Context) {
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
	id, err := strconv.Atoi(c.Params["id"])
	if err != nil {
		c.JSON(&ResMessage{Status: 403, Body: "参数错误"})
		return
	}
	row, err := db.Query("select star from blog where id=?", id)
	if err != nil {
		panic("row nil")
	}
	defer row.Close()
	row.Next()
	var star int
	row.Scan(&star)
	fmt.Println(id)
	res, err := db.Exec("update blog set star=? where id=?", star+1, id)
	if err != nil {
		panic("row nil")
	}
	res.RowsAffected()
	var blog Blog
	row, err = db.Query("select * from blog where id=?", id)
	row.Next()
	row.Scan(&blog.Id, &blog.Title, &blog.Body, &blog.Star, &blog.CreateTime, &blog.UpdateTime)
	c.JSON(&blog)
}
