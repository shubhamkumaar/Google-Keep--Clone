import expess from "express"
import pg from "pg"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"
import session from "express-session"
import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
const app = expess()
const port = 5000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:"Chota Secret",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Keeper",
  password: "123456",
  port: 5432,
});
db.connect();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
},
function(accessToken, refreshToken, profile, cb) {
  console.log("Google Start")
  // console.log(profile)
  // console.log(profile)
  db.query("SELECT google_id FROM users WHERE google_id= $1", [profile.id], (err, result) => { 
    if(err){
      return cb(err);
    }
    // console.log(result.rows.length)
    if(result.rows.length>0){
      console.log("Already user")
      // console.log(accessToken)
      return cb(null,{
        id:profile.id,
        name:profile.name.givenName,
        photo:profile.photos[0].value,   
      })
      // {
      //   id:profile.id,
      //   googleId:profile.id
      // }  
    }
    if(result.rows.length == 0){
      // console.log("Insert")
      db.query("INSERT INTO users (google_id) VALUES ($1)",
      [profile.id])
      return cb(null,{
        id:profile.id,
        name:profile.name.givenName,
        photo:profile.photos[0].value,   
      })
    }
    
  })
}));

passport.serializeUser((user,done)=>{
  // console.log(user)
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})

function isLoggedIn(req,res,next){
  req.user?next():null
}

app.get('/auth/google',
   passport.authenticate('google',{scope:['profile']})
   
)
app.get('/auth/google/callback',
  passport.authenticate('google',{
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/failure' ,
  }),(req,res)=>{
    console.log(req.user);
    res.send("ThankYou for signing in!")
  }
);
app.get("/auth/success",(req,res)=>{
  if(req.user){
    console.log(req.user)
    res.status(200).json({
    success:true,
    message:"Successful",
    user:req.user,
  })}
  // else{
  //   res.status(403).json({success:true,message:"Not Authorised",})
  // }
})

app.get("/auth/failure",(req,res)=>{
  res.status(401).json({
    success:false,
    message:"Failure"
  })
})

app.get("/logout",(req,res)=>{
  req.logOut();
  res.redirect('http://localhost:3000')
})
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