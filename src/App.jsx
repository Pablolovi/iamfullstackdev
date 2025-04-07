import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home.jsx';
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from './InputCreate.jsx';



const App = () => {
  const [data, setData] = useState([]);
  const urlApi = 'http://localhost:3000'

const fetchData = async () => {
  try {
    const response = await fetch(urlApi)
    const resData = await response.json()
    setData(resData)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
}, [])

return (
  <Router>
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/create">Crear Tarea</Link>
      </nav>

      {data.length === 0 ? (
        <div>Cargando...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} />} />
          <Route path="/create" element={<InputCreate addNewTask={(newTask) => setData(prev => [...prev, newTask])} />} />
          {data.map(item => (
            <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item} />} />
          ))}
        </Routes>
      )}
    </div>
  </Router>
);
};

export default App;
