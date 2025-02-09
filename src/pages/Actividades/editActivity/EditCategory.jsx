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
export default function EditCategory({activity, handleCreateClose }) {

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
    <div className="place-modal">
      <h2>
        Crear categoría Nueva:
      </h2>
      <NestedList list={data} setList={setData} />
      <button onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}
