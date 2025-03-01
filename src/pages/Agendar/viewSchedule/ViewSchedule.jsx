import { useState, useEffect } from 'react'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from "luxon";

export default function ViewSchedule({ handleDetailsClose, selectedSchedule }) {


  return (
    <div className="schedule-place-modal">

      <div className="schedule-top">
        <h2>
          DETALLES DE LA ACTIVIDAD
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleDetailsClose() }}>
            <IconButton type="button" size="medium" aria-label="close" sx={{ color: 'red' }}>
              <CloseIcon fontSize="medium" />
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
              <b>Nombre de la actividad:</b> {selectedSchedule.activityName}
            </div>
            <div className="item">
              <b>Sitio de la actividad:</b> {selectedSchedule.activityPlace.name}
            </div>
            <div className="item">
              <b>Entidad encargada:</b> {selectedSchedule.entity.name}
            </div>
            <div className="item">
              <b>Fecha de la actividad:</b> {DateTime.fromISO(selectedSchedule.activityDate).toFormat('dd-LL-yyyy')}
            </div>
            <div className="item">
              <b>Fecha de planificada la actividad:</b> {DateTime.fromISO(selectedSchedule.createdAt).toFormat('dd-LL-yyyy')}
            </div>

          </div>

          <div className="view-details-left-bottom">
            <div>
              {selectedSchedule.category ?
                <div className="item">
                  <b>Categoría: </b>{selectedSchedule.category}
                </div> : ""}
            </div>
            <div>
              {selectedSchedule.subCategorylvl1 ?
                <div className="item">
                  <b>Sub-categoría 1: </b>{selectedSchedule.subCategorylvl1}
                </div> : ""}
            </div>
            <div>
              {selectedSchedule.subCategorylvl2 ?
                <div className="item">
                  <b>Sub-categoría 2: </b>{selectedSchedule.subCategorylvl2}
                </div> : ""}
            </div>
            <div>
              {selectedSchedule.subCategorylvl3 ?
                <div className="item">
                  <b>Sub-categoría 3: </b>{selectedSchedule.subCategorylvl3}
                </div> : ""}
            </div>

          </div>

        </div>

        <div className="view-details-right">
          <div>
            <div className="item">
              <b>Estudiantes esperados:</b> {selectedSchedule.studentSpected}
            </div>

            <div className="item">
              <b>Profesores esperados:</b> {selectedSchedule.teachersExpected}
            </div>

          </div>

        </div>






      </div>



    </div>
  )
}
