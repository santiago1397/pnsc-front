import React from 'react'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteActivity } from '../../../api/activities.js';

export default function DeleteActivity({ activity, handleDeleteClose }) {


  const deleting = async () => {
    try {
      const res = await deleteActivity(activity._id)
      console.log(res.status)

      ToastSuccess("actividad eliminada exitosamente")
      handleDeleteClose()

    } catch (error) {
      console.log(error)
      ToastError("Error al eliminar la actividad")
    }
  }


  return (
    <div className="schedule-place-modal">
      <div className="delete-dialog">
        <div>
          <h2>
            ¿Seguro que desea borrar esta categoría?
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
