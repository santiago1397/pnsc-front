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
    <div className="place-modal">
      <div >
        <div>
          <h2>
            ¿Seguro que desea borrar esta actividad?
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
          <button className="adduser-btn" onClick={handleDeleteClose}>
            No Borrar
          </button>
        </div>

      </div>
    </div>
  )
}
