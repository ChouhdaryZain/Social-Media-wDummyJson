import React, { useRef, useContext } from 'react'
import styles from './CreatePost.module.css'
import { PostList } from '../store/post-list-store'

function CreatePost() {
  const { addPost } = useContext(PostList)

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const bodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const body = bodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    bodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postTitle,
        body: body,
        reactions: reactions,
        tags: tags,
        userId: userId,
      })
    })
      .then(res => res.json())
      .then(post => addPost(post));
  }

  return (
    <form className={`${styles['create-post']}`} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">Enter Your User ID here</label>
        <input ref={userIdElement}
          type="text" className="form-control" id="userId" placeholder='Enter your userId' />
      </div>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">Post Title</label>
        <input ref={postTitleElement}
          type="text" className="form-control" id="postTitle" placeholder='Add post title here' />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">Post Content</label>
        <textarea ref={bodyElement}
          rows={4} type="text" className="form-control" id="body" placeholder='Add post content here' />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">Number of reactions</label>
        <input ref={reactionsElement}
          type="text" className="form-control" id="reactions" placeholder='How many people reacted to this post' />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input ref={tagsElement}
          type="text" className="form-control" id="tags" placeholder='Enter your tags here using space' />
      </div>

      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  )
}

export default CreatePost