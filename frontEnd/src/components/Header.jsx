import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
function header(props){
    const google = async()=>{
        console.log("Google")
        window.open("http://localhost:5000/auth/google","_blank","width=500,height=600")
    }
    return <header>
        <h1><HighlightIcon/>Keeper</h1>
        <button onClick={google} className="signIn">Sign In</button>
{/* <Fab className="signIn">Sign In</Fab> */}
    </header>
}

export default header;