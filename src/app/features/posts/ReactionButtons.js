import React from 'react'
import { reactionEmoji } from './utils'
import { useAddReactionMutation } from '../api/apiSlice'

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => addReaction({ postId: post.id, reaction: name })}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return reactionButtons
}
