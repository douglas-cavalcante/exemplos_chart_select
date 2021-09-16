import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { ToastContainer, toast } from 'react-toastify';

import Swal from 'sweetalert2'

import api from './services/api';

const data = {
  labels: ['React', 'React-native', 'Node', 'Java'],

  datasets: [
    {
      label: '# of downloads',
      data: [1000, 600, 500, 50],
      backgroundColor: [
        'blue',
        'tomato',
        'green',
        'red'
      ],
      borderWidth: 1,
    }
  ]
}

function App() {

  const [optionSelected, setOptionSelected] = useState('')

  const [options, setOptions] = useState([])

  const handleGetOptionsSectors = async () => {
    try {
      const response = await api.get('/sectors');

      const optionsFormatted = response.data.map(item => {
        return {
          label: item.name,
          value: item.name
        }
      });

      setOptions(optionsFormatted);
    } catch (error) {
    }
  }


  const notify = () => {
    toast.success("Wow so easy !", { autoClose: 10000, position: 'top-center' })
    toast.error("Deu ruim")
    toast.warn("Sou aviso")
  };

  const notifySwal = (message) => {
    Swal.fire({
      icon: 'info',
      title: 'Mensagem',
      text: message,
      footer: 'Criado por Zap System'
    })
  }
  useEffect(() => {
    handleGetOptionsSectors();
  }, []);

  return (
    <>
      <div className="App">

        <div>
          <Pie
            data={data}
            width={400}
            height={350}
            options={{ maintainAspectRatio: false }}
            redraw={false}
          />
        </div>

        <select value={optionSelected} onChange={(event) => setOptionSelected(event.target.value)}>
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>

        <table border="1" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Douglas</td>
              <td><button onClick={() => notifySwal('Lorem impsiienewirkf wern34ir3nrei3rn inirn3ri3rn 3irn3r i3rn3ir')}>Ver nome</button></td>
            </tr>
          </tbody>
        </table>

      </div>

      <ToastContainer />
    </>
  );
}

export default App;
