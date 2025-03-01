import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import { editEntity } from '../../../api/entity.js';
import CloseIcon from '@mui/icons-material/Close';
import './editEntity.css'


//necesito traer los valores por defecto
export default function EditEntity({ handleEditClose, selectedEntity }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, values },
    //necesito agregar los valores por defecto
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: selectedEntity.name,
      acronim: selectedEntity.acronim
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await editEntity(selectedEntity._id, data)

      handleEditClose()
      ToastSuccess("entidad editada exitosamente")
      reset()
    } catch (error) {
      console.log(error)

      /* ToastError("error al crear semillero") */
    }

  }


  return (
    <div className="schedule-place-modal">

      <div className="schedule-top">
        <h2>
          EDITAR ENTE:
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleEditClose() }}>
            <IconButton type="button" size="small" aria-label="edit" sx={{ color: 'red' }} >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="divider">
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="adduser-inputs">
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
              {errors.acronim && <span className="error-message">{errors.acronim.message}</span>}

            </div>
          </div>

        </div>


        <button className="adduser-btn">
          EDITAR
        </button>

      </form>
    </div>
  )
}
