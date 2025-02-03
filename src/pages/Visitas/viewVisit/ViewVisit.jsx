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
    <div className="visit-details-modal">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>
          Detalles de la Visita
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleDetailsClose() }}>
            <IconButton type="button" size="small" aria-label="edit" >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div>
        <div>
          Nombre de la actividad: {selectedVisit.activityName}
        </div>
        <div>
          Entidad encargada: {selectedVisit.entity.name}
        </div>
        <div>
          Sitio donde se Realizo la actividad: {selectedVisit.activityPlace.name}
        </div>
      </div>

      <div>
        <div>
          Tipo de Actividad: {selectedVisit.activity.name}
        </div>
        <div>
          {selectedVisit.subActivity}
        </div>
      </div>

      <div>
        <div>
          Fecha de Realización de la Actividad: {DateTime.fromISO(selectedVisit.activityDate).toFormat('dd-LL-yyyy')}
        </div>
        <div>
          Fecha de Cargada la actividad: {DateTime.fromISO(selectedVisit.createdAt).toFormat('dd-LL-yyyy')}
        </div>
      </div>

      <div>
        Estudiantes:
        <div>
          Atendidos: {selectedVisit.students}
        </div>
        <div>
          Esperados: {selectedVisit.studentsExpected}
        </div>
      </div>

      <div>
        Profesores:
        <div>
          Atendidos: {selectedVisit.teachers}
        </div>
        <div>
          Esperados: {selectedVisit.teachersExpected}
        </div>
      </div>


      <button onClick={downloadInfo}>
        Descargar Excel
      </button>

    </div>
  )
}
