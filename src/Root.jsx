import { ApolloProvider } from "@apollo/client";
import React from "react";
import App from "./App.jsx";
import client from "./Apollo/apolloClient.js";
import ConnectionManager from "./utils/connectionManager";
import LR from "./components/LanguageRedirector/index.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function Root() {
    const CM = ConnectionManager.getInstance();
    const [isOnline, setIsOnline] = React.useState(true);
    CM.addObserver(setIsOnline);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ApolloProvider client={client}>
                            <App isOnline={isOnline} />
                        </ApolloProvider>
                    }
                />
                <Route path="/en" element={<LR/>} />
                <Route path="/es" element={<LR/>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
