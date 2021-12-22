import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from '../../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useGetPostsQuery } from '../api/apiSlice'
import classnames from 'classnames'

const PostExcerpt = React.memo(({ post }) => (
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
))

export const PostList = () => {
  const {
    data: posts = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])
  let content
  if (isLoading) {
    content = <Spinner text="loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
    const containerClassName = classnames('posts-container', {
      disabled: isFetching,
    })
    content = <div className={containerClassName}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
