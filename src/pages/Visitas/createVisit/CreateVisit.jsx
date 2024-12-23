import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import './createVisit.css'
import { getCategories } from '../../../api/category.js'
import { getEntities } from '../../../api/entity.js';
import { getActivities } from '../../../api/activities.js'
import { createEntity } from '../../../api/entity.js'
import { getSchedules } from '../../../api/schedule.js';
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { useAuth } from "../../../context/authContext";
import Information from './Information.jsx';
import Students from './Students.jsx';
import { useMultistepForm } from './usemultistep'
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';


// falta la funcion para cerrar el modal
export default function CreateVisit({ handleCreateClose }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([])
  const [entities, setEntities] = useState([])
  const [schedules, setSchedules] = useState([])
  const [activities, setActivities] = useState([])
  const [schools, setSchools] = useState([])
  const [flag, setFlag] = useState(false)


  const [subcategories, setSubCategories] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, values },
  } = useForm({ mode: "onChange" });

  const { fields: arraySchools, append: appendSchools, remove: removeSchools } = useFieldArray({
    control,
    name: 'schools',
    defaultValue: [{}],
  });

  const { fields: arrayStudents, append: appendStudent, remove: removeStudents } = useFieldArray({
    control,
    name: 'students',
    defaultValue: [{ entity: user.entity, activityDate: getValues("activityDate") }],
  });

  const handleEntitySelect = (e) => {
    setValue("entityAux", e.target.value)
    setValue("entity", entities[e.target.value])
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
    setValue("activityDate", schedules[index].activityDate)
    setValue("schools", schedules[index].schools)
    setValue("category", schedules[index].category)

  }

  const handleActivitySelected = (e) => {
    const index = e.target.value
    setValue("ludicActivity", activities[index])
  }

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data.data)
  }

  const fetchEntities = async () => {
    const data = await getEntities()
    /* console.log(data.data) */
    setEntities(data.data)
  }

  const fetchingSchedules = async () => {
    try {
      const data = await getSchedules()
      setSchedules(data.data)
      /* console.log(data) */
    } catch (error) {
      /* console.log(error) */
    }
  }

  const handleActivitySelect = (e) => {
    const lmao = categories.filter((element) => element.name == e.target.value)
    setSubCategories(lmao[0].subcategories)
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

  const setDefaultEntity = async () => {
    const index = entities.findIndex((element) => element.name === user.entity.name)

    setValue("entityAux", index)
    setValue("entity", user.entity)

  }

  const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back, } = useMultistepForm([
    <Information
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      arraySchools={arraySchools}
      appendSchools={appendSchools}
      removeSchools={removeSchools}
      handleCreateClose={handleCreateClose}
    />,
    <Students
      register={register}
      errors={errors}
      arraySchools={arraySchools}
      arrayStudents={arrayStudents}
      appendStudent={appendStudent}
      removeStudents={removeStudents}
      handleCreateClose={handleCreateClose}
    />
  ])


  useEffect(() => {
    fetchingSchedules()
    fetchCategories()
    fetchEntities()
    setDefaultEntity()
    fetchActivities()
  }, [])

  const onSubmit = async (data) => {
    try {
      console.log(data)


      /* Cambio de paso */
      if (!isLastStep) return next()


      /* Validaciones de Duplicados */
      const nameSet = new Set();
      const hasDuplicates = data.students.some(field => {
        if (nameSet.has(field.name + field.lastName + field.ci)) {
          return true;
        }
        nameSet.add(field.name + field.lastName + field.ci);
        return false;
      });
      if (hasDuplicates) {
        ToastError("hay estudiantes duplicados")
        return
      }



      /* reset() */
    } catch (error) {
      console.log(error)

      /* ToastError("error al crear semillero") */
    }

  }

  return (
    <div className="place-modal-visit">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="visit-title">
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
        <div className="visits-divider"></div>

        {step}
        <div className="visits-divider"></div>




        <div>
          <div className="button-wrapper">
            {!isFirstStep && (
              <button className="back-button" type="button" onClick={back}>
                ATRÁS
              </button>
            )}
            <button className="next-button" type="submit" on>
              {isLastStep ? "FINALIZAR" : "SIGUIENTE"}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
