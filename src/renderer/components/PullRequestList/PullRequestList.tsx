import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { withApollo, WithApolloClient } from 'react-apollo';
import { ApolloQueryResult } from 'apollo-client';
import * as getPullRequests from './getPullRequests.graphql';
import PullRequestListItem from './PullRequestListItem/PullRequestListItem';

type Props = RouteComponentProps & WithApolloClient<{}>;

interface State {
  isLoading: boolean;
  pullRequests: PullRequest[];
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: {
    login: string;
  };
  repository: {
    name: string;
  };
  headRefOid: string;
  headRef: {
    repository: {
      owner: {
        login: string;
      };
      name: string;
    };
  };
}

interface QueryResult {
  repository: {
    pullRequests: {
      nodes: PullRequest[];
    };
  };
}

class PullRequestList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      pullRequests: []
    };
  }

  componentDidMount() {
    Promise.all<ApolloQueryResult<QueryResult>>([
      this.getPullRequests('blacklist'),
      this.getPullRequests('whitelist')
    ])
      .then(data => {
        const pullRequests: PullRequest[] = [];
        data.forEach(repo => {
          pullRequests.push(...repo.data.repository.pullRequests.nodes);
        });
        return pullRequests;
      })
      .then(pullRequests => {
        this.setState({
          isLoading: false,
          pullRequests
        });
      });
  }

  render() {
    const { isLoading, pullRequests } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <h2>Open pull requests</h2>
        {pullRequests.map(pullRequest => (
          <PullRequestListItem key={pullRequest.id} pullRequest={pullRequest} />
        ))}
      </>
    );
  }

  private async getPullRequests(repo: string): Promise<ApolloQueryResult<QueryResult>> {
    return this.props.client.query<QueryResult, { repo: string }>({
      query: getPullRequests,
      variables: {
        repo
      }
    });
  }
}

export default withApollo(PullRequestList);
