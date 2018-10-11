import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import * as addComment from './addComment.graphql';

interface OwnProps {
  pullRequestId: string;
}

type Props = WithApolloClient<any> & OwnProps;

interface State {
  body: string;
}

class AddCommentForm extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      body: ''
    };

    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  render () {
    const { body } = this.state;
    return (
      <form target='#' className='add-comment-form' onSubmit={this.handleSubmitForm}>
        <div className='field'>
          <label>Body</label>
          <input type='text' value={body} onChange={this.handleChangeBody} />
        </div>
        <input type='submit' />
      </form>
    );
  }

  handleChangeBody (event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      body: event.currentTarget.value
    });
  }

  handleSubmitForm (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { client, pullRequestId } = this.props;
    const { body } = this.state;

    client.mutate({
      mutation: addComment,
      variables: {
        subjectId: pullRequestId,
        body
      }
    })
      .then(() => {
        alert('Comment added.');
      })
      .catch(console.error);
  }
}

export default withApollo(AddCommentForm);
