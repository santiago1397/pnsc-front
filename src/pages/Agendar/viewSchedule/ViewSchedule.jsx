import { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from "luxon";

export default function ViewSchedule({ handleDetailsClose, selectedSchedule }) {


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
          Nombre de la actividad: {selectedSchedule.activityName}
        </div>
        <div>
          Entidad encargada: {selectedSchedule.entity.name}
        </div>
        <div>
          Sitio donde se plantea realizar la actividad: {selectedSchedule.activityPlace.name}
        </div>
      </div>

      <div>
        <div>
          Tipo de Actividad: {selectedSchedule.category}
        </div>
        <div>
          {selectedSchedule.subCategorylvl1}
          {selectedSchedule.subCategorylvl2}
          {selectedSchedule.subCategorylvl3}
        </div>
      </div>

      <div>
        <div>
          Fecha que se realizara: {DateTime.fromISO(selectedSchedule.activityDate).toFormat('dd-LL-yyyy')}
        </div>
        <div>
          Fecha de planificada la actividad: {DateTime.fromISO(selectedSchedule.createdAt).toFormat('dd-LL-yyyy')}
        </div>
      </div>

      <div>
        Estudiantes:
        <div>
          Esperados: {selectedSchedule.studentSpected}
        </div>
      </div>

      <div>
        Profesores:
        <div>
          Esperados: {selectedSchedule.teachersExpected}
        </div>
      </div>


    </div>
  )
}
