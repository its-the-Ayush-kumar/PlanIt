import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const app = new Application()
const router = new Router()

app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', ({ response }: {response: any}) => {
  console.log("Server is working just fine!")
  response.body = "Hello Stranger! Welcome to PlanIt back-end server"
})
// --------------------------------------------------------------------------------------------------------GET

interface Task{
  heading: string,
  time: string,
  description: string
}

let createTasks = async (path: string) => {
  const decoder = new TextDecoder('utf-8');
  let records = decoder.decode(await Deno.readFile(path)).split('\n');
  records.pop();
  let tasks: Task[] = []
  records.forEach(tRecord => {
    let record = tRecord.split(',')
    tasks.push({
      heading: record[0],
      time: record[2] + " " + record[1] + " <=> " + record[4] + " " + record[3],
      description: record[5]
    })
  })
  return tasks
}

router.get('/getMiscellaneousTasks', async ({ request, response }: { request: any, response: any}) => {
  console.log("Miscellaneous Tasks request made!")
  try{
    let path = "./client/src/tasks/miscellaneous.csv"
    response.body = {
      success: true,
      tasks: await createTasks(path)
    }
  } catch(err){
    response.body = {
      success: false,
      msg: "There was a problem reading miscellaneous tasks!"
    }
  }
})

router.get('/getTimedTasks', async ({ request, response }: { request: any, response: any}) => {
  console.log("Timed Tasks request made!")
  try{
    let path = "./client/src/tasks/timed.csv"
    response.body = {
      success: true,
      tasks: await createTasks(path)
    }
  } catch(err){
    response.body = {
      success: false,
      msg: "There was a problem reading timed tasks!"
    }
  }
})

// -------------------------------------------------------------------------------------------------------------------POST

router.post('/newTask', async ({ request, response }: { request: any, response: any}) => {
  console.log("New Task request made!");
  const task = await (await request.body()).value
  let taskAsCsv = ""
  
  for(let key in task) taskAsCsv += task[key] + ","
  taskAsCsv += "\n"

  let miscellaneous = false;
  if(task.startTime === task.endTime && task.startDate === task.endDate) miscellaneous = true
  
  let path = `./client/src/tasks/${miscellaneous ? 'miscellaneous' : 'timed'}.csv`
  try{
    Deno.writeTextFile(path, taskAsCsv, {"append": true})
    response.body = {
      success: true,
      msg: "Task added!"
    }
  } catch(err){
    response.body = {
      success: false,
      msg: "Task could not be added!"
    }
  }
})

console.log("http://localhost:9000/")
await app.listen({ port: 9000 })
