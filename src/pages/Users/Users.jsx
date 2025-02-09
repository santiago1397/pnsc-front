import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateUser from './createUser/CreateUser.jsx';
import EditUser from './editUser/EditUser.jsx'
import DeleteUser from './deleteUser/DeleteUser.jsx';
import { getUsers, getUsersFull } from '../../api/users.js';
import { useAuth } from "../../context/authContext";
import { getEntities } from '../../api/entity.js'

import Pagination from '@mui/material/Pagination';

export default function Users() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [users, setUsers] = useState([])

  const [selectedUser, setSelectedUser] = useState()

  //admin options
  const { user } = useAuth();
  const [selectedEntity, setSelectedEntity] = useState("TODOS");
  const [entities, setEntities] = useState([]);

  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetchingUsers((value - 1) * postsPerPage, postsPerPage, selectedEntity)
  }

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingUsers(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingUsers(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingUsers(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const handleEntityChange = async (e) => {
    setSelectedEntity(e.target.value)
    fetchingUsers(0, postsPerPage, e.target.value)
    setCurrentPage(1)
  }

  const fetchingEntities = async () => {
    try {
      const data = await getEntities(0,10000)
      setEntities(data.data.documents)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchingUsers = async (skip = 0, limit = postsPerPage, entity = "TODOS") => {
    try {
      //si eres super user
      if (user.role.role <= 2 && entity != "TODOS") {
        console.log(entity)
        const data = await getUsersFull(skip, limit, entity)
        setUsers(data.data.documents)
        setTotal(data.data.total)

        //si eres novato
      } else {
        const data = await getUsers(skip, limit)
        setUsers(data.data.documents)
        setTotal(data.data.total)
        console.log(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingUsers()
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
        <CreateUser handleCreateClose={handleCreateClose} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditUser selectedUser={selectedUser} handleEditClose={handleEditClose} />
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteUser user={selectedUser} handleDeleteClose={handleDeleteClose} />
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

        {user.role.role <= 2 ?
          <div>
            Seleccione Entidad:
            <select className=""
              onChange={handleEntityChange}
            >
              <option value="TODOS" selected>TODOS</option>
              {
                entities.map((item, index) => {
                  return <option key={item.id} value={item._id} >
                    {item.name}
                  </option>
                })
              }

            </select>
          </div>
          : ""}



        <div className="pagination">
          <Pagination count={Math.ceil(total / postsPerPage)} page={currentPage} onChange={paginate} />
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
                users ? users.map((element, index) => {
                  return <tr key={index}>
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
                      <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setSelectedUser(element) }}>
                        <IconButton size="small" aria-label="edit" >
                          <ModeEditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setSelectedUser(element) }}>
                        <IconButton size="small" aria-label="delete" >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                })
                  : ""
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
