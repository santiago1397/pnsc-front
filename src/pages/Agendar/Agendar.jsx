import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateSchedule from './createSchedule/CreateSchedule.jsx';
/* import EditEntity from './editEntity/EditEntity.jsx' */
import DeleteSchedule from './deleteSchedule/DeleteSchedule.jsx';
import { getSchedules } from '../../api/schedule.js'
import { DateTime } from "luxon";
import Pagination from '@mui/material/Pagination';
import { useAuth } from "../../context/authContext";
import "./agendar.css"

export default function Agendar() {

  const { user } = useAuth();


  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [schedules, setSchedules] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState()

  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetchingSchedules((value - 1) * postsPerPage, postsPerPage)
    console.log(currentPosts)
  }


  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingSchedules()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingSchedules()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }


  const fetchingSchedules = async (skip = 0, limit = postsPerPage) => {
    try {
      const data = await getSchedules(skip, limit)
      console.log(
        data.data.documents
      )
      setSchedules(data.data.documents)
      setTotal(data.data.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingSchedules()
  }, [])

  return (
    <div>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateSchedule handleCreateClose={handleCreateClose} />
      </Modal>

      {/* <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditEntity handleEditClose={handleEditClose} />
      </Modal> */}

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteSchedule
          selectedSchedule={selectedSchedule}
          handleDeleteClose={handleDeleteClose}
        />
      </Modal>


      <div className="activities-top">
        <h1>
          ACTIVIDADES PROGRAMADAS
        </h1>
        <button onClick={() => setOpenCreate(true)}>
          Agendar Ruta
        </button>
      </div>
      <div className="activity-list">
        <div className="pagination">
          <Pagination count={Math.ceil(total / postsPerPage)} page={currentPage} onChange={paginate} />
        </div>

        <div>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>fecha</th>
                <th>escuela</th>
                <th>nombre de la actividad</th>
                <th>categoría</th>
                <th>lugar de la actividad</th>
                {
                  user.role.role <= 2 ?
                    <th>
                      entidad
                    </th> : ""
                }
                <th>estado</th>
                <th>municipio</th>
                <th>parroquia</th>
                <th>direccion</th>
                <th>estudiantes</th>
                <th>opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                schedules.map((element, index) => {
                  return <tr /* className="schedule-item" */ key={index}>
                    <td>
                      {DateTime.fromISO(element.activityDate).toFormat('yyyy-LL-dd')}
                    </td>
                    <td>
                      {element.schools[0]?.name}
                    </td>
                    <td>
                      {element.activityName}
                    </td>
                    <td>
                      {element.activity.name}
                    </td>
                    <td>
                      {element.activityPlace.name}
                    </td>
                    {
                      user.role.role <= 2 ?
                        <td>
                          {element.entity.name}
                        </td> : ""
                    }
                    <td>
                      {element.activityPlace.state.label}
                    </td>
                    <td>
                      {element.activityPlace.municipality.label}
                    </td>
                    <td>
                      {element.activityPlace.parish.label}
                    </td>
                    <td>
                      {element.activityPlace.address}
                    </td>
                    <td>
                      {element.studentSpected}
                    </td>
                    <td>
                      {/* <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setUserDetails(item) }}>
                  <IconButton size="small" aria-label="edit" >
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                </Tooltip> */}
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setSelectedSchedule(element) }}>
                        <IconButton size="small" aria-label="delete" >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
