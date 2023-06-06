import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
const Notes = () => {
  const context = useContext(noteContext);
  const { note, getNotes, deleteNotes, editNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setData({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const [data, setData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handle = (e) => {
    e.preventDefault();
    refClose.current.click();
    editNotes(data.id, data.etitle, data.edescription, data.etag);
  };
  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={data.etitle}
                    onChange={change}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={change}
                    value={data.edescription}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={change}
                    value={data.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handle}
                disabled={data.etitle.length < 3 || data.edescription.length < 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Your Notes</h1>
      {note.map((notes) => {
        return (
          <Noteitem
            key={notes._id}
            note={notes}
            deleteNote={deleteNotes}
            updateNote={updateNote}
          />
        );
      })}
    </div>
  );
};

export default Notes;
