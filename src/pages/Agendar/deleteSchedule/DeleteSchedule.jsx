import React from 'react'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteSchedule } from '../../../api/schedule.js';

export default function DeleteSchedule({ selectedSchedule, handleDeleteClose }) {

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
    <div className="schedule-place-modal">
      <div className="delete-dialog">
        <div>
          <h2>
            ¿Seguro que desea borrar esta visita agendada?
          </h2>
        </div>
        <div className="delete-options">
          <button className="yes-button" onClick={deleting}>
            Si
          </button>
          <button className="no-button" onClick={() => handleDeleteClose()}>
            No Borrar
          </button>
        </div>

      </div>
    </div>
  )
}
