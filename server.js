const express = require("express"),
      graphqlHTTP = require("express-graphql"),
      app = express(),
      PORT =  4000,
      schema = require("./schema.js");

      app.use("/graphql", graphqlHTTP({
          schema,
          graphiql: true
      }))


      app.listen(PORT), () => {
          console.log(`server started on ${PORT} port`);
      };