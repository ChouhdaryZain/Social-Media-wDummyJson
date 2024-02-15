import React, { useEffect, useState } from 'react'
import { useReducer } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid'; // To generate unique ID evert time with create post

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
  } 
  else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  else if (action.type === "ADD_POST") {
    newPostList = [action.payload.post, ...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({ children }) => {

  const [postList, dispatchPostList] = useReducer(postListReducer, [])

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        post,
      },
    })
  }
  const addInitialPost = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    })
  }
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    })
  }

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then(data => {
        addInitialPost(data.posts);
        setFetching(false);
      });

    return () => {
      controller.abort();
    }
  }, []);


  return (
    <PostList.Provider value={{ postList: postList, fetching: fetching, addPost: addPost, deletePost: deletePost }}>
      {children}
    </PostList.Provider>
  )
}

export default PostListProvider