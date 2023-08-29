import { gql, useQuery, useSubscription, useMutation } from "@apollo/client";
import * as fetchGQPL from "../Apollo/queryBuilders";
import LocalDB from "../db";
import { useEffect } from "react";

const useApolloQuery = ({
    helpers,
    setHelpers,
    setDataTeams,
    setShowModal,
    setShowPreloader,
    t,
}) => {
    const QUERY_HELPERS = gql`
        ${fetchGQPL.buildQueryAllHelpers}
    `;
    const QUERY_TEAMS = gql`
        ${fetchGQPL.buildQueryAllTeams}
    `;
    const SUBSCRIPTION_HELPERS = gql`
        ${fetchGQPL.buildSubscriptionHelper}
    `;
    const ADD_HELPER = gql`
        ${fetchGQPL.buildQuery({
            typeQuery: "mutation",
            operationName: "Mutation($input: HelperInput)",
            query: "createHelper(input: $input)",
            queryFields: ["id"],
        })}
    `;

    const {
        loading: loadingHelpers,
        error: errorHelpers,
        data: dataHelpers,
    } = useQuery(QUERY_HELPERS);
    const {
        loading: loadingTeams,
        error: errorTeams,
        data: dataTeamsGQL,
    } = useQuery(QUERY_TEAMS);
    const [
        addHelper,
        { data: dataMutation, loading: loadingMutation, error: errorMutation },
    ] = useMutation(ADD_HELPER);

    const { data, loading, error } = useSubscription(SUBSCRIPTION_HELPERS);

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(error);
            return;
        }
        setHelpers([...helpers, data.newHelper]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading]);

    useEffect(() => {
        if (loadingMutation) return;
        if (errorMutation) {
            console.error(errorMutation);
            return;
        }
    }, [dataMutation, loadingMutation, errorMutation]);

    useEffect(() => {
        handleDataFetching({
            loadingState: loadingHelpers,
            errorState: errorHelpers,
            dataState: dataHelpers,
            setDataState: setHelpers,
            dataType: "helpers",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingHelpers, errorHelpers, dataHelpers]);

    useEffect(() => {
        handleDataFetching({
            loadingState: loadingTeams,
            errorState: errorTeams,
            dataState: dataTeamsGQL,
            setDataState: setDataTeams,
            dataType: "teams",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingTeams, errorTeams, dataTeamsGQL]);

    const handleDataFetching = ({
        loadingState,
        errorState,
        dataState,
        setDataState,
        dataType,
    }) => {
        if (loadingState) return;
        if (errorState) {
            setShowModal({
                show: true,
                payload: {
                    title: t("modal.title.text_3"),
                    message: t("modal.message.text_3"),
                    button: t("modal.button"),
                    customClickEvt: () => {
                        setShowPreloader(false);
                    },
                },
            });
            console.error(errorState);
            loadFromLocalDB({ dataType, setDataState });
            return;
        }
        if (dataState) {
            if (dataType === "teams") {
                const mutableTeam = handleMutation({ dataState, dataType });
                setDataState(mutableTeam || []);
            } else {
                setDataState(dataState[dataType] || []);
            }
        }
    };

    const handleMutation = ({ dataState, dataType }) => {
        return dataState[dataType].map((team) => {
            const mutableTeam = { ...team };
            mutableTeam.colors = { ...team.colors };
            return mutableTeam;
        });
    };

    const loadFromLocalDB = ({ dataType, setDataState }) => {
        setDataState(LocalDB[dataType]);
    };

    return {
        addHelper,
        errorHelpers,
        errorTeams,
        loadingHelpers,
        loadingTeams,
    }
};

export default useApolloQuery;