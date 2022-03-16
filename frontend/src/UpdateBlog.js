import React, { useEffect, useState, createRef, useRef } from "react"
import { Input, Button, ButtonDropdown,Tree } from '@geist-ui/core'
import { ChevronLeftCircle } from '@geist-ui/icons'
import { useParams, useNavigate } from "react-router-dom"
import Editor from "./components/Editor/Editor"
export default () => {
    let params = useParams();
    const navigate = useNavigate()
    
    const apiUrl = process.env.REACT_APP_HOST
    
    const fileRef = createRef()//输入框ref
    const bodyRef = useRef()
    const filePathRef = useRef()
    const titleRef = useRef()

    const [[title, setTitle], [content, setContent]] = [useState(''), useState('')]
    const [fileList, setFileList] = useState([])
    const [file, setFile] = useState('')
    const [files, setFiles] = useState('')

    const getData = async () => {
        const result = await fetch(`http://${apiUrl}:4567/blog/${params.id}`).then(res => res.json())
        setTitle(result.title)
        titleRef.current.value = result.title
        bodyRef.current.innerHTML = result.body
        document.title = result.title
        setContent(result.body)
    }
    useEffect(() => {
        getData()
    }, [])

    const treeClick = path => {
        console.log(filePathRef.current)
        filePathRef.current.value = path+'/'
        filePathRef.current.focus()
    }

    const upload = e => {
        const formData = new FormData()
        console.log(fileRef.current.files[0])
        filePathRef.current.value+=fileRef.current.files[0].name
        formData.append('uploadFile', fileRef.current.files[0])
        formData.append('uploadPath', filePathRef.current.value)
        fetch(`http://${apiUrl}:4567/file`, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            setFile(data.body)
            setFileList([data.body, ...fileList])
        })
    }
    const deleteFile = e => {
        fetch(`http://${apiUrl}:4567/file/delete`, {
            method: 'POST',
            body: JSON.stringify({ path : e })
        }).then(res=>res.json()).then(data=>{
            const fil = (v)=>{
                return v!==e
            }
            setFileList(fileList.filter(fil))
            alert(`${data.body}已删除`)
        })
    }

    const buttonClick = e => {
        (title.length!=0 && bodyRef.current.innerHTML.length!=0)&&
        fetch(`http://${apiUrl}:4567/blog/${params.id}/update`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                title: title,
                body: bodyRef.current.innerHTML
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
        })
    }
    return <div style={{ display: 'flex', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, lineHeight: 1.5, justifyContent: 'space-between', flexDirection: 'column', margin: '2em 5rem' }}>
        <Input ref={titleRef} onInput={e => setTitle(e.currentTarget.value)} />
        <Editor ref={bodyRef} />
        {fileList.map(i => (<ButtonDropdown scale={1 / 3} key={i} children={i}>
            <ButtonDropdown.Item >图片插入</ButtonDropdown.Item>
            <ButtonDropdown.Item>视频插入</ButtonDropdown.Item>
            <ButtonDropdown.Item>文件插入</ButtonDropdown.Item>
            <ButtonDropdown.Item onClick={e => deleteFile(i)} main>删除{i}</ButtonDropdown.Item>
        </ButtonDropdown>))}
        <Tree onClick={treeClick} value={files} />
        <Input ref={filePathRef} />
        <Input htmlType="file" onChange={upload} ref={fileRef} />
        <Button type="success" onClick={buttonClick} style={{ maxWidth: '2rem', minHeight: '2rem' }} ghost> 提交</Button>
    </div>
}