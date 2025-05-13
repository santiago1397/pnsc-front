import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateVisit from './createVisit/CreateVisit.jsx';
import DeleteVisit from './deleteVisit/DeleteVisit.jsx';
import { DateTime } from "luxon";
import { getEntities } from '../../api/entity.js'
import { getVisits, getVisitsFull } from '../../api/visits.js';
import Pagination from '@mui/material/Pagination';
import { useAuth } from "../../context/authContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewVisit from './viewVisit/ViewVisit.jsx';

export default function Visitas() {

  const { user } = useAuth();


  //modals variables
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [visits, setVisits] = useState([])
  const [selectedVisit, setSelectedVisit] = useState()

  //admin options
  const [selectedEntity, setSelectedEntity] = useState("TODOS");
  const [entities, setEntities] = useState([]);

  //variables for pagination
  const [total, setTotal] = useState()
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  // Change page
  const paginate = (e, value) => {
    setCurrentPage(value)
    fetchingSchedules((value - 1) * postsPerPage, postsPerPage, selectedEntity)
    console.log(currentPosts)
  }

  const handleDetailsClose = async () => {
    setOpenDetails(false);
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingVisits(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleEditClose = async () => {
    setOpenEdit(false);
    fetchingVisits(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }
  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingVisits(0, postsPerPage, selectedEntity)
    setCurrentPage(1)
    /* const data = await getUsers(id)
    setFilteredUSers(data.data)
    setUsers(data.data) */
  }

  const handleEntityChange = async (e) => {
    setSelectedEntity(e.target.value)
    fetchingVisits(0, postsPerPage, e.target.value)
    setCurrentPage(1)
  }

  const fetchingEntities = async () => {
    try {
      const data = await getEntities(0, 10000)
      setEntities(data.data.documents)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchingVisits = async (skip = 0, limit = postsPerPage, entity = "TODOS") => {
    try {

      if (user.role.role <= 2 && entity != "TODOS") {
        console.log(entity)
        const data = await getVisitsFull(skip, limit, entity)
        setVisits(data.data.documents)
        setTotal(data.data.total)

        //si eres novato
      } else {
        const data = await getVisits(skip, limit)
        setVisits(data.data.documents)
        setTotal(data.data.total)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingVisits()
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
        <DeleteVisit handleDeleteClose={handleDeleteClose} selectedVisit={selectedVisit} />
      </Modal>

      <Modal
        open={openDetails}
        onClose={handleDetailsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ViewVisit handleDetailsClose={handleDetailsClose} selectedVisit={selectedVisit} />
      </Modal>


      <div className="activities-top">
        <h1>
          ACTIVIDADES CARGADAS
        </h1>
        {/* <button onClick={() => setOpenCreate(true)}>
          Reportar Actividad
        </button> */}
      </div>
      <div className="activity-list">
        <div className="options">


          <div >
            TOTAL: {total}
          </div>

          {user.role.role <= 2 ?
            <div>
              Seleccione Entidad:
              <select className=""
                onChange={handleEntityChange}
              >
                <option value="TODOS" selected>TODOS</option>
                {
                  entities.map((item, index) => {
                    return <option key={item.id} value={item.name} >
                      {item.name}
                    </option>
                  })
                }

              </select>
            </div>
            : ""}
        </div>


        <div className="table-wrapper"> 
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
                <th>estudiantes reportados</th>
                <th>estudiantes esperados</th>

                <th>opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                visits.map((element) => {
                  return <tr /* className="activity-item" */>
                    <td>
                      {DateTime.fromISO(element.activityDate).toUTC().toFormat('yyyy-LL-dd')}
                    </td>
                    <td>
                      {element.activityName}
                    </td>
                    <td>
                      {/* element.activity.name */}
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
                      {element.students}
                    </td>
                    <td>
                      {element.studentsExpected}
                    </td>
                    <td>
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDetails(true); setSelectedVisit(element) }}>
                        <IconButton size="small" aria-label="delete" >
                          <VisibilityIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {
                        user.role.role <= 2 ?
                          <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setSelectedVisit(element) }}>
                            <IconButton size="small" aria-label="delete" >
                              <DeleteIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                            </IconButton>
                          </Tooltip> : ""
                      }


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
              margin: '0 5px'
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
