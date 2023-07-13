import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const  token = localStorage.getItem('token');
  const host = "http://127.0.0.1:5000";
  const notes = [];
  const [note, setNote] = useState(notes);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body data type must match "Content-Type" header
    }); // parses JSON response into native JavaScript objects
    const Json = await response.json();
    console.log(Json);
    setNote(Json);
  };
  //delete Notes
  const deleteNotes = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
           // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body data type must match "Content-Type" header
    }); // parses JSON response into native JavaScript objects
    const Json = await response.json();
    console.log(Json);
    const deleteNote = Object.values(note).filter((note) => {
      return note._id !== id;
    });
    setNote(deleteNote);
  };
  //add Notes
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag }),
    }); // parses JSON response into native JavaScript objects
    const Json = await response.json();
    console.log(Json);
    setNote(note.concat(Json));
  };
    //add Notes
    const editNotes = async (id,title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body data type must match "Content-Type" header
        body: JSON.stringify({ title, description, tag }),
      }); // parses JSON response into native JavaScript objects
      const Json = await response.json();
      console.log(Json);
      let newNote=await JSON.parse(JSON.stringify(note))
      for(let i=0;i<newNote.length;i++){
        const element=newNote[i];
        if(element._id===id){
          newNote[i].title=title
          newNote[i].description=description
          newNote[i].tags=tag
        break;
        }
      }
      setNote(newNote);

    };
  return (
    <NoteContext.Provider value={{ note, getNotes, deleteNotes, addNotes ,editNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
