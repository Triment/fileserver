import { useEffect, useState } from "react";
import { Tree } from '@geist-ui/core'
function App() {
  const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HOST : "localhost"
  const [files, setFiles] = useState([])
  useEffect(()=>{
    fetch(`http://${apiUrl}:4567/file/public`).then(res=>res.json()).then(data=>{
      if (data.status === 200){
        setFiles(data.body)
      }
    })
  },[])
  function click(path){//下载
    fetch(`http://${apiUrl}:4567/file/public/${path}`).then(res=>res.blob()).then(blob=>{
      let paths = path.split('/')
      var filename =  paths[paths.length-1]
      var a = document.createElement('a');//control+C+V大法好🐮🍺
      document.body.appendChild(a) //兼容火狐，将a标签添加到body当中
      var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      a.href = url;
      a.download = filename;
      a.target='_blank'  // a标签增加target属性
      a.click();
      a.remove()  //移除a标签
      window.URL.revokeObjectURL(url);
    })
  }
 return (
   <Tree onClick={click} value={files}/>
 );
}

export default App;
