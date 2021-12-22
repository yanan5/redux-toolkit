import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectAllUsers } from '../users/usersSlice'
import { PostForm } from './PostForm'
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const { data: post } = useGetPostQuery(postId)
  const users = useSelector(selectAllUsers)
  const [postUpdated] = useEditPostMutation()
  const [content, setContent] = useState(post ? post.content : '')
  const [title, setTitle] = useState(post ? post.title : '')
  const [userId, setUserId] = useState(post ? post.user : '')

  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const savePost = (e) => {
    if (title && content) {
      postUpdated({ id: postId, title, content, user: userId })
      setTitle('')
      setContent('')
      history.push(`/posts/${postId}`)
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
      <h2>Edit Post</h2>
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
