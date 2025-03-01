import React, { useState, useEffect } from 'react'
import Dpt from '../../../components/dpt/Dpt.jsx'
import "./createVisit.css"
import * as XLSX from 'xlsx';
import { downloadExcel } from '../../../api/downloadFile.js';
import DptTable from '../../../components/dpt/DptTable.jsx';

export default function Teachers({ register, errors, arrayTeachers, appendTeacher, removeTeacher, arraySchools, setValue, getValues, handleCreateClose, setError }) {

  var shirtSize_options = ["12", "13", "14", "15", "16", 12, 13, 14, 15, 16, "S", "M", "L", "XL", "XXL"]

  function validateSchools(data) {
    if (arraySchools.includes(data)) {
      return 1
    } else {
      return 0
    }
  }

  function isNumber(value) {
    return !isNaN(value);
  }

  function validateGender(value) {
    return !isNaN(value);
  }

  const LoadStudents = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData)




    for (let i = 0; i < jsonData.length; i++) {
      appendStudent({ ...jsonData[i] })
    }

    for (let i = 0; i < jsonData.length; i++) {
      if (validateSchools(jsonData[i].school) === 0) {
        setError(`students.${i}.school`, {
          type: "manual",
          message: "La escuela no esta registrada"
        })
      }

      if (isNumber(jsonData[i].age) == false) {
        setError(`students.${i}.age`, {
          type: "manual",
          message: "La edad debe ser un número"
        })
      }
    }
  }

  return (
    <div>
      <div className="twofields ">
        <h4>
          Docentes Participantes:
        </h4>

        <div className="load-students-options">
          <button className="load-single-student" type="button" onClick={() => appendTeacher({})}>
            Agregar Docente
          </button>
        </div>

      </div>

      <div className="students-container">
        <table className="students-responsive-table-2">
          <thead>
            <tr >
              <th colspan="7">
                Datos del Docente:
              </th>
              <th colspan="3">
                Datos vivienda:
              </th>
            </tr>
            <tr>
              <th>Escuela</th>
              <th>Cédula</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th className="smaller-column">Edad</th>
              <th>Género</th>
              <th>Talla de camisa</th>

              <th>Estado</th>
              <th>Municipio</th>
              <th>Parroquia</th>
            </tr>
            <tr>

            </tr>
          </thead>
          <tbody>

            {arrayTeachers.map((item, index) => (
              <tr>
                <td>
                  <select {...register(`teachers.${index}.school`, {
                    required: 'ingrese la escuela',
                  })}>
                    <option value="" disabled selected>Seleccione la escuela</option>

                    {arraySchools.map((item, index) => (
                      <option value={item.name} >{item.name}</option>
                    ))}

                  </select>
                  <div>
                    {errors?.teachers?.[index]?.school && <span className="students-errors">{errors?.teachers?.[index]?.school.message}</span>}
                  </div>
                </td>
                <td>
                  <input style={{ width: "85px" }} {...register(`teachers.${index}.ci`, {
                    required: 'ingrese la cedula',
                    pattern: {
                      value: /^\d{7,13}$/,
                      message: "ingrese cedula valida"
                    }
                  })} placeholder='cédula' />
                  <div>
                    {errors?.teachers?.[index]?.ci && <span className="students-errors">{errors?.teachers?.[index]?.ci.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`teachers.${index}.name`, {
                    required: 'ingrese el nombre',
                  })} placeholder='nombre' />
                  <div>
                    {errors?.teachers?.[index]?.name && <span className="students-errors">{errors?.teachers?.[index]?.name.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`teachers.${index}.lastName`, {
                    required: 'ingrese el apellido',
                  })} placeholder='apellidos' />
                  <div>
                    {errors?.teachers?.[index]?.lastname && <span className="students-errors">{errors?.teachers?.[index]?.lastname.message}</span>}
                  </div>
                </td>
                <td className="smaller-column">
                  <input className="smaller-column" {...register(`teachers.${index}.age`, {
                    required: 'ingrese edad',
                    pattern: {
                      value: /^\d{1,2}$/,
                      message: "Age must be a number between 1 and 120"
                    }
                  })} type="number" placeholder='edad' />
                  <div>
                    {errors?.teachers?.[index]?.age && <span className="students-errors">{errors?.teachers?.[index]?.age.message}</span>}
                  </div>
                </td>

                <td>
                  <select {...register(`teachers.${index}.gender`, {
                    required: 'ingrese el genero',
                  })} >
                    <option value="" disabled selected>Seleccione</option>
                    <option value="Femenino" >Femenino</option>
                    <option value="Masculino" >Masculino</option>
                  </select>
                  <div>
                    {errors?.teachers?.[index]?.gender && <span className="students-errors">{errors?.teachers?.[index]?.gender.message}</span>}
                  </div>
                </td>


                <td className="smaller-column">
                  <select {...register(`teachers.${index}.shirtSize`, {
                    validate: value => (value == undefined || value == "" || shirtSize_options.includes(value)) || "Seleccione una opcion valida"
                  })} >
                    <option value="" disabled selected>Seleccione</option>
                    <option value="12" >12</option>
                    <option value="13" >13</option>
                    <option value="14" >14</option>
                    <option value="15" >15</option>
                    <option value="16" >16</option>
                    <option value="S" >S</option>
                    <option value="M" >M</option>
                    <option value="L" >L</option>
                    <option value="XL" >XL</option>
                    <option value="XXL" >XXL</option>
                  </select>
                  <div>
                    {errors?.teachers?.[index]?.shirtSize && <span className="students-errors">{errors?.teachers?.[index]?.shirtSize.message}</span>}
                  </div>
                </td>

                {/* from here need to fix */}
                <DptTable
                  estado={`teachers.${index}.homeLocation.state`}
                  municipio={`teachers.${index}.homeLocation.municipality`}
                  parroquia={`teachers.${index}.homeLocation.parish`}
                  setValue={setValue}
                  getValues={getValues}
                />
                <td>
                  <button className="delete-student-button" type="button" onClick={() => removeStudents(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/*arrayStudents.map((item, index) => (
        <div key={index} className="student">
          <div >
            <label >
              Datos del estudiante:
            </label>

            <div style={{ display: "flex" }}>


              <div>
                <label>
                  Escuela:
                </label>

                <div key={index}>
                  <select {...register(`students.${index}.school`)}>
                    <option value="" disabled selected>Seleccione la escuela</option>

                     arraySchools.map((item, index) => (
                      <option value={item.name} >{item.name}</option>
                    )) 

                  </select>

                </div>
              </div>
              <div>
                <label>
                  Nombre:
                </label>
                <div>
                  <input {...register(`students.${index}.name`)} placeholder='nombre' />

                </div>
              </div>
              <div>
                <label>
                  Apellido:
                </label>
                <div>
                  <input {...register(`students.${index}.lastname`)} placeholder='apellidos' />

                </div>
              </div>
              <div>
                <label>
                  Cédula:
                </label>
                <div>
                  <input {...register(`students.${index}.ci`)} placeholder='cédula' />
                </div>
              </div>
              <div>
                <label>
                  Edad:
                </label>
                <div>
                  <input {...register(`students.${index}.age`)} type="number" placeholder='edad' />
                </div>
              </div>
              <div>
                <label>
                  Género:
                </label>
                <div>
                  <select {...register(`students.${index}.gender`)} >
                    <option value="" disabled selected>Seleccione</option>
                    <option value="F" >Femenino</option>
                    <option value="M" >Masculino</option>
                  </select>
                </div>
              </div>
              <div>
                <label>
                  Nivel Acaémico:
                </label>
                <div>
                  <select {...register(`students.${index}.grade`)} >
                    <option value="" disabled selected>Seleccione</option>
                    <option value="Preescolar" >Preescolar</option>
                    <option value="1er grado" >1er grado</option>
                    <option value="2do grado" >2do grado</option>
                    <option value="3er grado" >3er grado</option>
                    <option value="4to grado" >4to grado</option>
                    <option value="5to grado" >5to grado</option>
                    <option value="6to grado" >6to grado</option>
                    <option value="7mo grado" >7mo grado</option>
                    <option value="8vo grado" >8vo grado</option>
                    <option value="9no grado" >9no grado</option>
                    <option value="C. Div. 4to Año" >C. Div. 4to Año</option>
                    <option value="C. Div. 5to Año" >C. Div. 5to Año</option>
                    <option value="C. Téc. 4to Año" >C. Téc. 4to Año</option>
                    <option value="C. Téc. 5to Año" >C. Téc. 5to Año</option>
                    <option value="C. Téc. 6to Año" >C. Téc. 6to Año</option>
                    <option value="Universitario" >Universitario</option>
                    <option value="Docente" >Docente</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label>
              Datos del representante:
            </label>
            <div style={{ display: "flex" }}>
              <div>
                <label>
                  Cedula:
                </label>
                <div>
                  <input {...register(`students.${index}.representativeCI`)} />
                </div>
              </div>
              <div>
                <label>
                  Nombre:
                </label>
                <div>
                  <input {...register(`students.${index}.representativeName`)} />
                </div>
              </div>
              <div>
                <label>
                  Apellido:
                </label>
                <div>
                  <input {...register(`students.${index}.representativeLastName`)} />
                </div>
              </div>
              <div>
                <label>
                  Edad:
                </label>
                <div>
                  <input {...register(`students.${index}.representativeAge`)} />
                </div>
              </div>
              <div>
                <label>
                  Parentesco:
                </label>
                <div>
                  <input {...register(`students.${index}.representativeKindred`)} />
                </div>
              </div>
              <div>
                <label>
                  Teléfono:
                </label>
                <div>
                  <input {...register(`students.${index}.representativePhone`)} />
                </div>
              </div>
            </div>
          </div>


          <div>
            <label>
              Dirección del hogar:
            </label>
            <Dpt
              estado={`students.${index}.homeLocation.state`}
              municipio={`students.${index}.homeLocation.municipality`}
              parroquia={`students.${index}.homeLocation.parish`}
              setValue={setValue}
              getValues={getValues}
              flag={flag}
            />
          </div>

          <button type="button" onClick={() => removeStudents(index)}>
            Eliminar Estudiante
          </button>
        </div>
      ))*/}


    </div >
  )
}
