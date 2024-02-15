import React from 'react'
import Post from './Post'
import { useContext } from 'react'
import { PostList as PostListData } from '../store/post-list-store'
import LoadingSpinner from './LoadingSpinner.jsx'
import WelcomeMessage from './WelcomeMessage.jsx'


const PostList = () => {
  const { postList, fetching } = useContext(PostListData);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {
        !fetching && postList.length === 0 && <WelcomeMessage />
      }
      {
        postList.map((post) => <Post key={post.id} post={post} />)
      }
    </>
  )
}

export default PostList