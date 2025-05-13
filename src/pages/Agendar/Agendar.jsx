import React, { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CreateSchedule from './createSchedule/CreateSchedule.jsx';
/* import EditEntity from './editEntity/EditEntity.jsx' */
import DeleteSchedule from './deleteSchedule/DeleteSchedule.jsx';
import { getSchedules, getSchedulesFull } from '../../api/schedule.js'
import { DateTime } from "luxon";
import Pagination from '@mui/material/Pagination';
import { useAuth } from "../../context/authContext";
import { getEntities } from '../../api/entity.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./agendar.css"
import ViewSchedule from './viewSchedule/ViewSchedule.jsx';
import CreateVisit from './createVisit/CreateVisit.jsx';
import { getPdfReport } from '../../api/schedule.js';

export default function Agendar() {

  const { user } = useAuth();


  const [openLoad, setOpenLoad] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [schedules, setSchedules] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState()


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
  }

  const handleLoadClose = async () => {
    setOpenLoad(false);
    fetchingSchedules(0, postsPerPage, selectedEntity)
    setCurrentPage(1)

  }

  const handleCreateClose = async () => {
    setOpenCreate(false);
    fetchingSchedules(0, postsPerPage, selectedEntity)
    setCurrentPage(1)

  }

  const handleDeleteClose = async () => {
    setOpenDelete(false);
    fetchingSchedules(0, postsPerPage, selectedEntity)
    setCurrentPage(1)

  }

  const handleEntityChange = async (e) => {
    setSelectedEntity(e.target.value)
    fetchingSchedules(0, postsPerPage, e.target.value)
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

  const fetchingSchedules = async (skip = 0, limit = postsPerPage, entity = "TODOS") => {
    try {

      if (user.role.role <= 2 && entity != "TODOS") {
        console.log(entity)
        const data = await getSchedulesFull(skip, limit, entity)
        setSchedules(data.data.documents)
        setTotal(data.data.total)

        //si eres novato
      } else {
        const data = await getSchedules(skip, limit)
        setSchedules(data.data.documents)
        setTotal(data.data.total)
        console.log(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchingSchedules()
    fetchingEntities()
  }, [])

  return (
    <div className="schedule-background">

      <Modal
        open={openLoad}
        onClose={handleLoadClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <CreateVisit handleLoadClose={handleLoadClose} selectedSchedule={selectedSchedule} />
      </Modal>

      <Modal
        open={openDetails}
        onClose={handleDetailsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewSchedule handleDetailsClose={handleDetailsClose} selectedSchedule={selectedSchedule} />
      </Modal>


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
        <div>
          <h1>
            ACTIVIDADES PROGRAMADAS
          </h1>
          <p className="description">
            Bienvenido al módulo de actividades programadas. Añade tus actividades y consulta tu agenda para alcanzar tus metas.
          </p>
        </div>

        <button className="add-button" onClick={() => setOpenCreate(true)}>
          Programar Actividad
        </button>

      </div>
      <div className="activity-list">
        <div className="options"> 
          <button className="download-report-btn" onClick={async () => await getPdfReport(selectedEntity || user.entity.name)}>
            Descargar Reporte
          </button>
          {user.role.role <= 2 ?
            <div className="entity-filter">
              Filtro:
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


        {/* <div className="pagination">
          <Pagination count={Math.ceil(total / postsPerPage)} page={currentPage} onChange={paginate} />
        </div> */}

        <div className="table-wrapper">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>fecha</th>
                {/* <th>escuela</th> */}
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
                      {DateTime.fromISO(element.activityDate).toUTC().toFormat('yyyy-LL-dd')}
                    </td>
                    {/* <td>
                      {element.schools[0]?.name}
                    </td> */}
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
                      {element.studentSpected}
                    </td>
                    <td>
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDetails(true); setSelectedSchedule(element) }}>
                        <IconButton size="small" aria-label="delete" >
                          <VisibilityIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Boton de Borrar" onClick={(e) => { e.stopPropagation(); setOpenDelete(true); setSelectedSchedule(element) }}>
                        <IconButton size="small" aria-label="delete" >
                          <DeleteIcon sx={{ color: 'var(--font-color)' }} fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td>
                      <button className="report-button" onClick={(e) => { e.stopPropagation(); setOpenLoad(true); setSelectedSchedule(element) }}>
                        REPORTAR
                      </button>
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
