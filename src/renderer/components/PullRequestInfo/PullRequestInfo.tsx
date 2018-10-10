import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { Link, RouteComponentProps } from '@reach/router';
import * as getPullRequest from './getPullRequest.graphql';
import * as getCommands from './getCommands.graphql';
import ExternalLink from '../ExternalLink/ExternalLink';

type Props = RouteComponentProps<{ repo: string; number: string }> & WithApolloClient<{}>;

interface State {
  isLoading: boolean;
  pullRequest?: PullRequest;
  commands: Command[];
}

interface PullRequestInfoQueryData {
  repository: {
    pullRequest: PullRequest;
  };
}

interface PullRequest {
  number: number;
  title: string;
  author: {
    login: string;
  };
  headRef: {
    target: {
      oid: string;
      repository: {
        name: string;
        owner: {
          login: string;
        };
      };
    };
  };
}

interface CommandQueryData {
  repository: {
    object: {
      entries: {
        name: string;
        object: {
          text: string;
        };
      }[];
    };
  };
}

interface Command {
  name: string;
  text: string;
}

class PullRequestInfo extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      commands: []
    };
  }

  componentWillMount() {
    // TODO: Fetch data
    const { client, repo, number } = this.props;

    client
      .query<PullRequestInfoQueryData, { repo: string; number: number }>({
        query: getPullRequest,
        variables: {
          repo: repo!,
          number: parseInt(number!, 10)!
        }
      })
      .then(({ data: { repository: { pullRequest } } }) => {
        this.setState({
          pullRequest
        });

        console.log(pullRequest);

        return client.query<CommandQueryData, { owner: string; name: string; expression: string }>({
          query: getCommands,
          variables: {
            owner: pullRequest.headRef.target.repository.owner.login,
            name: pullRequest.headRef.target.repository.name,
            expression: `${pullRequest.headRef.target.oid}:commands`
          }
        });
      })
      .then(({ data: { repository: { object: { entries } } } }) => {
        const commands: Command[] = entries.map(entry => ({
          name: entry.name,
          text: entry.object.text
        }));

        this.setState({ isLoading: false, commands });
      });
  }

  render() {
    const { repo } = this.props;
    const { isLoading, pullRequest, commands } = this.state;

    if (isLoading || !pullRequest) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <Link to="/">Back</Link>
        <div className="pull-request-info">
          <h2>
            PR #{pullRequest.number} by {pullRequest.author.login}
          </h2>
          <ExternalLink to={`https://github.com/CryptoScamDB/${repo}/pull/${pullRequest.number}`}>
            View on GitHub
          </ExternalLink>
          <h3>Commands</h3>
          {commands.map((command, index) => (
            <div key={index} className="command">
              <h4>{command.name}</h4>
              <pre>{command.text}</pre>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withApollo(PullRequestInfo);
