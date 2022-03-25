import React, { useEffect, useState } from "react"
import { Link, Page, Text, Button } from '@geist-ui/core'
import { ChevronLeftCircle  } from '@geist-ui/icons'
import { useParams, useNavigate } from "react-router-dom"
import Editor from "./components/Editor/Editor"
import styled from "styled-components"
const Content = styled.p`
    img {
        display: block;
        clear: both;
        margin: auto;
    }
`
export default () => {
    let params = useParams();
    const navigate = useNavigate()
    const [[title, setTitle], [content, setContent], [star, setStar]] = [useState(''), useState(''), useState(0)]
    const apiUrl = process.env.REACT_APP_HOST
    const getData = async () => {
        const result = await fetch(`http://${apiUrl}:4567/blog/${params.id}`).then(res => res.json())
        setTitle(result.title)
        document.title = result.title
        setContent(result.body)
        setStar(result.star)
    }
    useEffect(() => {
        getData()
    }, [])
    function increaseStar(e){
        fetch(`http://${apiUrl}:4567/blog/${params.id}/star`, {
            method: 'POST',
            body: JSON.stringify({
                
            })
        }).then(res=>{
            if (res.status == 200){
                setStar(star+1)
            }
        })
    }
    return <Page>
        <ChevronLeftCircle onClick={e=>navigate(-1)} />
        <Text h1>{title}</Text>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
        {/* <Editor/> */}
        <Button icon={<p>👍</p>} scale={1/3} type="secondary" onClick={increaseStar} auto>{star} 赞</Button>
    </Page>
}