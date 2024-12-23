import React, { useState, useEffect } from 'react'
import { getCategories } from '../../../api/category.js'
import { getEntities } from '../../../api/entity.js';
import { getActivities } from '../../../api/activities.js'
import { createEntity } from '../../../api/entity.js'
import { getSchedules } from '../../../api/schedule.js';
import { useAuth } from "../../../context/authContext";
import Dpt from '../../../components/dpt/Dpt.jsx'


export default function Information({ register, errors, setValue, getValues, arraySchools, appendSchools, removeSchools, handleCreateClose }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([])
  const [entities, setEntities] = useState([])
  const [schedules, setSchedules] = useState([])
  const [activities, setActivities] = useState([])
  const [schools, setSchools] = useState([])
  const [flag, setFlag] = useState(false)

  const [subcategories, setSubCategories] = useState([])


  const fetchingSchedules = async () => {
    try {
      const data = await getSchedules(0,1000)
      setSchedules(data.data.documents)

      console.log(data.data.documents)
      /* console.log(data) */
    } catch (error) {
      /* console.log(error) */
    }
  }

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data.data)
  }

  const handleActivitySelected = (e) => {
    const index = e.target.value
    setValue("activity", activities[index])
  }

  const handleActivitySelect = (e) => {
    const lmao = categories.filter((element) => element.name == e.target.value)
    setSubCategories(lmao[0].subcategories)
  }

  const handleScheduleSelected = (e) => {
    const index = e.target.value
    console.log(
      schedules[index].activityPlace
    )
    setFlag(true)
    setValue("agendedLink", schedules[index]._id)
    setValue("activityName", schedules[index].activityName)
    setValue("activityPlace", schedules[index].activityPlace)
    setValue("activityDate", new Date(schedules[index].activityDate).toISOString().split('T')[0])
    setValue("schools", schedules[index].schools)
    setValue("ludicActivity", schedules[index].activity)
    setValue("subActivity", schedules[index].subActivity)


    setValue("ludicActivityAux", index)
    console.log(schedules[index].activity.subcategories)
    setSubCategories(schedules[index].activity.subcategories)
    setValue("activity", schedules[index].activity)

    if(schedules[index].subActivity){

    }

  }


  const fetchActivities = async () => {
    try {
      const data = await getActivities(0, 1000)
      setActivities(data.data.documents)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchEntities = async () => {
    const data = await getEntities()
    /* console.log(data.data) */
    setEntities(data.data)
  }

  const setDefaultEntity = async () => {
    const index = entities.findIndex((element) => element.name === user.entity.name)

    setValue("entityAux", index)
    setValue("entity", user.entity)

  }


  useEffect(() => {
    fetchingSchedules()
    fetchCategories()
    fetchEntities()
    setDefaultEntity()
    fetchActivities()
  }, [])

  return (
    <div>

      <br />

      <div className="twofields">
        <div className="adduser-input">
          <label>
            Selecciona una ruta agendada:
          </label>
          <div>
            <select className="" {...register("scheduled", {
              required: 'seleccione el ruta agendada',
              pattern: {}
            })}
              onChange={(e) => handleScheduleSelected(e)}
            >
              <option value="" disabled selected>Seleccione ruta agendada</option>
              {
                schedules.map((item, index) => {
                  return <option key={item.activityName} value={index} >
                    {item.activityName}
                  </option>
                })
              }

            </select>
            {errors.scheduled && <span className="error-message">{errors.scheduled.message}</span>}

          </div>
        </div>

        <div className="adduser-input">
          <label>
            Nombre de la actividad:
          </label>
          <div>
            <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
              {...register("activityName", {
                required: 'seleccione el nombre de la actividad',
              })}
            />
            {errors.activityName && <span className="error-message">{errors.activityName.message}</span>}

          </div>
        </div>

        <div className="adduser-input">
          <label>
            Fecha que se realizo la actividad:
          </label>
          <div>
            <input className="add-input-2" type="date" placeholder='nombre de la actividad'
              {...register("activityDate", {
                required: 'seleccione la fecha de realización',
              })}
            />
            {errors.activityDate && <span className="error-message">{errors.activityDate.message}</span>}

          </div>
        </div>

        <div className="adduser-input">
          <label>
            Categoría:
          </label>
          <div>
            <select className="" {...register("ludicActivityAux", {
              required: 'seleccione la categoría',
              pattern: {}
            })}
              onChange={(e) => handleActivitySelected(e)}
            >
              <option value="" disabled selected>Seleccione la Categoría</option>
              {
                activities.map((item, index) => {
                  return <option key={item.name} value={index} >
                    {item.name}
                  </option>
                })
              }

            </select>
            {errors.ludicActivityAux && <span className="error-message">{errors.ludicActivityAux.message}</span>}

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


       {/*  <div className="adduser-input">
          <label>
            Subcategoria:
          </label>
          <div>
            <select className="" {...register("category", {
              required: 'seleccione la categoría',
              pattern: {}
            })}>
              <option value="" disabled selected>Seleccione la categoría</option>
              {
                categories.map((item) => {
                  return <option key={item.name} value={item.name} >
                    {item.name}
                  </option>
                })
              }

            </select>
            {errors.category && <span className="error-message">{errors.category.message}</span>}

          </div>
        </div> */}
      </div>

      <div className="adduser-input">
        <label>
          Ente:
        </label>
        <div>
          <select className="" {...register("entityAux", {
            required: 'seleccione el Ente',
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
          {errors.entityAux && <span className="error-message">{errors.entityAux.message}</span>}

        </div>
      </div>

      <div className="adduser-input">
        <label>
          Descripción de la actividad:
        </label>
        <div>
          <textarea className="add-input-2" maxLength={300} type="text" placeholder='nombre de la actividad'
            {...register("activityDesc", {
            })}
          />

        </div>
      </div>


      <div className="adduser-input">
        <label>
          Observaciones:
        </label>
        <div>
          <textarea className="add-input-2" maxLength={300} type="text" placeholder='nombre de la actividad'
            {...register("observation", {
            })}
          />

        </div>
      </div>

      <div className="visits-divider"></div>

      <div>
        <h4 >
          Datos del sitio de la actividad:
        </h4>
      </div>

      <div className="adduser-input">
        <div>
          <Dpt
            estado={"activityPlace.state"}
            municipio={"activityPlace.municipality"}
            parroquia={"activityPlace.parish"}
            setValue={setValue}
            getValues={getValues}
            flag={flag}
          />
        </div>
      </div>

      <div className="adduser-input">
        <label>
          Dirección del sitio de la actividad:
        </label>
        <div>
          <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
            {...register("activityPlace.address", {
              required: 'ingrese acronimo del ente',
            })}
          />
          {errors?.activityPlace?.address && <span className="error-message">{errors?.activityPlace?.address?.message}</span>}

        </div>
      </div>

      <div className="adduser-input">
        <label>
          Nombre del sitio de la actividad:
        </label>
        <div>
          <input className="add-input-2" maxLength={50} type="text" placeholder='nombre de la actividad'
            {...register("activityPlace.name", {
              required: 'ingrese acronimo del ente',
            })}
          />
          {errors?.activityPlace?.name && <span className="error-message">{errors?.activityPlace?.name?.message}</span>}

        </div>
      </div>

      <div className="visits-divider"></div>

      <div className="twofields">
        <h4 >
          Instituciones Atendidas:
        </h4>

        <button type="button" onClick={() => appendSchools({})}>
          Agregar Institución
        </button>
      </div>

      {arraySchools.map((item, index) => (
        <div key={index}>
          <div>
            <label>
              Nombre de la Institución:
            </label>
            <div>
              <input {...register(`schools.${index}.name`)} />

            </div>
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

          <button type="button" onClick={() => removeSchools(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
