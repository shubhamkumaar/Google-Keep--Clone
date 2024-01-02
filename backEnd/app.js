import expess from "express"
import pg from "pg"
import cors from "cors"
import bodyParser from "body-parser"

const app = expess()
const port = 5000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Keeper",
  password: "123456",
  port: 5432,
});
db.connect();

async function getData(){
  const result = await db.query("SELECT * FROM notes")
  return result.rows
}

app.get("/",async(req,res)=>{
  const result = await db.query("SELECT * FROM notes")
  // console.log(result.rows)
  res.json(result.rows)
})

app.post("/create",async(req,res)=>{
     const title = req.body.title
     const content = req.body.content
    //  console.log(title)
    //  console.log(content)
     await db.query("INSERT INTO notes (titles,contents) VALUES  ($1,$2)",[title,content])
     res.json(getData)
})

app.delete("/delete",async(req,res)=>{
  const id = req.body.id
  await db.query("DELETE FROM notes WHERE id = $1",[id])
  res.json(getData)
})
app.listen(port,()=>{
    console.log("Database")
})