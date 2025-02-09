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
  const { user } = useAuth();

  const {
    watch,
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
    defaultValue: [{
      "entity": user.entity
    }],
  });

  const [categories, setCategories] = useState([])
  const [subcategorieslvl1, setSubCategorieslvl1] = useState([])
  const [subcategorieslvl2, setSubCategorieslvl2] = useState([])
  const [subcategorieslvl3, setSubCategorieslvl3] = useState([])



  const [entities, setEntities] = useState([])
  const [flag, setFlag] = useState({})

  const fetchCategories = async () => {
    const data = await getCategories(0, 1000)
    setCategories(data.data.documents)
  }

  const fetchEntities = async () => {
    const data = await getEntities(0, 10000)
    setEntities(data.data.documents)

    const lmao = data.data.findIndex((element) => element.name == user.entity)
    setValue("entityAux", lmao)
    setValue("entity", user.entity)

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

  /* HANDLING SUBCATEGORIES */
  const handleCategorySelect = (e) => {
    setValue("category", e.target.value)
    const lmao = categories.filter((element) => element.name == e.target.value)
    setSubCategorieslvl1(lmao[0].subs)
    setSubCategorieslvl2([])
    setSubCategorieslvl3([])

    setValue("subCategorylvl1", "")
    setValue("subCategorylvl2", "")
    setValue("subCategorylvl3", "")
  }
  const handleSubCategorylvl1Select = (e) => {
    setValue("subCategorylvl1", e.target.value)
    const lmao = subcategorieslvl1.filter((element) => element.name == e.target.value)
    setSubCategorieslvl2(lmao[0].subs)
    setSubCategorieslvl3([])

    setValue("subCategorylvl2", "")
    setValue("subCategorylvl3", "")
  }
  const handleSubCategorylvl2Select = (e) => {
    setValue("subCategorylvl2", e.target.value)
    const lmao = subcategorieslvl2.filter((element) => element.name == e.target.value)
    setSubCategorieslvl3(lmao[0].subs)
    setValue("subCategorylvl3", "")
  }
  const handleSubCategorylvl3Select = (e) => {
    setValue("subCategorylvl3", e.target.value)
  }
  /* HANDLING SUBCATEGORIES END */

  useEffect(() => {
    fetchCategories()
    fetchEntities()
  }, [])

  const onSubmit = async (data) => {
    try {
      console.log(data)
      var res = {}
      if (user.role.role > 2) {
        res = await createSchedule({ ...data, entity: user.entity })
      } else {
        res = await createSchedule(data)
      }

      ToastSuccess(res.data)

      handleCreateClose()
      reset()
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
                <select className="" {...register("category", {
                  required: 'seleccione la categoria',
                  pattern: {}
                })}
                  value={watch("category")}
                  onChange={handleCategorySelect}>
                  <option value="" disabled selected>Seleccione la categoría</option>
                  {
                    categories.map((item,index) => {
                      return <option key={index} value={item.name} >
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
            {subcategorieslvl1.length > 0 ?
              <div className="adduser-input">
                <label>
                  Sub-Categoria (1era):
                </label>
                <div>
                  <select className="" {...register("subCategorylvl1", {
                    required: 'seleccione la categoria',
                    pattern: {}
                  })}
                    value={watch("subCategorylvl1")}
                    onChange={handleSubCategorylvl1Select}>
                    <option value="" disabled selected>Seleccione la categoría</option>
                    {
                      subcategorieslvl1.map((item, index) => {
                        return <option key={index} value={item.name} >
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

            {subcategorieslvl2.length > 0 ?
              <div className="adduser-input">
                <label>
                  Sub-Categoria (2da):
                </label>
                <div>
                  <select className="" {...register("subCategorylvl2", {
                    required: 'seleccione la categoria',
                    pattern: {}
                  })} 
                  value={watch("subCategorylvl2")}
                  onChange={handleSubCategorylvl2Select}>
                    <option value="" disabled selected>Seleccione la categoría</option>
                    {
                      subcategorieslvl2.map((item, index) => {
                        return <option key={index} value={item.name} >
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

            {subcategorieslvl3.length > 0 ?
              <div className="adduser-input">
                <label>
                  Sub-Categoria (3era):
                </label>
                <div>
                  <select className="" {...register("subCategorylvl3", {
                    required: 'seleccione la categoria',
                    pattern: {}
                  })}
                    onChange={handleSubCategorylvl3Select}
                    value={watch("subCategorylvl3")}
                  >
                    <option value="" disabled selected>Seleccione la categoría</option>
                    {
                      subcategorieslvl3.map((item, index) => {
                        return <option key={index} value={item.name} >
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

          <div className="adduser-input">
            <label>
              Cantidad de profesores a asistir (colegios):
            </label>
            <div>
              <input className="add-input-2" type="number" min="1" max="5000" placeholder='cantidad de profesores'
                {...register("teachersExpected", {
                  required: 'ingrese la cantidad de profesores esperados',
                  pattern: {
                    value: /^[0-9]+$/,  // Esta regex solo permite números enteros
                    message: 'Solo se permiten números'
                  }
                })}
              />
              <div>
                {errors.teachersExpected && <span className="error-message">{errors.teachersExpected.message}</span>}
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
                minLength={4}
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
                minLength={4}
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
                    minLength={4}
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
