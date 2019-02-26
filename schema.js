const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");

const axios = require("axios");
// 2 resources launches and rockets.

//Launch type
const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flightnumber: {
            type: GraphQLInt
        },
        missionname: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_date_local: {
            type: GraphQLString
        },
        launch_sucess: {
            type: GraphQLBoolean
        },
        flightnumber: {
            type: GraphQLInt
        },
        rocket: {type: Rockettype}
    })
})

const Rockettype = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id : {type: GraphQLString},
        rocket_name : {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
})

//Now that we have our types, we need resolves which resolve our data 
//These are called ROOT QUERIES

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: { //Here we want launches to be an array of Launches - we are bringing it in as a GRAPHQLLIST
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get("https://api.spacexdata.com/v3/launches")
                       .then(res => res.data);
                //here is where we get our data.
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery // Also would take any mutations.
})