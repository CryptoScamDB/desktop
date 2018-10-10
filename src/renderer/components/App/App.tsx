import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router } from '@reach/router';
import PullRequestList from '../PullRequestList/PullRequestList';
import PullRequestInfo from '../PullRequestInfo/PullRequestInfo';

const App: React.StatelessComponent = () => (
  <>
    <Router>
      <PullRequestList path="/" />
      <PullRequestInfo path="/pull-request/:repo/:number" />
    </Router>
  </>
);

export default hot(module)(App);
