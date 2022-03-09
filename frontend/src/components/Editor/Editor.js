import { Textarea } from '@geist-ui/core'
import { forwardRef, useState } from "react";
import Tabs from "./tabs";

export default forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [source, setSource] = useState('')
    const processChange = e => {
        //console.log(e)
        setSource(e.target.innerText)
        props.getchange(e)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column',width: "100%", height: "100%", position: 'relative', border: '1px solid #eaeaea', gap: '10px'}}>
            {/* <div style={{ zIndex: 100, cursor: 'pointer', height: '10px', width: '10px', position: 'absolute', right: '20px', top: 0 }} ><Display onClick={e=>setShow(!show)} /></div> */}
            <Tabs />
            <div onInput={processChange} onSelect={processChange} {...props} ref={ref} contentEditable={true} style={{ flex: 8,overflow: 'auto', display: 'block', padding: '1em', height: '200px' }}></div>
            {/* <div style={{ position:'absolute',top: 0,left:0, height: '100%', overflow: 'auto', width: '100%', zIndex: show ? 99: -1}} dangerouslySetInnerHTML={{__html: markToHtml(source)}}></div> */}
        </div>
    )
})