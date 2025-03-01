import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateActivity from './createActivity/CreateActivity.jsx';
import EditActivity from './editActivity/EditActivity.jsx'
import DeleteActivity from './deleteActivity/DeleteActivity.jsx';
import './actividades.css'
import { getActivities } from '../../api/activities.js'
import Pagination from '@mui/material/Pagination';
import CreateCategory from './createActivity/CreateCategory.jsx';
import EditCategory from './editActivity/EditCategory.jsx';
import { getCategories } from '../../api/category.js';



export default function Actividades() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState()

  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetchingActivities((value - 1) * postsPerPage, postsPerPage)
    console.log(currentPosts)
  }

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingActivities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingActivities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingActivities()
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const fetchingActivities = async (skip = 0, limit = postsPerPage) => {
    try {
      const data = await getCategories(skip, limit)
      setActivities(data.data.documents)
      setTotal(data.data.total)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingActivities()
  }, [])


  return (
    <div>
      <Modal
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateCategory handleCreateClose={handleCreateClose} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditCategory activity={selectedActivity} handleEditClose={handleEditClose} />
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DeleteActivity activity={selectedActivity} handleDeleteClose={handleDeleteClose} />
      </Modal>



      <div className="activities-top">
        <div>
          <h1>
            CATEGORÍAS
          </h1>
          <p className="description">
          </p>
        </div>
        <button className="add-button" onClick={() => setOpenCreate(true)}>
          Crear categoría
        </button>
      </div>

      <div className="activity-list">


        <div>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Opciones</th>

              </tr>
            </thead>
            <tbody>
              {activities.map((element, index) => {
                return <tr key={index}>
                  <td>
                    {element.name}
                  </td>
                  <td>
                    <Tooltip title="Boton de Modificar" onClick={(e) => { e.stopPropagation(); setOpenEdit(true); setSelectedActivity(element) }}>
                      <IconButton size="small" aria-label="edit" >
                        <ModeEditIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); console.log(element); setSelectedActivity(element) }}>
                      <IconButton size="small" aria-label="delete" >
                        <DeleteIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              })}
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
