import React from 'react'
import styles from './Post.module.css'
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { PostList } from '../store/post-list-store';


const Post = ({ post }) => {
  const { addPost, deletePost } = useContext(PostList);
  return (
    <div className={`card ${styles['post-card']}`} style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <MdDelete onClick={() => { deletePost(post.id) }} />
            {/* <span className="visually-hidden">unread messages</span> */}
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map(tag => <span key={tag} className={`badge text-bg-primary ${styles['hashtags']}`}>{tag}</span>)} <br />
        <button type="button" className="btn btn-primary position-relative">
          Reactions
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {post.reactions}
            {/* <span class="visually-hidden">unread messages</span> */}
          </span>
        </button>
      </div>
    </div>
  )
}
export default Post;