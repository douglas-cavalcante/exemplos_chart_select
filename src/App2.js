import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from './services/api';

const App2 = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  const handleGetSectors = async () => {
    try {
      const response = await api.get('/sectors?_sort=name');
      console.log(response);
      setData(response.data);
    } catch (error) {
      toast.error('Houve um erro ao tentar recuperar os setores');
    }
  }

  useEffect(() => {
    handleGetSectors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.get(`/sectors?name_like=${search}`);

    setData(response.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} />


        {
          data.map(item => <p key={item.id}>{item.name}</p>)
        }

        <button type="submit">Pesquisar</button>
        
        <ToastContainer />
      </div>
    </form>
  );
}

export default App2;