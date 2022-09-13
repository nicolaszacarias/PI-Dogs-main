import './App.css';
import Home from './componentes/home';
import DogsDetail from './componentes/dogDetail';
import { Route, Routes } from "react-router";
import LandingPage from "./componentes/landingpage"
import AddDogs from './componentes/addDogs';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}>
        </Route>
        <Route path="/home" element={<Home/>}>
      </Route>
      <Route path="/:id" element={<DogsDetail/>}>
      </Route>
      <Route path="/add" element={<AddDogs/>}>
      </Route>
      </Routes>
    </div>
  );
}

export default App;
