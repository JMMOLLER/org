import { ApolloProvider } from '@apollo/client'
import React from 'react'
import App from './App.jsx'
import client, { ConnectionManager } from './Apollo/apolloClient.js'


export default function Root() {
    const CM = ConnectionManager.getInstance();
    const [isOnline, setIsOnline] = React.useState(true);
    CM.addObserver(setIsOnline);

    return (
        <ApolloProvider client={client}>
            <App isOnline={isOnline} />
        </ApolloProvider>
    );
}
