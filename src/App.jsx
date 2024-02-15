import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import PostListProvider from './store/post-list-store';

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
    <div className='app-container'>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <div className='content'>
        <Header />
        {selectedTab === "Home" ? <PostList /> : <CreatePost />}
        <Footer />
      </div>
    </div>
    </PostListProvider>
  )
}

export default App
