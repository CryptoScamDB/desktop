import * as React from 'react';
import { CommentData } from '../PullRequestInfo';
import Comment from './Comment/Comment';

interface OwnProps {
  comments: CommentData[];
}

type Props = OwnProps;

/**
 * TODO: Implement pagination
 */
class Comments extends React.PureComponent<Props> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    const { comments } = this.props;

    return (
      <div className='comments'>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

export default Comments;
