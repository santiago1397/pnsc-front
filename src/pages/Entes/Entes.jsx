import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateEntity from './createEntity/CreateEntity.jsx';
import EditEntity from './editEntity/EditEntity.jsx'
import DeleteEntity from './deleteEntity/DeleteEntity.jsx';
import { getEntities } from '../../api/entity.js'

export default function Entes() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [entities, setEntities] = useState([])

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingEntities()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingEntities()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingEntities()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingEntities = async () => {
    try {
      const data = await getEntities()
      setEntities(data.data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingEntities()
  }, [])

  return (
    <div>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateEntity handleCreateClose={handleCreateClose} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditEntity handleEditClose={handleEditClose} />
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteEntity handleDeleteClose={handleDeleteClose} />
      </Modal>


      <div className="activities-top">
        <h1>
          ENTES
        </h1>
        <button onClick={() => setOpenCreate(true)}>
          Crear Entes
        </button>
      </div>
      <div className="activity-list">
        <div className="pagination">
          Pagination
        </div>

        <div>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acronimo</th>
                <th>Opciones</th>

              </tr>
            </thead>
            <tbody>
              {
                entities.map((element) => {
                  return <tr >
                    <td>
                      {element.name}
                    </td>
                    <td>
                      {element.acronim}
                    </td>
                    <td>
                      {/* <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setUserDetails(item) }}>
                  <IconButton size="small" aria-label="edit" >
                    <ModeEditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setUserDetails(item) }}>
                  <IconButton size="small" aria-label="delete" >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip> */}
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table >
        </div>





        <div className="pagination">
          Pagination
        </div>
      </div>
    </div>
  )
}