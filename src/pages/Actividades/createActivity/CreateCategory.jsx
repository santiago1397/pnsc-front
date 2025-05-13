import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import './createActivity.css'
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createActivity } from '../../../api/activities.js';
import NestedList from '../../../components/nestedList/NestedList.jsx';
import { createCategory } from '../../../api/category.js';


// falta la funcion para cerrar el modal
export default function CreateCategory({ handleCreateClose }) {

  const [data, setData] = useState({
    id: 1222,
    name: "Ingrese Nombre de Categoría Aquí",
    subs: []
  })


  const onSubmit = async () => {
    try {
      console.log(data)
      
      const result = await createCategory(data)
      console.log(result)
      setData({
        id: 1222,
        name: "Ingrese Nombre de Categoría Aquí",
        subs: []
      })

      handleCreateClose()

      ToastSuccess("Categoría creada exitosamente")
    } catch (error) {
      console.log(error)

      ToastError("Error al crear Catergoría")
    }

  }

  return (
    <div className="schedule-place-modal">

      <div className="schedule-top">
        <h2>
          CREAR CATEGORÍA NUEVA:
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleCreateClose() }}>
            <IconButton type="button" size="small" aria-label="edit" sx={{ color: 'red' }} >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="divider">
      </div>
      <NestedList list={data} setList={setData} />
      <button onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}
