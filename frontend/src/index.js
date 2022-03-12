import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from './Main';
import Blogs from './Blogs'
import reportWebVitals from './reportWebVitals';
import { GeistProvider, CssBaseline, Text, Divider } from '@geist-ui/core'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from './CreateBlog';
import BlogById from './BlogById';

const Arap = ()=>{
  const [themeType, setThemeType] = useState('dark')
  return <GeistProvider themeType={themeType}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="files" element={<App />} />
              <Route path="blog" element={<Blogs />} />
              <Route path="blog/:id" element={<BlogById />} />
              <Route path="blog/new" element={<CreateBlog />} />
            </Routes>
          </BrowserRouter>
        </GeistProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <Arap/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
