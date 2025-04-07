import {Link} from 'react-router-dom'
import InputCreate from './InputCreate.jsx';

const Home = ({data, setData}) => {

  const addNewTask = (newTask) => {
    setData(prevData => [...prevData, newTask])
  };

  return (
    <>
      <h2>Lista de tareas</h2>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <Link to={`/${item._id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Añadir nueva tarea:</h3>
      <InputCreate addNewTask={addNewTask} />  {/* Pasamos la función de agregar tarea al componente InputCreate */}
    </>
  );
};

export default Home;
