import React, { useRef, useContext } from 'react'
import styles from './CreatePost.module.css'
import { PostList } from '../store/post-list-store'
import { redirect, useNavigate, Form } from 'react-router-dom'

function CreatePost() {
  // const { addPost } = useContext(PostList)
  const navigate = useNavigate();

  return (
    <Form method="post" className={`${styles['create-post']}`}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">Enter Your User ID here</label>
        <input name='userId'
          type="text" className="form-control" id="userId" placeholder='Enter your userId' />
      </div>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">Post Title</label>
        <input name='title'
          type="text" className="form-control" id="postTitle" placeholder='Add post title here' />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">Post Content</label>
        <textarea name='body'
          rows={4} type="text" className="form-control" id="body" placeholder='Add post content here' />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">Number of reactions</label>
        <input name='reactions'
          type="text" className="form-control" id="reactions" placeholder='How many people reacted to this post' />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input name='tags'
          type="text" className="form-control" id="tags" placeholder='Enter your tags here using space' />
      </div>

      <button type="submit" className="btn btn-primary">Post</button>
    </Form>
  )
};

export async function createPostAction(data) {

  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.tags = postData.tags.split(" ");
  console.log(postData);

  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })
    .then(res => res.json())
    .then(post => {
      console.log(post);
    });
  return redirect("/");
}

export default CreatePost