import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateEntity from './createEntity/CreateEntity.jsx';
import EditEntity from './editEntity/EditEntity.jsx'
import DeleteEntity from './deleteEntity/DeleteEntity.jsx';
import { getEntities } from '../../api/entity.js'
import Pagination from '@mui/material/Pagination';


export default function Entes() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [entities, setEntities] = useState([])

  const [selectedEntity, setSelectedEntity] = useState()

  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetchingEntities((value - 1) * postsPerPage, postsPerPage)
  }

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingEntities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingEntities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingEntities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingEntities = async (skip = 0, limit = postsPerPage) => {
    try {
      const data = await getEntities(skip, limit)
      setEntities(data.data.documents)
      setTotal(data.data.total)
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
        <EditEntity handleEditClose={handleEditClose} selectedEntity={selectedEntity} />
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
        <div>
          <h1>
            ENTES
          </h1>
          <p className="description">
          </p>
        </div>
        <button className="add-button" onClick={() => setOpenCreate(true)}>
          Crear Entes
        </button>
      </div>

      <div className="activity-list">


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
                entities.map((element, index) => {
                  return <tr key={index}>
                    <td>
                      {element.name}
                    </td>
                    <td>
                      {element.acronim}
                    </td>
                    <td>
                      <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setSelectedEntity(element) }}>
                        <IconButton size="small" aria-label="edit" >
                          <ModeEditIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setUserDetails(item) }}>
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
          <Pagination sx={{
            '& .MuiPagination-ul': { justifyContent: 'center' },
            '& .MuiPaginationItem-root': { color: 'var(--iteractive-color)' },
            '& .Mui-selected': { backgroundColor: 'var(--iteractive-color) !important', color: 'black' },
            '& .MuiPaginationItem-page': {
              minWidth: 30,
              height: 30,
              borderRadius: '5px',
              margin: '0 5px',
            },
            '& .MuiPaginationItem-root:hover': { backgroundColor: '#eee', color: 'black' },
            '& .MuiPaginationItem-previousNext:hover': { backgroundColor: '#eee', color: 'var(--iteractive-color)' },
            '& .MuiPaginationItem-previousNext': {
              color: 'var(--iteractive-color)'
            }
          }}
            count={Math.ceil(total / postsPerPage)}
            page={currentPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  )
}
