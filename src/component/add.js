import React, { useState, useContext } from "react";

import noteContext from "../context/notes/noteContext";
function Add() {
  const context = useContext(noteContext);
  const { addNotes } = context;
  const [data, setData] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handle = (e) => {
    e.preventDefault();
    addNotes(data.title, data.description, data.tag);
  };
  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={change}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={change}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={change}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handle}
          disabled={data.title.length < 3 || data.description.length < 5}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Add;
