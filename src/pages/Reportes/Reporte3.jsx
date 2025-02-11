import React, { useState, useEffect } from 'react'

import Pagination from '@mui/material/Pagination';
import { useAuth } from "../../context/authContext";
import { getEntitiesStatus } from '../../api/reports.js';
import { DateTime } from "luxon";

export default function Reporte3() {

  const { user } = useAuth();


  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [report, setReport] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState()


  //admin options
  const [sortBy, setSortBy] = useState("expired")


  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetching((value - 1) * postsPerPage, postsPerPage)
    console.log(currentPosts)
  }


  const handleFilterBy = async (e) => {
    setSortBy(e.target.value)
    fetching()
    setCurrentPage(1)
  }



  const fetching = async (skip = 0, limit = postsPerPage) => {
    try {

      const data = await getEntitiesStatus(skip, limit, sortBy)
      setReport(data.data.documents)
      setTotal(data.data.total)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetching()
  }, [])

  return (
    <div>


      <div className="activity-list">

        <h2>Status de Cargas</h2>

        <div>
          Ordenar Por:
          <select className=""
            onChange={handleFilterBy}
          >
            <option value="expired" selected>Visitas realizadas sin cargar</option>
            <option value="lastCon" >Ultima vez conectado</option>

          </select>
        </div>


        <div className="pagination">
          <Pagination count={Math.ceil(total / postsPerPage)} page={currentPage} onChange={paginate} />
        </div>

        <div>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Ente</th>
                <th>Ultima Conexión</th>
                <th>Ultima Visita Agendada</th>
                <th>Ultima Visita Cargada</th>
                <th>Visitas Planificadas Morosas</th>

              </tr>
            </thead>
            <tbody>
              {
                report.map((element, index) => {
                  return <tr /* className="schedule-item" */ key={index}>
                    <td>
                      {element.name}
                    </td>
                    <td>
                      {element.lastCon ? DateTime.fromISO(element.lastCon).toFormat('yyyy-LL-dd')  : "nunca"}
                    </td>
                    <td>
                      {element.lastScheduled ?  DateTime.fromISO(element.lastScheduled).toFormat('yyyy-LL-dd') : "nunca"}
                    </td>
                    <td>
                      {element.lastVisitLoaded ? DateTime.fromISO(element.lastVisitLoaded).toFormat('yyyy-LL-dd') : "nunca"}
                    </td>
                    <td>
                      {element.expired }
                    </td>

                  </tr>
                })
              }
            </tbody>
          </table >
        </div>




        <div className="pagination">
          <Pagination count={Math.ceil(total / postsPerPage)} page={currentPage} onChange={paginate} />
        </div>
      </div>
    </div>
  )
}
