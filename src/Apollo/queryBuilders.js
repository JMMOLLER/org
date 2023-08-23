import propTypes from "prop-types";

function buildQuery({ typeQuery, operationName, query, queryFields }) {
    queryFields = refactorQueryFields(queryFields);

    const QUERY = `
        ${typeQuery} ${operationName} {
            ${query} {
                ${queryFields.toString().split(",").join("\n")}
            }
        }
    `;

    return QUERY;
}

const buildQueryAllHelpers = buildQuery({
    typeQuery: "query",
    operationName: "getAllHelpers",
    query: "helpers",
    queryFields: [
        "name",
        "id",
        "photo",
        "position",
        {
            team: ["id", "teamName"],
        },
    ],
});

const buildQueryAllTeams = buildQuery({
    typeQuery: "query",
    operationName: "getAllTeams",
    query: "teams",
    queryFields: [
        "id",
        "teamName",
        {
            colors: ["primary", "background"],
        }
    ],
});

function refactorQueryFields(queryFields) {
    const fields = queryFields.map((field) => {
        if (typeof field === "string") {
            return field;
        }

        if (typeof field === "object") {
            const [key] = Object.keys(field);
            const value = field[key];

            return `${key} {
                ${value.toString().split(",").join("\n")}
            }`;
        }
    });

    return fields;
}

buildQuery.propTypes = {
    typeQuery: propTypes.string.isRequired,
    operationName: propTypes.string.isRequired,
    query: propTypes.object.isRequired,
    queryFields: propTypes.array.isRequired,
};

export {
    buildQueryAllHelpers,
    buildQueryAllTeams,
    buildQuery,
};