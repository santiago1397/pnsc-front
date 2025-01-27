import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { getDpt } from '../../api/dpt';


export default function DptTable({ estado, municipio, parroquia, getValues, setValue, flag }) {

  const [defaultState, setDefaultState] = useState({})
  const [defaultMunicipality, setDefaultMunicipality] = useState({})
  const [defaultParish, setDefaultParish] = useState({})

  const [states, setStates] = useState(null)
  const [municipalities, setMunicipalities] = useState(null)
  const [parishes, setParishes] = useState(null)

  const getParishes = async (e) => {
    var index = parseInt(e.target.value)
    setValue(municipio, { value: municipalities[index].value, label: municipalities[index].label })
    const data = await getDpt({ municipality: municipalities[index].value })
    setParishes(data.data)
  }

  const getMunicipalities = async (e) => {
    var index = parseInt(e.target.value)
    setValue(estado, { value: states[index].value, label: states[index].label })
    const data = await getDpt({ state: states[index].value })
    /* console.log(data) */
    setMunicipalities(data.data)
  }

  useEffect(() => {
    const getStates = async () => {
      if (getValues(estado)) {
        setDefaultState(getValues(estado))
        const data = await getDpt({ state: getValues(estado).value })
        setMunicipalities(data.data)
      }

      if (getValues(municipio)) {
        setDefaultMunicipality(getValues(municipio))
        const data = await getDpt({ municipality: getValues(municipio).value })
        setParishes(data.data)
      }

      if (getValues(parroquia)) {
        setDefaultParish(getValues(parroquia))
      }



      const data = await getDpt({})
      setStates(data.data)
    }
    getStates()
  }, [flag])



  return (
    <>
      <td>
        <select onChange={(e) => getMunicipalities(e)} >
          <option value="">-- Selecciona estado --</option>
          {states !== null && states.map((option, index) => {

            return (option.value == defaultState.value) ? (
              <option key={option.value} value={index} selected>
                {option.label}
              </option>
            ) : (
              <option key={option.value} value={index}>
                {option.label}
              </option>
            )
          })}
        </select>
      </td>

      <td>
        <select onChange={(e) => getParishes(e)} >
          {municipalities !== null ? <option value="">-- Selecciona municipio --</option> : ""}
          {municipalities !== null && municipalities.map((option, index) => {
            return (option.value == defaultMunicipality.value) ? (
              <option key={option.value} value={index} selected>
                {option.label}
              </option>
            ) : (
              <option key={option.value} value={index}>
                {option.label}
              </option>
            )
          })}
        </select>
      </td>

      <td>
        <select
          onChange={(e) => {
            setValue(parroquia, { value: parishes[parseInt(e.target.value)].value, label: parishes[parseInt(e.target.value)].label })
          }} >
          {parishes !== null ? <option value="">-- Selecciona parroquia --</option> : ""}
          {parishes !== null && parishes.map((option, index) => {

            return (option.value == defaultParish.value) ? (
              <option key={option.value} value={index} selected>
                {option.label}
              </option>
            ) : (
              <option key={option.value} value={index} >
                {option.label}
              </option>
            )
          })}
        </select>
      </td>

    </>
  )
}

