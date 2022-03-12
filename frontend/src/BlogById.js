import React, { useEffect, useState } from "react"
import { Link, Page, Text, Button } from '@geist-ui/core'
import { ChevronLeftCircle  } from '@geist-ui/icons'
import { useParams } from "react-router-dom"
import Editor from "./components/Editor/Editor"
export default () => {
    let params = useParams();
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
        <Link href="/blog"><ChevronLeftCircle /></Link>
        <Text h1>{title}</Text>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {/* <Editor/> */}
        <Button icon={<p>👍</p>} scale={1/3} type="secondary" onClick={increaseStar} auto>{star} 赞</Button>
    </Page>
}