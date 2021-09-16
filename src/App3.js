import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from './services/api';

import * as yup from 'yup';


// import { Container } from './styles';

// API REST

/*
GET - Pegar informações query params
POST - Cadastrar uma nova informação via body
DELETE -  
PUT - 
*/

const schema = yup.object().shape({
  name: yup.string().required('Campo é obrigatório').min(4, 'nome é muito curto'),
  timer: yup.string().email()
})


const App3 = () => {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await schema.validate({ name })

      /*
       if(name === '') {
         Swal.fire('Nome é vazio');
         return;
       }
      */

      setLoading(true)

      const response = await api.post('/sectors', {
        name: name
      })

      Swal.fire('Cadastrado com sucesso');

      setName('');
      setLoading(false);

      console.log(response.data)
    } catch (error) {
      Swal.fire(error.errors[0]);
    }


  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '50px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <label>Nome:</label>
      <textarea value={name} onChange={(event) => setName(event.target.value)} rows="10" />


      {
        loading === true
          ? 'Salvando ...'
          : <button type="submit">Cadastrar</button>
      }
    </form>
  );
}

export default App3;