import React from 'react'
import { useForm } from 'react-hook-form';
import './createUser.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from '../../../api/users.js';


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
      const result = await createUser(data)
      console.log(result)

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
            CREAR USUARIO
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleCreateClose() }}>
              <IconButton type="button" size="small" aria-label="edit" >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div>
          <div className="adduser-input">
            <label>
              Nombre: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
                {...register("name", {
                  required: 'ingrese nombre de la actividad',
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>

          <div className="adduser-input">
            <label>
              Apellido: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
                {...register("lastname", {
                  required: 'ingrese nombre de la actividad',
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>
        </div>


        <div>
          <div className="adduser-input">
            <label>
              Correo: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="email" placeholder='nombre de la actividad'
                {...register("email", {
                  required: 'ingrese nombre de la actividad',
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>

          <div className="adduser-input">
            <label>
              Contraseña: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="password" placeholder='nombre de la actividad'
                {...register("password", {
                  required: 'ingrese nombre de la actividad',
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>
        </div>



        <div>
          <select className="" {...register("role", {
            required: 'seleccione el rol',
            pattern: {}
          })}>
            <option value="" disabled selected>Seleccione el rol</option>
            <option key="1"  >Super Usuario</option>
            <option key="2"  >Presidente</option>
            <option key="3"  >Delegado</option>
          </select>


          <select className="" {...register("entity", {
            required: 'seleccione el Ente',
            pattern: {}
          })}>
            <option value="" disabled selected>Seleccione Ente</option>
            <option key="1"  >ABAE</option>
            <option key="2"  >FUNDACITE MÉRIDA</option>
            <option key="3"  >FUNDACITE DELTA AMACURO</option>
          </select>
        </div>


        <div>
          <div className="adduser-input">
            <label>
              Telefono: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={11} type="number" placeholder='nombre de la actividad'
                {...register("phone", {
                  required: 'ingrese nombre de la actividad',
                })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>

          
        </div>

        <button className="adduser-btn">
          AGREGAR
        </button>

      </form>
    </div>
  )
}
