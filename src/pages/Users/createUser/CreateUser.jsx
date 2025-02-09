import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './createUser.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from '../../../api/users.js';
import { getEntities } from '../../../api/entity.js';
import { getRoles } from '../../../api/roles.js';
import { useAuth } from '../../../context/authContext.jsx';


// falta la funcion para cerrar el modal
export default function CreateActivity({ handleCreateClose }) {
  const { user } = useAuth();
  const [entities, setEntities] = useState([])
  const [roles, setRoles] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, values },
  } = useForm({ mode: "onChange" });

  const fetchEntities = async () => {
    const data = await getEntities(0, 10000)
    setEntities(data.data.documents)
  }

  const fetchRoles = async () => {
    const data = await getRoles()
    setRoles(data.data)
  }

  useEffect(() => {
    fetchEntities()
    fetchRoles()
  }, [])

  const onSubmit = async (data) => {
    try {
      console.log(data)
      console.log(data.role)
      const result = await createUser(data)
      console.log(result)

      ToastSuccess("usuario creado exitosamente")
      reset()
      handleCreateClose()
    } catch (error) {
      console.log(error)

      ToastError("error al crear usuario")
    }
  }

  return (
    <div className="place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="activities-title">
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

        <div className="adduser-inputs">
          <div className="adduser-input">
            <label>
              Nombre: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="text" placeholder='nombre'
                {...register("name", {
                  required: 'ingrese nombre del usuario',
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
              <input className="add-input-2" maxLength={50} type="text" placeholder='apellido'
                {...register("lastName", {
                  required: 'ingrese apellido del usuario',
                })}
              />
              {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
            </div>
          </div>



          <div className="adduser-input">
            <label>
              Correo: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="email" placeholder='correo'
                {...register("email", {
                  required: 'ingrese email',
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
          </div>

          <div className="adduser-input">
            <label>
              Contraseña: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="password" placeholder='contraseña'
                {...register("password", {
                  required: 'ingrese contraseña',
                })}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
          </div>



          <div>
            <div>
              Seleccione el Rol
            </div>
            <select className="entity-select" {...register("role", {
              required: 'seleccione el rol',
              pattern: {}
            })} /* onChange={(e) => handleRoleSelect(e)} */>
              <option value="" disabled selected>Seleccione el rol</option>
              {
                roles.map((item, index) => {
                  return <option key={item._id} value={item._id} >
                    {item.name}
                  </option>
                })
              }
            </select>
            <div>
              {errors.role && <span className="error-message">{errors.role.message}</span>}
            </div>
          </div>

          {
            user.role.role <= 3 ?
              <div>
                <div>
                  Seleccione Ente
                </div>

                <select className="entity-select" {...register("entity", {
                  required: 'seleccione el ente',
                  pattern: {}
                })} /* onChange={(e) => handleEntitySelect(e)} */>

                  <option value="" disabled selected>Seleccione el Ente</option>
                  {
                    entities.map((item, index) => {
                      return <option key={item.name} value={item._id} >
                        {item.name}
                      </option>
                    })
                  }
                </select>
                <div>
                  {errors.entityAux && <span className="error-message">{errors.entityAux.message}</span>}
                </div>
              </div> : ""
          }



          <div>
            <div className="adduser-input">
              <label>
                Telefono: <span className="required-thing">*</span>
              </label>
              <div>
                <input className="add-input-2" maxLength={11} type="number" placeholder='telefono'
                  {...register("phone", {
                    required: 'ingrese telefono',
                  })}
                />
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>
            </div>


          </div>

          <button className="adduser-btn">
            AGREGAR
          </button>

        </div>
      </form>
    </div>
  )
}
