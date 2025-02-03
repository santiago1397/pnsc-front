import { useEffect, useState } from 'react'
import './reportes.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getGeneralReport, getYearlyReport, downloadDatabase } from '../../api/reports';
import { useAuth } from "../../context/authContext";
import Reporte1 from './Reporte1';
import Reporte2 from './Reporte2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Reportes() {
  const { user } = useAuth();

  const [reportSection, setReportSection] = useState(0)

  const downloadDB = async () => {
    await downloadDatabase()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Reportes</h1>

        {
          user.role.role <= 2 ?
            <button onClick={downloadDB}>
              Descargar BD
            </button>
            :
            ""
        }

      </div>
      {
        user.role.role <= 2 ?
          <div>
            <button onClick={() => setReportSection(0)}>reporte 1</button>
            <button onClick={() => setReportSection(1)}>reporte 2</button>
          </div>

          : ""
      }

      {
        reportSection === 0 ? <Reporte1 /> : <Reporte2 />
      }

    </div>
  )
}
