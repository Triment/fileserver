import { Badge, Button, ButtonDropdown, Input, useToasts } from "@geist-ui/core";
import { createRef, useState } from "react";
import Editor from "./components/Editor/Editor";

export default function () {
    const apiUrl = process.env.REACT_APP_HOST
    const fileRef = createRef()//输入框ref
    const [file, setFile] = useState('')
    const bodyRef = createRef()//文章ref
    const [fileList, setFileList] = useState([])
    const [title, setTitle] = useState('')
    const [contentHtml, setContent] = useState('')
    const buttonClick = e => {
        // const event = new InputEvent('input', {
        //     view: window,
        //     bubbles: true,
        //     cancelable: true
        // })
        // console.log(bodyRef.current.dispatchEvent(event))
        (title.length!=0 && bodyRef.current.innerHTML.length!=0)&&
        fetch(`http://${apiUrl}:4567/blog/create`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: bodyRef.current.innerHTML
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
        })
    }
    const upload = e => {
        const formData = new FormData()
        formData.append('uploadFile', fileRef.current.files[0])
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
    return (
        <div style={{ display: 'flex',position: 'absolute', top:0,right:0, bottom:0, left:0,lineHeight: 1.5,justifyContent: 'space-between',flexDirection: 'column', margin: '2em 5rem' }}>
            <Input onInput={e=>setTitle(e.currentTarget.value)} />
            <Editor ref={bodyRef} />
            { fileList.map(i=>(<ButtonDropdown scale={1/3} key={i} children={i}>
                <ButtonDropdown.Item >图片插入</ButtonDropdown.Item>
                <ButtonDropdown.Item>视频插入</ButtonDropdown.Item>
                <ButtonDropdown.Item>文件插入</ButtonDropdown.Item>
                <ButtonDropdown.Item onClick={e=>deleteFile(i)} main>删除{i}</ButtonDropdown.Item>
                </ButtonDropdown>))}   
            <Input htmlType="file" onChange={upload} ref={fileRef} />     
            <Button type="success" onClick={buttonClick} style={{ maxWidth: '2rem'}}  ghost> 提交</Button>
        </div>
    )
}