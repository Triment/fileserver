import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from './Main';
import Blog from './Blog'
import reportWebVitals from './reportWebVitals';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from './CreateBlog';
ReactDOM.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="files" element={<App />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/new" element={ <CreateBlog/> }/>
        </Routes>
      </BrowserRouter>
    </GeistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
