import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewPost} from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { PostForm } from './PostForm';

export const AddPostForm = () => {
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  
  const dispatch = useDispatch();
  const canSave =
  [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
  const savePost = async e => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const options = users.map(({id, name}) => {
    return (
      <option key={id} value={id}>{name}</option>
    )
  })
  return (
    <section>
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