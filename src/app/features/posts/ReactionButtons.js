import React from 'react';
import { useDispatch } from 'react-redux';
import {reactionEmoji} from './utils';
import { reactionAdded } from './postsSlice';

export const ReactionButtons = ({post}) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() => dispatch(reactionAdded(post.id, name))}>
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return reactionButtons;
} 