import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateVisit from './createVisit/CreateVisit.jsx';
import DeleteVisit from './deleteVisit/DeleteVisit.jsx';
import { DateTime } from "luxon";
import { getEntities } from '../../api/entity.js'
import { getVisits } from '../../api/visits.js';
import Pagination from '@mui/material/Pagination';
import { useAuth } from "../../context/authContext";

export default function Visitas() {

  const { user } = useAuth();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [activities, setActivities] = useState([])

  const [visits, setVisits] = useState([])
  const [selectedVisit, setSelectedVisit] = useState()

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
    fetchingVisits()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingVisits()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingVisits()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingVisits = async (skip = 0, limit = postsPerPage) => {
    try {
      const data = await getVisits(skip, limit)
      console.log(
        data.data.documents
      )
      setVisits(data.data.documents)
      setTotal(data.data.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingVisits()
  }, [])

  return (
    <div>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateVisit handleCreateClose={handleCreateClose} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div >
          hola
        </div>
        {/* <EditEntity handleEditClose={handleEditClose} /> */}
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteVisit handleDeleteClose={handleDeleteClose} />
      </Modal>


      <div className="activities-top">
        <h1>
          VISITAS REALIZADAS
        </h1>
        <button onClick={() => setOpenCreate(true)}>
          Reportar Actividad
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
                <th>opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                visits.map((element) => {
                  return <tr /* className="activity-item" */>
                    <td>
                      {DateTime.fromISO(element.activityDate).toFormat('yyyy-LL-dd')}
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
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setUserDetails(item) }}>
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
