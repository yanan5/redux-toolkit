import React from 'react';

export const PostForm = ({title, onTitleChanged,content, onContentChanged, savePost, onAuthorChanged, usersOptions, userId}) => {
  return (
    <section>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type='text' onChange={onTitleChanged} id="postTitle" name="postTitle" value={title}/>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type='button' onClick={savePost}>Save Posts</button>
      </form>
    </section>
  )
}