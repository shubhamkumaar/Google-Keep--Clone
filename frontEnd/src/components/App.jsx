import React,{useState} from "react";
import Heading from "./Header";
import Footer from "./Footer";
import Note from "./Note"
// import notes from "../notes";
import CreateArea from "./CreateArea";
import axios from "axios"

function App(){
    const [backEnd,setData] = useState([])
    const  getData = async()=>{
        const response = await axios.get("http://localhost:5000")
        setData(response.data);
    }
    getData()

    // const [addNote,setNote] = useState(notes);

    // function Add(note){
        
    //     // console.log(note)
    //     const index = addNote.length + 1;
    //     note.key = index
    //     // console.log(note.key)
    //     setNote(prevNote=>{return [...prevNote,note];})
    //     // console.log(addNote)
    // }
    // async function Delete(id){
    //     // console.log("Delete")
    //     // await axios.delete("http://localhost:5000/delete",{data:{id:id}})

    //     // setNote(addNote.filter((item,index)=>index!==id))
    // }
    return <div>
        <Heading />
        <CreateArea />
        {backEnd.map((note,index)=><Note key={note.id} id={note.id} title={note.titles} content = {note.contents}/>)}
        {/* {addNote.map((note,index)=><Note key = {note.key} id={index} delete = {Delete} title = {note.title} content = {note.content}/> )} */}
        <Footer />
        
    </div>
}

// onAdd = {createNote} delete = {Delete}
export default App;