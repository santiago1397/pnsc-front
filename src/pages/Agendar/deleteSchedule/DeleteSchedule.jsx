import React from 'react'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteSchedule } from '../../../api/schedule.js';

export default function DeleteSchedule({selectedSchedule, handleDeleteClose }) {

  const deleting = async () => {
    try {
      const res = await deleteSchedule(selectedSchedule._id)
      console.log(res.status)

      ToastSuccess("agenda eliminada exitosamente")
      handleDeleteClose()

    } catch (error) {
      console.log(error)
      ToastError("Error al eliminar la agenda")
    }
  }


  return (
    <div className="place-modal">
      <div >
        <div>
          <h2>
            ¿Seguro que desea borrar este Ente?
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleDeleteClose() }}>
              <IconButton type="button" size="small" aria-label="edit" >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div>
          <button className="adduser-btn" onClick={deleting}>
            Si
          </button>
          <button className="adduser-btn">
            No Borrar
          </button>
        </div>

      </div>
    </div>
  )
}
