import React from "react";
import Fab from '@mui/material/Fab';
import Zoom from "@mui/material/Zoom";
import axios from "axios";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
function Note(props){
    return <div className="note">   
        <h1>{props.title}</h1>
        <p>{props.content}</p>
            <Zoom in={true}>
                <Fab onClick={
                    async()=> await axios.delete("http://localhost:5000/delete",{data:{id:props.id}})}>
                    <DeleteForeverOutlinedIcon/>
                </Fab>
            </Zoom>
       
    </div>
}
export default Note