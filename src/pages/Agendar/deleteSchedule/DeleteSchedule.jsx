import React from 'react'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DeleteActivity({handleDeleteClose}) {
  return (
    <div className="place-modal">
      <form >
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
          <button className="adduser-btn">
            Si
          </button>
          <button className="adduser-btn">
            No Borrar
          </button>
        </div>

      </form>
    </div>
  )
}
