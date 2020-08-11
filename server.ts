import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application()
const router = new Router()

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', ({ response }: {response: any}) => {
  response.body = "Hello Stranger! Welcome to PlanIt back-end server"
})

console.log("http://localhost:9000/")
await app.listen({ port: 9000 });
