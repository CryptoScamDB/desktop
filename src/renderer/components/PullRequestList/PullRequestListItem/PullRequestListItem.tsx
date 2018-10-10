import * as React from 'react';
import { PullRequest } from '../PullRequestList';
import { Link } from '@reach/router';
import './PullRequestListItem.scss';

interface Props {
  pullRequest: PullRequest;
}

const PullRequestListItem: React.StatelessComponent<Props> = ({ pullRequest }) => (
  <Link
    className="pull-request"
    to={`/pull-request/${pullRequest.repository.name}/${pullRequest.number}`}
  >
    [{pullRequest.repository.name}] (#
    {pullRequest.number}) {pullRequest.title} - {pullRequest.author.login}
  </Link>
);

export default PullRequestListItem;
