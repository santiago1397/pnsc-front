import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import './createSchedule.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getCategories } from '../../../api/category.js'
import { getEntities } from '../../../api/entity.js';
import { createSchedule } from '../../../api/schedule.js';
import { getActivities } from '../../../api/activities.js';
import Dpt from '../../../components/dpt/Dpt.jsx'
import { useAuth } from "../../../context/authContext";


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
    name: 'schools',
    defaultValue: [{}],
  });
  const { user } = useAuth();

  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [entities, setEntities] = useState([])
  const [flag, setFlag] = useState({})


  const fetchCategories = async () => {
    const data = await getActivities(0, 1000)
    setCategories(data.data.documents)
  }

  const fetchEntities = async () => {
    const data = await getEntities()
    console.log(data.data)
    setEntities(data.data)

    const lmao = data.data.findIndex((element) => element.name == user.entity.name)
    setValue("entityAux", lmao)
    setValue("entity", data.data[lmao])

  }

  const handleEntitySelect = async (e) => {
    var index = parseInt(e.target.value)
    console.log(entities[index])
    setValue("entity", {
      _id: entities[index]._id,
      name: entities[index].name,
      acronim: entities[index].acronim
    })
  }

  const handleActivitySelect = (e) => {
    const lmao = categories.filter((element) => element.name == e.target.value)
    setValue("activity", lmao[0])
    setSubCategories(lmao[0].subcategories)
  }


  useEffect(() => {
    fetchCategories()
    fetchEntities()
  }, [])

  const onSubmit = async (data) => {
    try {
      console.log(data)

      const res = await createSchedule(data)
      console.log(res)

      ToastSuccess(res.data)

      handleCreateClose()
      /* reset() */
    } catch (error) {
      console.log(error)

      ToastError("error al agendar visita")
    }

  }

  return (
    <div className="schedule-place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="schedule-top">
          <h2>
            AGENDAR NUEVA RUTA
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleCreateClose() }}>
              <IconButton type="button" size="small" aria-label="edit" >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="schedule-group">

          <div className="schedule-name-input">
            <label>
              Nombre de la actividad:
            </label>
            <div>
              <input className="add-input-2" minLength={5} maxLength={70} type="text" placeholder='nombre de la actividad'
                {...register("activityName", {
                  required: 'ingrese nombre de la actividad',
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                    message: 'Solo se permiten letras, espacios y numeros'
                  }
                })}
              />
              <div>
                {errors.activityName && <span className="error-message">{errors.activityName.message}</span>}
              </div>

            </div>
          </div>

          <div className="adduser-input">
            <label>
              Fecha que se realizara la actividad:
            </label>
            <div>
              <input className="add-input-2" type="date"
                {...register("activityDate", {
                  required: 'ingrese la fecha en que se realizara',
                })}
              />
              <div>
                {errors.activityDate && <span className="error-message">{errors.activityDate.message}</span>}
              </div>

            </div>
          </div>

          <div className="category-style">
            <div className="adduser-input">
              <label>
                Categoria:
              </label>
              <div>
                <select className="" {...register("activityAux", {
                  required: 'seleccione la categoria',
                  pattern: {}
                })}

                  onChange={handleActivitySelect}>
                  <option value="" disabled selected>Seleccione la categoría</option>
                  {
                    categories.map((item) => {
                      return <option key={item.name} value={item.name} >
                        {item.name}
                      </option>
                    })
                  }

                </select>
                <div>
                  {errors.activityAux && <span className="error-message">{errors.activityAux.message}</span>}
                </div>

              </div>
            </div>
            {subcategories.length > 0 ?
              <div className="adduser-input">
                <label>
                  Sub-Categoria:
                </label>
                <div>
                  <select className="" {...register("subActivity", {
                    required: 'seleccione la categoria',
                    pattern: {}
                  })}>
                    <option value="" disabled selected>Seleccione la categoría</option>
                    {
                      subcategories.map((item) => {
                        return <option key={item.name} value={item.name} >
                          {item.name}
                        </option>
                      })
                    }

                  </select>
                  <div>
                    {errors.subActivity && <span className="error-message">{errors.subActivity.message}</span>}
                  </div>

                </div>
              </div>
              : ""}
          </div>

          {user.role.role <= 2 ?
            <div className="adduser-input">
              <label>
                Ente: <span className="required-thing">*</span>
              </label>
              <div>
                <select className="" {...register("entityAux", {
                  required: 'seleccione el ente',
                  pattern: {}
                })} onChange={(e) => handleEntitySelect(e)}>
                  <option value="" disabled selected>Seleccione el Ente</option>
                  {
                    entities.map((item, index) => {
                      return <option key={item.name} value={index} >
                        {item.name}
                      </option>
                    })
                  }
                </select>
                <div>
                  {errors.entityAux && <span className="error-message">{errors.entityAux.message}</span>}
                </div>

              </div>
            </div>
            : ""}

          <div className="adduser-input">
            <label>
              Cantidad de estudiantes a atender:
            </label>
            <div>
              <input className="add-input-2" type="number" min="1" max="5000" placeholder='cantidad de estudiantes'
                {...register("studentSpected", {
                  required: 'ingrese la cantidad de estudiantes esperados',
                  pattern: {
                    value: /^[0-9]+$/,  // Esta regex solo permite números enteros
                    message: 'Solo se permiten números'
                  }
                })}
              />
              <div>
                {errors.studentSpected && <span className="error-message">{errors.studentSpected.message}</span>}
              </div>

            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="site-group">
          <div>
            Datos del sitio de la actividad:
          </div>

          <div className="adduser-input">
            <div>
              <Dpt
                estado={"activityPlace.state"}
                municipio={"activityPlace.municipality"}
                parroquia={"activityPlace.parish"}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          </div>

          <div className="adduser-input">
            <label>
              Nombre del sitio de la actividad:
            </label>
            <div>
              <input className="add-input-2" type="text" placeholder='nombre del sitio de la actividad'
                minLength={5}
                maxLength={50}
                {...register("activityPlace.name", {
                  required: 'ingrese el nombre del lugar de la actividad',
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                    message: 'Solo se permiten letras, espacios y numeros'
                  }
                })}
              />
              <div>
                {errors?.activityPlace?.name && <span className="error-message">{errors?.activityPlace?.name?.message}</span>}
              </div>

            </div>
          </div>

          <div className="adduser-input">
            <label>
              Dirección del sitio de la actividad:
            </label>
            <div>
              <input className="add-input-2" type="text" placeholder='dirección del lugar'
                minLength={5}
                maxLength={80}
                {...register("activityPlace.address", {
                  required: 'ingrese direccion del lugar de la actividad',
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ,\s]+$/, // Regex pattern for letters, numbers and spaces only
                    message: 'Solo se permiten letras, espacios y numeros'
                  }
                })}
              />
              <div>
                {errors?.activityPlace?.address && <span className="error-message">{errors?.activityPlace?.address.message}</span>}
              </div>

            </div>
          </div>


        </div>

        <div className="divider"></div>

        <div className="adding-schools">
          <div>
            Instituciones Educativas a atender:
          </div>

          <button type="button" onClick={() => append({})}>
            Agregar+
          </button>
        </div>


        {fields.map((item, index) => (
          <div className="school-section" key={index}>

            <div className="school-section-left">

              <div>
                Datos de la institución:
              </div>
              <div>
                <Dpt
                  estado={`schools.${index}.state`}
                  municipio={`schools.${index}.municipality`}
                  parroquia={`schools.${index}.parish`}
                  setValue={setValue}
                  getValues={getValues}
                  flag={flag}
                />
              </div>

              <div className="school-name-input">
                <label>
                  Nombre de la Institución:
                </label>
                <div>
                  <input
                    minLength={5}
                    maxLength={50}
                    {...register(`schools.${index}.name`, {
                      required: 'ingrese el nombre de la escuela',
                      pattern: {
                        value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, // Regex pattern for letters, numbers and spaces only
                        message: 'Solo se permiten letras, espacios y numeros'
                      }
                    })} />
                  <div>
                    {errors?.schools?.[index]?.name && <span className="error-message">{errors?.schools?.[index]?.name.message}</span>}
                  </div>
                </div>
              </div>

              <div className="school-name-input">
                <label>
                  Tipo de institución:
                </label>
                <select className="" {...register(`schools.${index}.type`, {
                  required: 'seleccione el tipo de institución',
                  pattern: {}
                })}>
                  <option value="" disabled selected>Seleccione el tipo</option>
                  <option key="private"  >Privado</option>
                  <option key="public"  >Público</option>
                </select>
                <div>
                  {errors?.schools?.[index]?.type && <span className="error-message">{errors?.schools?.[index]?.type.message}</span>}
                </div>
              </div>
            </div>

            <button type="button" onClick={() => remove(index)}>
              Eliminar
            </button>
          </div>
        ))}






        <button className="add-activity-btn">
          AGREGAR
        </button>

      </form>
    </div>
  )
}
