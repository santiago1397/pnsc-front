import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateUser from './createUser/CreateUser.jsx';
import EditUser from './editUser/EditUser.jsx'
import DeleteUser from './deleteUser/DeleteUser.jsx';
import { getUsers } from '../../api/users.js';

export default function Users() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [users, setUsers] = useState([])

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingUsers()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingUsers()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingUsers()
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data.data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingUsers()
  }, [])

  return (
    <div>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateUser handleCreateClose={handleCreateClose} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditUser handleEditClose={handleEditClose} />
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteUser handleDeleteClose={handleDeleteClose} />
      </Modal>


      <div className="activities-top">
        <h1>
          USUARIOS
        </h1>
        <button onClick={() => setOpenCreate(true)}>
          Crear Usuario
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
                <th>Nombres</th>
                <th>Correo</th>
                <th>Ente</th>
                <th>Opciones</th>

              </tr>
            </thead>
            <tbody>
              {
                users.map((element) => {
                  return <tr >
                    <td>
                      {element.name} {element.lastName}
                    </td>
                    <td>
                      {element.email}
                    </td>
                    <td>
                      {element.entity.acronim}
                    </td>
                    <td>
                      <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); }}>
                        <IconButton size="small" aria-label="edit" >
                          <ModeEditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); }}>
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
          Pagination
        </div>
      </div>
    </div>
  )
}
