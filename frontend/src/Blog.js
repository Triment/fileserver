import {Input} from '@geist-ui/core'
import { Search } from '@geist-ui/icons'
import BlogItem from './components/BlogItem'
import Pagination from './components/Pagination'
export default function(){
    return (
       <div style={ { margin: "1rem", display: "flex", flexDirection: "column" } }>
       <Input iconRight={<Search />} placeholder="搜索你的问题" />
       <BlogItem title="hello" subTitle="world" footer={<h1>huhuh</h1>}/>
       <Pagination/>
       </div> 
    )
}