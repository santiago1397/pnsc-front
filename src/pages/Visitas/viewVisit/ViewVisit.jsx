import { useState, useEffect } from 'react'
import "./viewVisit.css"
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from "luxon";
import { getVisitReport } from '../../../api/visits';

export default function ViewVisit({ handleDetailsClose, selectedVisit }) {

  const downloadInfo = async () => {
    try {
      const response = await getVisitReport(selectedVisit.entity.name, selectedVisit._id)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="schedule-place-modal">

      <div className="schedule-top">
        <h2>
          Detalles de la Visita
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleDetailsClose() }}>
            <IconButton type="button" size="small" aria-label="edit" sx={{ color: 'red' }} >
              <CloseIcon  fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="divider">
      </div>

      <div className="view-details-wrapper">

        <div className="view-details-left">
          <div className="view-details-left-top">
            <div className="item">
              <b>Nombre de la actividad:</b> {selectedVisit.activityName}
            </div>
            <div className="item">
              <b>Sitio de la actividad:</b> {selectedVisit.activityPlace.name}
            </div>
            <div className="item">
              <b>Entidad encargada:</b> {selectedVisit.entity.name}
            </div>
            <div className="item">
              <b>Fecha de la actividad:</b> {DateTime.fromISO(selectedVisit.activityDate).toUTC().toFormat('dd-LL-yyyy')}
            </div>
            <div className="item">
              <b>Fecha de planificada la actividad:</b> {DateTime.fromISO(selectedVisit.createdAt).toFormat('dd-LL-yyyy')}
            </div>

            <div className="item">
              <b>Estado del sitio de la actividad:</b> {selectedVisit.activityPlace.state.label}
            </div>
            <div className="item">
              <b>Municipio del sitio de la actividad:</b> {selectedVisit.activityPlace.municipality.label}
            </div>
            <div className="item">
              <b>Parroquia del sitio de la actividad:</b> {selectedVisit.activityPlace.parish.label}
            </div>

          </div>

          <div className="view-details-left-bottom">
            <div>
              {selectedVisit.category ?
                <div className="item">
                  <b>Categoría: </b>{selectedVisit.category}
                </div> : ""}
            </div>
            <div>
              {selectedVisit.subCategorylvl1 ?
                <div className="item">
                  <b>Sub-categoría 1: </b>{selectedVisit.subCategorylvl1}
                </div> : ""}
            </div>
            <div>
              {selectedVisit.subCategorylvl2 ?
                <div className="item">
                  <b>Sub-categoría 2: </b>{selectedVisit.subCategorylvl2}
                </div> : ""}
            </div>
            <div>
              {selectedVisit.subCategorylvl3 ?
                <div className="item">
                  <b>Sub-categoría 3: </b>{selectedVisit.subCategorylvl3}
                </div> : ""}
            </div>

          </div>

        </div>

        <div className="view-details-right">
          <div>
            <div className="item">
              <b>Estudiantes esperados:</b> {selectedVisit.studentsExpected}
            </div>

            <div className="item">
              <b>Estudiantes atendidos:</b> {selectedVisit.students}
            </div>

            <div className="item">
              <b>Profesores esperados:</b> {selectedVisit.teachersExpected}
            </div>

            <div className="item">
              <b>Profesores atendidos:</b> {selectedVisit.teachers}
            </div>

          </div>
          <div>
            <button className="download-excel" onClick={downloadInfo}>
              Descargar Excel
            </button>
          </div>

        </div>

      </div>

      



    </div>
  )
}
