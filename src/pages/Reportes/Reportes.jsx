import { useEffect, useState } from 'react'
import './reportes.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getGeneralReport, getYearlyReport, downloadDatabase } from '../../api/reports';
import { useAuth } from "../../context/authContext";
import Reporte1 from './Reporte1';
import Reporte2 from './Reporte2';
import Reporte3 from './Reporte3';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Reportes() {
  const { user } = useAuth();

  const [reportSection, setReportSection] = useState(1)

  const downloadDB = async () => {
    await downloadDatabase()
  }

  return (
    <div className="reports-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{fontSize: '40px'}}>REPORTES</h1>

        {
          user.role.role <= 2 ?
            <button className="download-db" onClick={downloadDB}>
              Descargar BD
            </button>
            :
            ""
        }

      </div>
      {
        user.role.role <= 2 ?
          <div>
            <button onClick={() => setReportSection(1)}>Reporte 1</button>
            <button onClick={() => setReportSection(2)}>Buscar Atendidos</button>
            <button onClick={() => setReportSection(3)}>Seguimiento</button>
          </div>

          : ""
      }

      {
        reportSection === 1 ? <Reporte1 /> : ""
      }
      {
        reportSection === 2 ? <Reporte2 /> : ""
      }
      {
        reportSection === 3 ? <Reporte3 /> : ""
      }

    </div>
  )
}
