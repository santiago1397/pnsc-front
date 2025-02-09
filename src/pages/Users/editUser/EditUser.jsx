import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getEntities } from '../../../api/entity.js';
import { getRoles } from '../../../api/roles.js';
import { useAuth } from "../../../context/authContext";
import { editUser } from '../../../api/users.js';


//necesito traer los valores por defecto
export default function EditActivity({ selectedUser, handleEditClose }) {
  const [entities, setEntities] = useState([])
  const [roles, setRoles] = useState([])
  const { user } = useAuth();

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
      name: selectedUser.name,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      role: selectedUser.role._id,
      entity: selectedUser.entity._id,
      phone: selectedUser.phone,

    }

  });


  const fetchEntities = async () => {
    const data = await getEntities(0, 10000)
    console.log(data.data)
    setEntities(data.data.documents)

    /* console.log(user)

    const lmao = data.data.findIndex((element) => element.name == selectedUser.entity.name)
    console.log(lmao)

    setValue("entityAux", 3)
    setValue("entity", data.data[lmao]) */

  }

  const fetchRoles = async () => {
    const data = await getRoles()
    console.log(data.data)
    setRoles(data.data)

  }

  useEffect(() => {
    fetchEntities()
    fetchRoles()

  }, [])

  const onSubmit = async (data) => {
    try {

      const res = await editUser(selectedUser._id, data)

      console.log(res.data)

      ToastSuccess("usuario editado correctamente")
      handleEditClose()
      reset()
    } catch (error) {
      console.log(error)

      ToastError("error al editar semillero")
    }

  }

  useEffect(() => {
    if (entities.length > 0) {
      // Set the default value dynamically
      setValue('entity', selectedUser.entity._id);  // Or set to a specific _id if needed
    }
  }, [entities, setValue]);

  useEffect(() => {
    if (roles.length > 0) {
      // Set the default value dynamically
      setValue('role', selectedUser.role._id);  // Or set to a specific _id if needed
    }
  }, [roles, setValue]);


  return (
    <div className="place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="activities-title">
          <h2>
            EDITAR USUARIO
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleEditClose() }}>
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
              <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
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
              <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
                {...register("lastName", {
                  required: 'ingrese apellido del usuario',
                })}
              />
              {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
            </div>
          </div>



          <div className="adduser-input">
            <label>
              Correo: <span className="required-thing">*</span>
            </label>
            <div>
              <input className="add-input-2" maxLength={50} type="email" placeholder='nombre de la actividad'
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
            })} >
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
            user.role.role <= 2 ?
              <div>
                <div>
                  Seleccione Ente
                </div>

                <select className="entity-select" {...register("entity", {
                  required: 'seleccione el ente',
                  pattern: {}
                })} >

                  <option value="" disabled selected>Seleccione el Ente</option>
                  {
                    entities.map((item, index) => {
                      return <option key={item._id} value={item._id} >
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
                <input className="add-input-2" maxLength={11} type="number" placeholder='nombre de la actividad'
                  {...register("phone", {
                    required: 'ingrese telefono',
                  })}
                />
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>
            </div>


          </div>

          <button className="adduser-btn">
            EDITAR
          </button>

        </div>

      </form>
    </div>
  )
}
