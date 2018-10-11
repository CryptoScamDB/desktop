import * as React from 'react';
import { CommentData } from '../../PullRequestInfo';

interface Props {
  comment: CommentData;
}

const Comment: React.StatelessComponent<Props> = ({ comment }) => (
  <div className='comment'>
    <div className='comment-metadata'>
      <span className='comment-author'>{comment.author.login}</span>{' '}<span className='comment-date'>{comment.createdAt}</span>
    </div>
    <div className='comment-body'>
      {comment.bodyText}
    </div>
  </div>
);

export default Comment;
