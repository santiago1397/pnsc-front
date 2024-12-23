import React from 'react'
import { useForm } from 'react-hook-form';
import './createEntity.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createEntity } from '../../../api/entity.js'


// falta la funcion para cerrar el modal
export default function CreateActivity({ handleCreateClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, values },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {

      const lmao = await createEntity(data)
      console.log(lmao)

      reset()
    } catch (error) {
      console.log(error)

      /* ToastError("error al crear semillero") */
    }

  }

  return (
    <div className="place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>
            CREAR NUEVO ENTE
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleCreateClose() }}>
              <IconButton type="button" size="small" aria-label="edit" >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="adduser-input">
          <label>
            Nombre del Ente: <span className="required-thing">*</span>
          </label>
          <div>
            <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
              {...register("name", {
                required: 'ingrese nombre del ente',
              })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}

          </div>
        </div>

        <div className="adduser-input">
          <label>
            Acronimo del Ente: <span className="required-thing">*</span>
          </label>
          <div>
            <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
              {...register("acronim", {
                required: 'ingrese acronimo del ente',
              })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}

          </div>
        </div>

        <button className="adduser-btn">
          AGREGAR
        </button>

      </form>
    </div>
  )
}
