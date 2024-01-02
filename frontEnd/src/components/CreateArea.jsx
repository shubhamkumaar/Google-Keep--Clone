import React,{useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from '@mui/material/Fab';
import Zoom from "@mui/material/Zoom";
import axios from "axios";
function CreateArea(props) {
  const [isExpanded,setExpansion] = useState(false);
  
  function handleTextArea(){
    
    setExpansion(true)
  }
    const[note,setNote] = useState({
      key:0,
        title:'',
        content:''
    })

    function handleChange(event){
        const {value,name} = event.target
        setNote((prevValue)=> {return {...prevValue,[name] : value}})
    }
    async function handleClick(event){
      await axios.post("http://localhost:5000/create",note)
        event.preventDefault();
    }
    
    // handleClick
   
    
  return (
    <div>
      <form className="create-note">
        {isExpanded && <input onChange={handleChange} value={note.title}name="title" placeholder="Title" />}
        <textarea  onClick={handleTextArea} onChange={handleChange} value={note.content} name="content" placeholder="Take a note..." rows={isExpanded?3:1}/>
        <Zoom in={isExpanded}>
        <Fab  onClick = {handleClick} aria-label="add">
            <AddIcon />
          </Fab>
          </Zoom>
        {/* <button onClick = {handleClick}>Add</button> */}
      </form>
    </div>
  );
}

export default CreateArea;
