// import './App.css';
import { HashRouter as Router } from "react-router-dom";
import Navbar from './component/navbar';
import Route from './config/Route'
import NoteState from './context/notes/notesState';
function App() {
  return (
    <div className="App">
      <NoteState>
       <Router>
      <Navbar />
         <Route/>
    </Router>
    </NoteState>
    </div>
  );
}

export default App;
