import React, { useState, useEffect } from 'react'
import { getCategories } from '../../../api/category.js'
import { getEntities } from '../../../api/entity.js';
import { getActivities } from '../../../api/activities.js'
import { createEntity } from '../../../api/entity.js'
import { getSchedules } from '../../../api/schedule.js';
import { useAuth } from "../../../context/authContext";
import Dpt from '../../../components/dpt/Dpt.jsx'
import ArticleIcon from '@mui/icons-material/Article';
import PlaceIcon from '@mui/icons-material/Place';
import SchoolIcon from '@mui/icons-material/School';


export default function Information({
  watch,
  register,
  errors,
  setValue,
  getValues,
  arraySchools,
  appendSchools,
  removeSchools,
  handleLoadClose,
  selectedSchedule
}) {

  const { user } = useAuth();
  const [entities, setEntities] = useState([])
  const [schedules, setSchedules] = useState([])
  const [activities, setActivities] = useState([])
  const [schools, setSchools] = useState([])
  const [flag, setFlag] = useState(false)

  const [rerender, setRerender] = useState(0);

  const [categories, setCategories] = useState([])
  const [subcategorieslvl1, setSubCategorieslvl1] = useState([])
  const [subcategorieslvl2, setSubCategorieslvl2] = useState([])
  const [subcategorieslvl3, setSubCategorieslvl3] = useState([])


  const fetchingSchedules = async () => {
    try {
      const data = await getSchedules(0, 1000)
      setSchedules(data.data.documents)
      /* console.log(data) */
    } catch (error) {
      /* console.log(error) */
    }
  }

  const fetchCategories = async () => {
    const data = await getCategories(0, 10000)
    setCategories(data.data.documents)
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

  //esta monda esta fea, hay que arreglarlo
  const handleScheduleSelected = async () => {
    const data = await getCategories(0, 10000)
    setCategories(data.data.documents)

    const categories = data.data.documents


    setFlag(!flag)
    setValue("agendedLink", selectedSchedule._id)
    setValue("activityName", selectedSchedule.activityName)
    setValue("activityPlace", selectedSchedule.activityPlace)
    setValue("studentsExpected", selectedSchedule.studentSpected)
    setValue("teachersExpected", selectedSchedule.teachersExpected)
    setValue("activityDate", new Date(selectedSchedule.activityDate).toISOString().split('T')[0])

    const first = categories.filter((element) => element.name == selectedSchedule.category)
    setSubCategorieslvl1(first[0].subs)
    const second = first[0].subs.filter((element) => element.name == selectedSchedule.subCategorylvl1)
    setSubCategorieslvl2(second[0].subs)
    const third = second[0].subs.filter((element) => element.name == selectedSchedule.subCategorylvl2)
    setSubCategorieslvl3(third[0].subs)

    setValue("category", selectedSchedule.category)
    setValue("subCategorylvl1", selectedSchedule.subCategorylvl1)
    setValue("subCategorylvl2", selectedSchedule.subCategorylvl2)
    setValue("subCategorylvl3", selectedSchedule.subCategorylvl3)

    const indexEntity = entities.findIndex((element) => element.name === (selectedSchedule.entity.name))
    setValue("entityAux", indexEntity)
    setValue("entity", selectedSchedule.entity)

    //limpio el array y lo relleno
    for (let i = 0; i < arraySchools.length; i++) {
      removeSchools(0)
    }

    setValue("schools", selectedSchedule.schools)


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
    const data = await getEntities(0, 10000)
    /* console.log(data.data) */
    setEntities(data.data.documents)
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
    handleScheduleSelected()

    /* fetchActivities() */
  }, [])


  const addItem = () => {
    appendSchools({});
    setRerender(rerender + 1); // Trigger re-render
  };

  const handleSchoolChange = (index, fieldName, value) => {
    const updatedSchools = arraySchools.map((school, i) => {
      if (i === index) {
        return { ...school, [fieldName]: value }; // Create a *new* object
      }
      return school;
    });

    // Trigger a re-render by updating the form's value directly.
    setValue('schools', updatedSchools);
  };

  return (
    <div className="students-container">

      <br />

      <div className="details-section">
        <div>
          <ArticleIcon sx={{ color: "var(--iteractive-color)", width: 50, height: 50 }} />
          <div>
            <span className='main-desc'>Datos de la Actividad</span> <br />
            <span className='second-desc'>Ingresa los detalles para agendar tu actividad</span>
          </div>
        </div>
        <div className="schedule-group">

          <div className="inputs-2">
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
                    categories.map((item, index) => {
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

          <div className="textarea-wrapper">
            <div className="adduser-input">
              <label>
                Descripción de la actividad:
              </label>
              <div>
                <textarea className="add-input-2" maxLength={300} type="text" placeholder='descripción de la actividad'
                  {...register("description", {
                  })}
                />
                
                <div>
                  {errors?.description?.name && <span className="error-message">{errors?.description?.name?.message}</span>}
                </div>

              </div>
            </div>
          </div>

          <div className="textarea-wrapper">
            <div className="adduser-input">
              <label>
                Observaciones de la actividad:
              </label>
              <div>
                <textarea className="add-input-2" maxLength={300} type="text" placeholder='observaciones de la actividad'
                  {...register("observation", {
                  })}
                />
                
                <div>
                  {errors?.observation?.name && <span className="error-message">{errors?.observation?.name?.message}</span>}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <br />

      <div className="details-section">
        <div>
          <PlaceIcon sx={{ color: "var(--iteractive-color)", width: 50, height: 50 }} />
          <div>
            <span className='main-desc'>Datos del sitio</span> <br />
            <span className='second-desc'>Ingresa los detalles del sitio donde se realizara la actividad</span>
          </div>
        </div>
        <div className="schedule-group">


          <Dpt
            estado={"activityPlace.state"}
            municipio={"activityPlace.municipality"}
            parroquia={"activityPlace.parish"}
            setValue={setValue}
            getValues={getValues}
            flag={flag}
          />



          <div className="inputs-2">
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
                <div className="error-message-wrapper" >
                  {errors?.activityPlace?.address && <span className="error-message">{errors?.activityPlace?.address.message}</span>}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="details-section">
        <div>
          <SchoolIcon sx={{ color: "var(--iteractive-color)", width: 50, height: 50 }} />
          <div>
            <span className='main-desc'>Instituciones Educativas a ateder</span> <br />
            <span className='second-desc'>Ingresa los detalles de las instituciones o comunidades a atender</span>
          </div>
        </div>
        <div className="schedule-group">
          <div className="add-institution-wrapper">
            <button type="button" onClick={() => addItem({})}>
              Agregar +
            </button>
          </div>
          <div>

            {arraySchools.map((item, index) => (
              <div className="school-section" key={index}>



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

                <div className="inputs-2">
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
                      <option key="community"  >Comunidad</option>
                    </select>
                    <div>
                      {errors?.schools?.[index]?.type && <span className="error-message">{errors?.schools?.[index]?.type.message}</span>}
                    </div>
                  </div>
                </div>


                <div className="delete-school-wrapper">
                  <button type="button" onClick={() => removeSchools(index)}>
                    Eliminar
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>



      </div>

      
    </div>
  )
}
