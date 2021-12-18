import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { PostForm } from './PostForm';

export const EditPostForm = ({match}) => {
  const { postId } = match.params;
  const post = useSelector(state => selectPostById(state, postId));
  const users = useSelector(selectAllUsers);

  const [content, setContent] = useState(post ? post.content: '');
  const [title, setTitle] = useState(post ? post.title: '');
  const [userId, setUserId] = useState(post ? post.user: '');

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);
  
  const savePost = e => {
    if (title && content) {
      dispatch(postUpdated(postId, title, content, userId));
      setTitle('');
      setContent('');
      history.push(`/posts/${postId}`)
    }
  }

  const options = users.map(({id, name}) => {
    return (
      <option key={id} value={id}>{name}</option>
    )
  })
  return (
    <section>
      <h2>Edit Post</h2>
      <PostForm 
        title={title} 
        userId={userId}
        content={content}
        usersOptions={options}
        savePost={savePost}
        onTitleChanged={onTitleChanged}
        onContentChanged={onContentChanged}
        onAuthorChanged={onAuthorChanged} />
    </section>
  )
}