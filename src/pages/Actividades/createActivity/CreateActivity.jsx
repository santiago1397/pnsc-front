import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import './createActivity.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createActivity } from '../../../api/activities.js';


// falta la funcion para cerrar el modal
export default function CreateActivity({ handleCreateClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, values },
  } = useForm({ mode: "onChange" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subcategories',
    defaultValue: [{}],
  });

  const onSubmit = async (data) => {
    try {
      const result = await createActivity(data)
      console.log(result)
      handleCreateClose()
      reset()
    } catch (error) {
      console.log(error)

      /* ToastError("error al crear semillero") */
    }

  }

  return (
    <div className="place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="activities-title">
          <h2>
            CREAR ACTIVIDAD
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleCreateClose() }}>
              <IconButton type="button" size="small" aria-label="edit" >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="activity-name-input">
          <label>
            Nombre Actividad:
          </label>
          <div>
            <div className="category-error">
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
            <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
              {...register("name", {
                required: 'ingrese nombre de la actividad',
                pattern: {
                  value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                  message: 'Solo se permiten letras, espacios y numeros'
                }
              })}
            />

          </div>
        </div>

        <div className="activity-desc-input">
          <label>
            Descripción:
          </label>
          <div>
            <div className="category-error">
              {errors.desc && <span className="error-message">{errors.desc.message}</span>}
            </div>
            <textarea className="add-input-2" maxLength={150} rows={5} type="text" placeholder='descripción de la actividad'
              {...register("desc", {
                pattern: {
                  value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                  message: 'Solo se permiten letras, espacios y numeros'
                }
              })}
            />


          </div>
        </div>

        <div className="add-subcategories-title">
          <div>
            Sub-Categorías:
          </div>
          <button className="add-subcategory" type="button" onClick={() => append({})}>
            Agregar Nueva
          </button>
        </div>

        {fields.map((item, index) => (
          <div className='subcategory-wrapper' key={index}>
            <div className="flex1">
              <label>
                Nombre de la subcategoría:
              </label>
              <div>
                <input {...register(`subcategories.${index}.name`, {
                  required: 'ingrese el nombre de la subcategoria',
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                    message: 'Solo se permiten letras, espacios y numeros'
                  }
                })} />
                <div className="category-error">
                  {errors?.subcategories?.[index]?.name && <span className="error-message">{errors?.subcategories?.[index]?.name.message}</span>}
                </div>
              </div>
            </div>

            <button type="button" onClick={() => remove(index)}>
              Eliminar
            </button>
          </div>
        ))}




        <button className="add-activity-btn">
          CREAR
        </button>

      </form>
    </div>
  )
}
