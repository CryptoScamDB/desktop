import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import { ApolloProvider } from 'react-apollo';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import ApolloClient from 'apollo-client/ApolloClient';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const source = createMemorySource('/');
const history = createHistory(source);

ReactDOM.render(
  <ApolloProvider client={client}>
    <LocationProvider history={history}>
      <App />
    </LocationProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

export const navigate = history.navigate;
