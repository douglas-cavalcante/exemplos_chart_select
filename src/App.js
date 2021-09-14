import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

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

      </div>
    </>
  );
}

export default App;
