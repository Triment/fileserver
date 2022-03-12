import { Link } from "react-router-dom";
import { Text, Tooltip } from '@geist-ui/core'
import styled from 'styled-components'

const H1 = styled.h2`
    display: inline;
    :hover {
        color: white;
    }
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) .5s;
`

export default function() {
    return (
        <div style={{display:'flex', height:'100%', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ flexDirection: 'column', color: 'white', fontSize: 40 }}>
            <Tooltip text="软件、驱动资源下载"><Link to="files"><H1>文件下载</H1></Link></Tooltip>  &nbsp;|  &nbsp;
                    <Tooltip text="系统异常，安装教程点我"><Link to="blog"><H1>自助问答</H1></Link></Tooltip>
                    <Text h6>技术支持--川渝省区IT支持组</Text>
            </div>
        
        </div>
    )
}