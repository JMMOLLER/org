import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


export class ConnectionManager {
  static instance;
  constructor() {
    console.log('ConnectionManager is initialized');
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(value) {
    this.observers.forEach((setValue) => {
      setValue(value);
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionManager();
    }
    return this.instance;
  }
}

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL
});

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_API_GRAPHQL_URL.replace('http', 'ws'),
  on: {
    closed: () => {
      setTimeout(() => {
        ConnectionManager.getInstance().notifyObservers(false);
        console.log('Try reconnect...');
        wsLink.client.subscribe();
      }, 2500);
    },
    connected: () => {
      console.log('Connected!');
      ConnectionManager.getInstance().notifyObservers(true);
    },
  }
}));


// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
