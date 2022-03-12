import { Card, Link, Text, Rating } from '@geist-ui/core'
import { Search } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
import { Pagination } from '@geist-ui/core'
import styled from 'styled-components'
import { ChevronRightCircleFill, ChevronLeftCircleFill, ChevronLeftCircle } from '@geist-ui/icons'
import { useNavigate } from 'react-router-dom'
//搜索框容器
const SearchWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 320px;
    overflow: hidden;
    background-color: #FFFFFF;
    border-radius: 100px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    :hover {
        width: 360px;
    }
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) .5s;
`
//input
const SearchInput = styled.input`
    background-color: transparent;
    outline: none;
    font-family: Product Sans;
    font-size: 16px;
    padding: 4px 0px 4px 14px;
    border: none;
    z-index: 8;
    width: 90%;
    ::placeholder {
        color: #a5a5a5;
    }
`
const SearchButton = styled.button`
    background-color: transparent;
    outline: none;
    cursor: pointer;
    width: 20%;
    font-size: 16px;
    color: #000;
    padding: 8px 10px;
    border: none;
    border-radius: 0px;
    transition: background-color 0.2s;
    :hover {
        background-color: #fbc2eb;
    }
`
export default function () {
    const [blogs, setBlogs] = useState([])//列表数据
    const [total, setTotal] = useState(0)//设置总数
    const [limit, setLimit] = useState(5)//设置分页限制
    const [pages, setPages] = useState(0)//设置分页数
    const [searchDesc, setSearch] = useState('')//设置搜索内容
    const apiUrl = process.env.REACT_APP_HOST
    const navigate = useNavigate()

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
        if (result.body.total%limit !=0){
            setPages(Math.floor(result.body.total / limit) + 1)
        } else {
            setPages(result.body.total / limit)
        }
        setBlogs(result.body.data)
    }
    useEffect(() => {
        document.title = "自助搜索"
        query({ offset: 0 })
    }, [])


    return (
        <div
            style={{ margin: "3rem 3rem 0 3rem", display: "flex", flexDirection: "column" }}>
            {/* 返回上一级 */}
            <ChevronLeftCircle onClick={e=>navigate(-1)} />
            {/* 搜索框 */}
            <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2rem' }}>
                <SearchWrap>
                    <SearchInput
                        onInput={({ currentTarget }) => {
                            setSearch(currentTarget.value)
                            query({ offset: 0 })
                        }}
                        placeholder="输入关键字进行搜索，如：缓存 " />
                    <SearchButton
                        onClick={e => { query({ offset: 0 }) }}
                    ><Search /></SearchButton>
                </SearchWrap>
            </div>
            {/* 渲染列表 */}
            {blogs.map((v, i) => {
                return (
                    <Card hoverable style={{ margin: '.3em 0' }} key={i} >
                        <Link href={`/blog/${v.id}`}><Text h5>{v.title}</Text></Link>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ maxHeight: '2em', overflow: 'hidden', flex: 8 }} dangerouslySetInnerHTML={{ __html: v.body }} />
                            <div style={{ flex: 2, marginLeft: '.8em' }}>
                                <Rating count={5} value={v.star} type="warning" style={{ pointerEvents: 'none', opacity: v.star === 0 && 0 }} />
                            </div>
                        </div>
                    </Card>
                )
            })}
            {/* 分页 */}
            <div
                style={{ display: pages > 1 ? 'flex' : 'none', position: 'relative', bottom: 0, flexDirection: 'row', justifyContent: 'center' }}>
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