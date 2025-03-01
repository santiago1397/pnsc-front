import React, {useState} from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { ToastError } from '../../../components/toasts/ToastError.jsx'
import { ToastSuccess } from '../../../components/toasts/ToastSuccess.jsx'
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createActivity } from '../../../api/activities.js';
import NestedList from '../../../components/nestedList/NestedList.jsx';
import { createCategory } from '../../../api/category.js';


// falta la funcion para cerrar el modal
export default function EditCategory({activity, handleEditClose }) {

  const [data, setData] = useState(activity)


  const onSubmit = async () => {
    try {
      const result = await createCategory(data)
      console.log(result)

      handleCreateClose()
    } catch (error) {
      console.log(error)

      /* ToastError("error al crear semillero") */
    }

  }

  return (
    <div className="schedule-place-modal">

      <div className="schedule-top">
        <h2>
          EDITAR CATEGORÍA:
        </h2>

        <div>
          <Tooltip title="cerrar" onClick={(e) => { e.stopPropagation(); handleEditClose() }}>
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
