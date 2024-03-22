import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/resolvers";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import Database from "./data/database";

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
  resolvers
}
);
async function start() {
  const database = new Database();
  const db = database.getConnection();
  const createContext = async () => {
    return { db }
  }
  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: 8080 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start();