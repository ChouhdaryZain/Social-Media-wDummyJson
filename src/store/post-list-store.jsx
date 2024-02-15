import React from 'react'
import { useReducer } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid'; // To generate unique ID evert time with create post

export const PostList = createContext({
  postList: [],
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
  }else if(action.type === "ADD_POST"){
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({ children }) => {
  const DEFAULT_POST_LIST = [
    {
      id: '1',
      title: 'Going to Gilgit',
      body: "I'm going to Gilgit to have a lot of fun. Peace out",
      reactions: 2,
      tags: ['Gilgit', 'Travel', 'Fun'],
      userId: 'user-9',
    },
    {
      id: '2',
      title: 'Going to Neelum',
      body: "I'm going to Neelum baby to have a lot of fun. Peace out my love",
      reactions: 15,
      tags: ['Neelum', 'Travel', 'Fun', 'Love'],
      userId: 'user-12',
    },
  ]
  const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST)

  const addPost = (userId, postTitle, body, reactions, tags) => {
    console.log(`userId is ${userId}, PostTitle is ${postTitle}, PostBody is ${body}, PostReactions are ${reactions}, Post tags are ${tags}`);
    const uniqueId = uuidv4()
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: uniqueId,
        title: postTitle,
        body: body,
        reactions: reactions,
        tags: tags,
        userId: userId,
      },
    })
  }
  const deletePost = (postId) => {
    // console.log(`The post of ID ${postId} is accessed`);
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    })
  }


  return (
    <PostList.Provider value={{ postList: postList, addPost: addPost, deletePost: deletePost }}>
      {children}
    </PostList.Provider>
  )
}

export default PostListProvider