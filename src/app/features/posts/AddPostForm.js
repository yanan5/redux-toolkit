import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { PostForm } from './PostForm'
import { useAddNewPostMutation } from '../api/apiSlice'

export const AddPostForm = () => {
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const [addNewPost, { isLoading }] = useAddNewPostMutation()

  const canSave = [title, content, userId].every(Boolean) && !isLoading
  const savePost = async (e) => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  const options = users.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
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
        onAuthorChanged={onAuthorChanged}
      />
    </section>
  )
}
