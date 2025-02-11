import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getGeneralReport, getYearlyReport, downloadDatabase, getRepeatedStudentsReport } from '../../api/reports';
import { getStateReport } from '../../api/reports';
import { createEntity, getEntities } from '../../api/entity';
import { useAuth } from "../../context/authContext";
import GeneralReport from './GeneralReport';

export default function Reporte1() {



  const { user } = useAuth();
  const [report, setReport] = useState([])
  const [general, setGeneral] = useState({ f: 0, m: 0 })
  const [repeated, setRepeated] = useState([])

  const [report2, setReport2] = useState({ municipios: [] })
  const [entities, setEntities] = useState([])
  const [selectedEntity, setSelectedEntity] = useState(user.entity.name)

  const [yearlyReport, setYearlyReport] = useState([])



  const fetchingRepeatedStudentsReport = async (entity = selectedEntity) => {
    const response = await getRepeatedStudentsReport(entity);
    console.log(response.data)
    setRepeated(response.data)
  }

  const fetchingReport = async (entity = selectedEntity) => {
    const response = await getGeneralReport(entity);

    console.log(response.data)
    setReport(response.data.report)
    setGeneral(response.data.general)
  }

  const fetchingYearlyReport = async (entity = selectedEntity) => {
    const response = await getYearlyReport(entity);
    console.log(response.data)
    setYearlyReport(response.data)
  }

  const fetchingInfo = async (entity = selectedEntity) => {
    const data = await getStateReport(entity)
    setReport2(data.data)
  }

  const fetchingEntities = async () => {
    const data = await getEntities(0, 10000)
    setEntities(data.data.documents)
  }

  const handleSelectedEntity = async (e) => {
    fetchingRepeatedStudentsReport(e.target.value)
    setSelectedEntity(e.target.value)
    fetchingInfo(e.target.value)
    fetchingYearlyReport(e.target.value)
    fetchingReport(e.target.value)
  }

  useEffect(() => {
    fetchingRepeatedStudentsReport()
    fetchingInfo()
    fetchingEntities()

  }, []);

  useEffect(() => {

    fetchingYearlyReport()
    fetchingReport()

  }, []);




  return (
    <>
      {
        user.role.role <= 2 ?
          <div>
            <div>
              Selecciona Ente:
            </div>
            <select onChange={handleSelectedEntity}>
              <option value="" disabled selected>Seleccione el Ente</option>
              <option value="TODOS" >
                TODOS
              </option>
              {
                entities.map((item) => {
                  return <option key={item.name} value={item.name} >
                    {item.name}
                  </option>
                })
              }

            </select>
          </div>
          :
          ""
      }
      <br />
      <div>
        <h3>
          Reporte Mensual
        </h3>
      </div>
      <div>
        <table className="responsive-table-reportes">
          <thead>
            <tr>
              {
                yearlyReport.map((element) => {
                  return <th colSpan={3}>
                    {element.month}
                  </th>
                })
              }
            </tr>
            <tr style={{ fontSize: '10px', padding: '0px' }}>
              {
                yearlyReport.map((element) => {
                  return <>
                    <th style={{ backgroundColor: 'rgba(54, 163, 235, 0.94)' }}>
                      M
                    </th>
                    <th style={{ backgroundColor: 'rgba(247, 51, 94, 0.92)' }}>
                      F
                    </th>
                    <th>
                      T
                    </th>
                  </>
                })
              }
            </tr>
          </thead>
          <tbody>

            <tr style={{ fontSize: '10px', padding: '0px' }}>
              {
                yearlyReport.map((element) => {
                  return <>
                    <td >
                      {element.m}
                    </td>
                    <td >
                      {element.f}
                    </td>
                    <td >
                      {element.total}
                    </td>
                  </>
                })
              }
            </tr>


          </tbody>
        </table>
        <table className="responsive-table-total-mensual">
          <tr >
            <th colSpan={3}>
              Acumulado Total
            </th>
          </tr>
          <tr>
            <td>
              M
            </td>
            <td>
              F
            </td>
            <td>
              T
            </td>
          </tr>
          <tr>
            <td >
              {general.m}
            </td>
            <td>
              {general.f}
            </td>
            <td>
              {general.total}
            </td>
          </tr>
        </table>

      </div>
      <br />
      <br />
      <br />
      <br />
      <GeneralReport report={report} general={general} />



      <div>

        <br />
        <br />
        <div>
          <h3>
            Reporte por Municipios y Parroquias atendidas
          </h3>
        </div>


        <table className="report-table-2">


          <tr>
            {report2.municipios.map((item) => {
              return (
                <tr>
                  <td>
                    {item.name.label} <b>{item.students}</b>
                  </td>




                  <td>
                    {item.parish.map((element) => {
                      return (

                        <tr>
                          <td className="parish">
                            {element.name}
                          </td>
                          <td className="parish">
                            {element.students}
                          </td>
                        </tr>

                      )
                    })}
                  </td>

                </tr>
              )
            })}

          </tr>
        </table>
      </div>

      <br />
      <br />
      <div>
        <h3>
          Participantes de diversas actividades:
        </h3>
      </div>
      <div>
        <table className="responsive-table-reportes">
          <thead>
            <tr>
              <th>
                Cédula
              </th>
              <th>
                Nombre
              </th>
              <th>
                Apellido
              </th>
              <th>
                Cantidad de Veces
              </th>
            </tr>
          </thead>
          <tbody>
            {repeated.map((element) => {
              return (
                <tr>
                  <td>
                    {element.student.ci}
                  </td>
                  <td>
                    {element.student.name}
                  </td>
                  <td>
                    {element.student.lastName}
                  </td>
                  <td>
                    {element.times}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>

    </>
  )
}
