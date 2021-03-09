import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();

const types = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
  }
`;
const users = [{ username: "Jane", email: "jane@test.com", password: "adc" }];
const resolvers = {
  Query: {
    users: () => users,
  },

  Mutation: {
    signup: (
      parent: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string },
      ctx: any,
      info: any
    ) => {
      const newUser = { username, email, password };

      users.push(newUser);

      return newUser;
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: "Aaron" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080/graphql");
await app.listen({ port: 8080 });
