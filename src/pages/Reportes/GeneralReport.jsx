import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function GeneralReport({ report, general }) {
  const data = {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: '# of Votes',
        data: [general.f, general.m],
        backgroundColor: [
          'rgba(247, 51, 94, 0.92)',
          'rgba(54, 163, 235, 0.94)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 20,
    },
  };


  return (
    <>
      <div>
        <h3>
          Reporte por Actividades
        </h3>
      </div>
      <div style={{ display: 'flex' }}>
        <div>

          <table className="responsive-table-reportes">
            {/* <thead>
              <tr>
                <th>Actividades</th>
                <th className="small">Cantidad de Profesores</th>
                <th className="small">Cantidad de Niñas</th>
                <th className="small">Cantidad de Niños</th>
                <th>Total</th>
              </tr>
            </thead> */}
            <tbody>

              {report.map((element) => {
                return <tr>
                  <td>
                    {element.name} <pre/>
                    {element.total}
                  </td>

                  {element.subs.length > 0 ?
                    element.subs.map((item) => {
                      return <tr>
                        <td>
                          {item.name} <pre/>
                          {item.total}
                        </td>

                        <td>
                          {item.subs.length > 0 ?
                            item.subs.map((item1) => {
                              return <tr>
                                <td>
                                  {item1.name} <pre/>
                                  {item1.total}
                                </td>
                                <td>
                                  {
                                    item1.subs.length > 0 ?
                                      item1.subs.map((item2) => {
                                        return <tr>
                                          <td>
                                            {item2.name} <pre/>
                                            {item2.total}
                                          </td>

                                        </tr>
                                      })
                                      : ""
                                  }
                                </td>


                              </tr>
                            })

                            : ""}
                        </td>
                      </tr>

                    })

                    : ""}


                </tr>
              })}



              {/* report.map((element) => {
                return <tr >
                  <td>{element.name}</td>
                  <td>{element.p}</td>
                  <td>{element.f}</td>
                  <td>{element.m}</td>
                  <td>{element.t}</td>
                </tr>
              }) */}
              {
                /* general && <tr>
                  <td><b>Total</b></td>
                  <td><b>{general.p}</b></td>
                  <td><b>{general.f}</b></td>
                  <td><b>{general.m}</b></td>
                  <td><b>{general.t}</b></td>
                </tr> */
              }


            </tbody>
          </table>
        </div>
        <div >
          <div style={{ position: 'relative', width: '320px', height: '300px' }}>
            <Pie data={data} options={options} />
          </div>

        </div>
      </div>

    </>
  )
}
