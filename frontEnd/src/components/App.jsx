import React,{useEffect,useState} from "react";
import Heading from "./Header";
import Footer from "./Footer";
import Note from "./Note"
// import notes from "../notes";
import CreateArea from "./CreateArea";
import axios from "axios"

function App(){
    const [backEnd,setData] = useState([])
    // const [isLoggedIn,setLogged] = useState(null)

 
    const  getData = async()=>{
        const response = await axios.get("http://localhost:5000")
        setData(response.data);
    }
    useEffect(()=>{       
        getData()
    },[])

    return <div>
        <Heading />
        {/* {isLoggedIn?null:<p className = "loginPara">Login to Keep Your Notes</p>} */}
        <CreateArea />
        {backEnd.map((note,index)=><Note key={note.id} id={note.id} title={note.titles} content = {note.contents}/>)}
        {/* {addNote.map((note,index)=><Note key = {note.key} id={index} delete = {Delete} title = {note.title} content = {note.content}/> )} */}
        <Footer />
        
    </div>
}
export default App;