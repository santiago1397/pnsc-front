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
import Teachers from './Teachers.jsx';
import { useMultistepForm } from './usemultistep'
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import { createVisit, verifyStudents } from '../../../api/visits.js';
import { UploadImage } from '../../../api/images.js';



// falta la funcion para cerrar el modal
export default function CreateVisit({ handleLoadClose, selectedSchedule }) {
  const { user } = useAuth();
  const [duplicates, setDuplicates] = useState([]);
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    setError,
    formState: { errors, values },
  } = useForm({
    mode: "onChange",
  });

  console.log(selectedSchedule.schools)

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

  const { fields: arrayTeachers, append: appendTeacher, remove: removeTeacher } = useFieldArray({
    control,
    name: 'teachers',
    defaultValue: [{ entity: user.entity, activityDate: getValues("activityDate") }],
  });


  const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back, } = useMultistepForm([
    <Information
      watch={watch}
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      arraySchools={arraySchools}
      appendSchools={appendSchools}
      removeSchools={removeSchools}
      handleLoadClose={handleLoadClose}
      selectedSchedule={selectedSchedule}
    />,
    <Students
      register={register}
      errors={errors}
      arraySchools={arraySchools}
      arrayStudents={arrayStudents}
      appendStudent={appendStudent}
      removeStudents={removeStudents}
      setValue={setValue}
      getValues={getValues}
      handleLoadClose={handleLoadClose}
      setError={setError}
    />,
    <Teachers
      register={register}
      errors={errors}
      arraySchools={arraySchools}
      arrayTeachers={arrayTeachers}
      appendTeacher={appendTeacher}
      removeTeacher={removeTeacher}
      setValue={setValue}
      getValues={getValues}
      handleLoadClose={handleLoadClose}
      setError={setError}
    />
  ])




  const onSubmit = async (data) => {
    try {
      console.log(data)

      if (currentStepIndex == 0) {
        appendSchools({})
        removeSchools(arraySchools.length)
      }

      /* Cambio de paso */
      if (!isLastStep) return next()


      /* Validaciones de Duplicados */
      const nameSet = new Map();
      let firstDuplicate = null;
      const duplicates = []
      const hasDuplicates = data.students.some((field, index) => {
        if (nameSet.has(field.ci)) {
          const originalIndex = nameSet.get(field.ci);
          setError(`students.${originalIndex}.ci`, { type: "manual", message: "El estudiante se encuentra duplicado" });
          setError(`students.${index}.ci`, { type: "manual", message: "El estudiante se encuentra duplicado" })
          firstDuplicate = field.ci; // Store the first duplicate
          return true;
        }
        nameSet.set(field.ci, index);
        return false;
      });

      setDuplicates(duplicates)
      if (hasDuplicates) {
        ToastError(`El estudiante de cedula: ${firstDuplicate} se encuentra duplicado.`)
        return
      }

      if (data.students && data.students.length <= 0) {
        ToastError("ingrese al menos un estudiante")
        return
      }

      /* verifica si un estudiante ya fue cargado */
      const verification = await verifyStudents(data)
      console.log(verification)

      var documentn1 = ""
      var documentn2 = ""
      if (data.images[0]) {
        documentn1 = Date.now() + "_" + data.images[0].name
      }
      if (data.images[1]) {
        console.log(data.images[1])
        console.log(data.images[1].name)
        documentn2 = Date.now() + "_" + data.images[1].name
      }



      const res = await createVisit({ ...data, images: [documentn1, documentn2] })
      if (data.images[0]) {
        await UploadImage(documentn1, selectedSchedule.entity.name, data.images[0])
      }
      if (data.images[1]) {
        await UploadImage(documentn2, selectedSchedule.entity.name, data.images[1])
      }

      ToastSuccess("Visita cargada con exito")
      handleLoadClose()
      reset()
    } catch (error) {
      console.log(error)
      if (error.response.status == 406) {
        ToastError(`Estudiante ${error.response.data.student.name} ya se encuentra registrado`)
      } else {
        ToastError("error al cargar visita")
      }

    }

  }



  return (
    <div className="schedule-place-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="schedule-top">
          <h2>
            REPORTAR VISITA REALIZADA
          </h2>

          <div>
            <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleLoadClose() }}>
              <IconButton type="button" size="medium" aria-label="close" sx={{ color: 'red' }}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        </div>


        <div className="divider">
        </div>

        {step}
        <div className="divider">
        </div>




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
