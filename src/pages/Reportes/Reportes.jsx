import { useEffect, useState } from 'react'
import './reportes.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getGeneralReport, downloadDatabase } from '../../api/reports';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Reportes() {
  const [report, setReport] = useState([])
  const [general, setGeneral] = useState({f:0,m:0})

  const downloadDB = async () => {
    await downloadDatabase()
  }


  useEffect(() => {
    const fetchingReport = async () => {
      const response = await getGeneralReport();
      setReport(response.data.report)
      setGeneral(response.data.general)
    }
    fetchingReport()
  }, []);

  const data = {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: '# of Votes',
        data: [general.f, general.m],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
      },
    ],
  };

  const options = {
    responsive: true, // Ensure responsiveness
    maintainAspectRatio: false, // Allows flexibility in resizing
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 20, // Optional: Adds padding to the chart area
    },
  };

  return (
    <div>
      <div>
        <h1>Reportes</h1>

        <button onClick={downloadDB}>
          Descargar BD
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div>

          <table className="responsive-table-reportes">
            <thead>
              <tr>
                <th>Actividades</th>
                <th className="small">Cantidad de Niñas</th>
                <th className="small">Cantidad de Niños</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

              {report.map((element) => {
                return <tr >
                  <td>{element.name}</td>
                  <td>{element.f}</td>
                  <td>{element.m}</td>
                  <td>{element.t}</td>
                </tr>
              })}
              {
                general && <tr>
                  <td><b>Total</b></td>
                  <td><b>{general.f}</b></td>
                  <td><b>{general.m}</b></td>
                  <td><b>{general.t}</b></td>
                </tr>
              }


            </tbody>
          </table>
        </div>
        <div>
          <div style={{ position: 'relative', width: '420px', height: '400px' }}>
            <Pie data={data} options={options} />
          </div>

        </div>
      </div>
    </div>
  )
}
