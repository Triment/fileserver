import { Card, Link, Text } from '@geist-ui/core'
import { Search } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
import { Pagination } from '@geist-ui/core'
import { ChevronRightCircleFill, ChevronLeftCircleFill, ChevronLeftCircle } from '@geist-ui/icons'
export default function () {
    const [blogs, setBlogs] = useState([])//列表数据
    const [total, setTotal] = useState(0)//设置总数
    const [limit, setLimit] = useState(5)//设置分页限制
    const [pages, setPages] = useState(0)//设置分页数
    const [searchDesc, setSearch] = useState('')//设置搜索内容
    const apiUrl = process.env.REACT_APP_HOST

    async function query(grasp) {//获取数据
        const result = await fetch(`http://${apiUrl}:4567/blog/all`, {
            method: 'POST',
            body: JSON.stringify({
                limit: limit,
                offset: grasp.offset,
                condition: `%${searchDesc}%` || ""
            })
        })
            .then(res => res.json())
        console.log(result.body.data)
        setTotal(result.body.total)
        setPages(Math.floor(result.body.total / limit) + 1)
        setBlogs(result.body.data)
    }
    useEffect(() => {
        document.title = "自助搜索"
        query({ offset: 0 })
    }, [])
    return (
        <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column", padding: '2em' }}>
                <Link href="/"><ChevronLeftCircle /></Link>
            {/* 搜索框 */}
            <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '320px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '100px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                    }}>
                    <input
                        style={{
                            backgroundColor:'transparent',
                            outline: 'none',
                            fontFamily: 'Product Sans',
                            fontSize: '16px',
                            padding: '4px 0px 4px 14px',
                            border: 'none',
                            zIndex: 8,
                            width: '80%',
                            '::placeholder' : {
                                color: '#a5a5a5'
                            }
                        }}
                        onInput={({ currentTarget }) => { setSearch(currentTarget.value) }}
                        placeholder="输入关键字进行搜索，如：缓存 " />
                    <button
                        onClick={e => { query({ offset: 0 }) }}
                        style={{
                            backgroundColor: 'transparent',
                            outline: 'none',
                            cursor: 'pointer',
                            width: '20%',
                            fontSize: '16px',
                            color: '#000',
                            padding: '8px 10px',
                            border: 'none',
                            borderRadius: '0px',
                            transition: 'background-color 0.2s',
                            ':hover' : {
                            backgroundColor: '#dfdfdf'
                            }
                        }}
                    ><Search/></button>
                </div>
            </div>
            {/* 渲染列表 */}
            {blogs.map((v, i) => {
                return (
                    <Card style={{ margin: '.3em 0' }} key={i} >
                        <Link href={`/blog/${v.id}`}><Text h5>{v.title}</Text></Link>
                        <p style={{ height: '2em', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: v.body }} />
                    </Card>
                )
            })}
            {/* 分页 */}
            <div
                style={{ display: pages > 1 ? 'flex' : 'none', position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <Pagination
                    onChange={(i) => query({ limit: limit, offset: (i - 1) * limit })}
                    count={pages}>
                    <Pagination.Next><ChevronRightCircleFill /></Pagination.Next>
                    <Pagination.Previous><ChevronLeftCircleFill /></Pagination.Previous>
                </Pagination>
            </div>
        </div>
    )
}