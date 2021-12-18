import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from '../../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { fetchPosts, selectPostIds, selectPostById } from '../posts/postsSlice'

const PostExcerpt = React.memo(({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButtons post={post} />
    </article>
  )
})

export const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPostIds)
  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="loading..." />
  } else if (postStatus === 'success') {
    content = posts.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
