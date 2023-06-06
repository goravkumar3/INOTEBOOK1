import React from 'react'

const Noteitem = (props) => {
    const {note,deleteNote,updateNote}=props
  return (
    <div>
       <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
    <button type="button" className="btn btn-dark" onClick={()=>{deleteNote(note._id)}}>DELETE</button>
    <button type="button" className="btn btn-dark" onClick={()=>{updateNote(note)}}>EDIT</button>
    </div>
  </div>
</div>
    </div>
  )
}
export default Noteitem;
