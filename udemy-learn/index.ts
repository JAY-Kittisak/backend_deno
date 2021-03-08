import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";

import { GraphQLService } from './server.ts'

const app = new Application();

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("🚀 Server is ready at http://localhost:8000/graphql")
await app.listen({ port: 8000 });

