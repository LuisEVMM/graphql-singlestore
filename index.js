import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/resolvers.js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { printSchema } from "graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

/* Primera Opcion */
// const typeDefs = readFileSync("./schemas/schema.graphql", {
//   encoding: "utf-8",
// });

/* Segunda Opcion */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const typesArrays = loadFilesSync(path.join(__dirname, "./schemas"), {
//   extensions: ["graphql"],
// });

// const typeDefs = mergeTypeDefs(typesArrays);

/* Tercera Opcion */
const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// console.log(printSchema(typeDefs));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`🚀  Server ready at: ${url}`);
