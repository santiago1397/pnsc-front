import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateVisit from './createVisit/CreateVisit.jsx';
import DeleteVisit from './deleteVisit/DeleteVisit.jsx';
import { getEntities } from '../../api/entity.js'

export default function Visitas() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [activities, setActivities] = useState([])

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingVisits()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingVisits()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingVisits()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingVisits = async () => {
    try {
      /* const data = await getEntities()
      setEntities(data.data)
      console.log(data) */
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
        <div>
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
          ACTIVIDADES REALIZADAS
        </h1>
        <button onClick={() => setOpenCreate(true)}>
          Crear Actividad
        </button>
      </div>
      <div className="activity-list">
        <div className="pagination">
          Pagination
        </div>

        {
          activities.map((element) => {
            return <div className="activity-item">
              <div>
                {element.name}
              </div>
              <div>
                {element.acronim}
              </div>
              <div>
                {/* <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setUserDetails(item) }}>
                  <IconButton size="small" aria-label="edit" >
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                </Tooltip> */}
                <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setUserDetails(item) }}>
                  <IconButton size="small" aria-label="delete" >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          })
        }

       

        <div className="pagination">
          Pagination
        </div>
      </div>
    </div>
  )
}
