import { Badge, Button, Input, useToasts } from "@geist-ui/core";
import { createRef, useState } from "react";
import Editor from "./components/Editor/Editor";

export default function () {
    const apiUrl = process.env.REACT_APP_HOST
    const fileRef = createRef()//输入框ref
    const [file, setFile] = useState('')
    const bodyRef = createRef()//文章ref
    const [fileList, setFileList] = useState([])
    const [_, setToast] = useToasts()
    const [editorRange, setRange] = useState()
    let clickTimer = null //定时器
    const buttonClick = e => {
        //insert('io')
        // for (let i of bodyRef.current){
        //     console.log(i)
        // }
        //bodyRef.current.click()
        document.execCommand()
        const event = new InputEvent('input', {
            view: window,
            bubbles: true,
            cancelable: true
        })
        console.log(bodyRef.current.dispatchEvent(event))
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
        clearTimeout(clickTimer)
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
    const insert = (str)=>{
        clickTimer = setTimeout(() => {
            const newRange = editorRange.cloneRange()//克隆range
            // newRange.setStart(editorRange.startContainer, editorRange.startOffset)
            // newRange.setEnd(editorRange.startContainer, editorRange.endOffset+str.length-1)
            getSelection().removeAllRanges()
            getSelection().addRange(newRange)
            newRange.deleteContents()//删除内容
            newRange.insertNode(document.createTextNode(str))
        }, 300);
    }
    const editorOnchange = e => {
        //e.target.innerText
        console.log(e)
    }
    // const editorCallBack = obj => {
    //     obj.
    // }
    const editorOnMouseUpCapture = e => {
        setRange(getSelection().getRangeAt(0))
    }
    return (
        <div style={{ display: 'flex',position: 'absolute', top:0,right:0, bottom:0, left:0, flexDirection: 'column', justifyContent: 'center', margin: '2em 5rem' }}>
            <Input />
            <Editor getchange={editorOnchange}  onMouseUpCapture={editorOnMouseUpCapture}  ref={bodyRef} />
            { fileList.map(i=>(<Badge key={i} onKeyPress={e=>console.log(e)} onDoubleClick={e=>deleteFile(i)} onClick={e=>{e.persist();insert(i)} } children={i}/>))}   
            <Input htmlType="file" onChange={upload} ref={fileRef} />     
            <Button type="success" onClick={buttonClick} style={{ maxWidth: '2rem'}}  ghost> 提交</Button>
        </div>
    )
}