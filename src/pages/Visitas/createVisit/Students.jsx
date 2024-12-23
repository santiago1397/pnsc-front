import React, { useState, useEffect } from 'react'
import Dpt from '../../../components/dpt/Dpt.jsx'
import "./createVisit.css"
import * as XLSX from 'xlsx';

export default function Students({ register, errors, arrayStudents, appendStudent, removeStudents, arraySchools }) {

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
  }

  return (
    <div>
      <div className="twofields ">
        <h4>
          Estudiantes Atendidos:
        </h4>

        <input type="file" onChange={(e) => LoadStudents(e)} />


        <button type="button" onClick={() => appendStudent({})}>
          Agregar Estudiante
        </button>
      </div>

      <div style={{ overflow: 'auto' }}>
        <table className="students-responsive-table">
          <thead>
            <tr >
              <th colspan="7">
                Datos estudiante:
              </th>
              <th colspan="6">
                Datos representante:
              </th>
            </tr>
            <tr>
              <th>Escuela</th>
              <th>Cédula</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th className="smaller-column">Edad</th>
              <th>Género</th>
              <th>Nivel Acaémico</th>

              <th>Cédula</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Edad</th>
              <th>Parentesco</th>
              <th>Teléfono</th>
            </tr>
            <tr>

            </tr>
          </thead>
          <tbody>

            {arrayStudents.map((item, index) => (
              <tr>
                <td>
                  <select {...register(`students.${index}.school`, {
                    required: 'ingrese la escuela',
                  })}>
                    <option value="" disabled selected>Seleccione la escuela</option>

                    {arraySchools.map((item, index) => (
                      <option value={item.name} >{item.name}</option>
                    ))}

                  </select>
                  <div>
                    {errors?.students?.[index]?.school && <span className="students-errors">{errors?.students?.[index]?.school.message}</span>}
                  </div>
                </td>
                <td>
                  <input style={{ width: "85px" }} {...register(`students.${index}.ci`, {
                    required: 'ingrese la cedula',
                  })} placeholder='cédula' />
                  <div>
                    {errors?.students?.[index]?.ci && <span className="students-errors">{errors?.students?.[index]?.ci.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`students.${index}.name`, {
                    required: 'ingrese el nombre',
                  })} placeholder='nombre' />
                  <div>
                    {errors?.students?.[index]?.name && <span className="students-errors">{errors?.students?.[index]?.name.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`students.${index}.lastname`, {
                    required: 'ingrese el apellido',
                  })} placeholder='apellidos' />
                  <div>
                    {errors?.students?.[index]?.lastname && <span className="students-errors">{errors?.students?.[index]?.lastname.message}</span>}
                  </div>
                </td>
                <td className="smaller-column">
                  <input className="smaller-column" {...register(`students.${index}.age`, {
                    required: 'ingrese edad',
                    pattern: {
                      value: /^\d{1,2}$/,
                      message: "Age must be a number between 1 and 120"
                    }
                  })} type="number" placeholder='edad' />
                  <div>
                    {errors?.students?.[index]?.age && <span className="students-errors">{errors?.students?.[index]?.age.message}</span>}
                  </div>
                </td>

                <td>
                  <select {...register(`students.${index}.gender`, {
                    required: 'ingrese el genero',
                  })} >
                    <option value="" disabled selected>Seleccione</option>
                    <option value="Femenino" >Femenino</option>
                    <option value="Masculino" >Masculino</option>
                  </select>
                  <div>
                    {errors?.students?.[index]?.gender && <span className="students-errors">{errors?.students?.[index]?.gender.message}</span>}
                  </div>
                </td>
                <td>
                  <select {...register(`students.${index}.grade`, {
                    required: 'ingrese nivel academico',
                  })} >
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
                  <div>
                    {errors?.students?.[index]?.grade && <span className="students-errors">{errors?.students?.[index]?.grade.message}</span>}
                  </div>
                </td>
                <td>
                  <input style={{ width: "85px" }} {...register(`students.${index}.representativeCI`)} />
                  <div>
                    {errors?.students?.[index]?.representativeCI && <span className="students-errors">{errors?.students?.[index]?.representativeCI.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`students.${index}.representativeName`)} />
                  <div>
                    {errors?.students?.[index]?.representativeName && <span className="students-errors">{errors?.students?.[index]?.representativeName.message}</span>}
                  </div>
                </td>
                <td>
                  <input {...register(`students.${index}.representativeLastName`)} />
                  <div>
                    {errors?.students?.[index]?.representativeLastName && <span className="students-errors">{errors?.students?.[index]?.representativeLastName.message}</span>}
                  </div>
                </td>
                <td>
                  <input type="number" className="smaller-column" {...register(`students.${index}.representativeAge`)} />
                  <div>
                    {errors?.students?.[index]?.representativeAge && <span className="students-errors">{errors?.students?.[index]?.representativeAge.message}</span>}
                  </div>
                </td>
                <td>
                  <input style={{ width: "100px" }} {...register(`students.${index}.representativeKindred`)} />
                  <div>
                    {errors?.students?.[index]?.representativeKindred && <span className="students-errors">{errors?.students?.[index]?.representativeKindred.message}</span>}
                  </div>
                </td>
                <td>
                  <input style={{ width: "85px" }} {...register(`students.${index}.representativePhone`)} />
                  <div>
                    {errors?.students?.[index]?.representativePhone && <span className="students-errors">{errors?.students?.[index]?.representativePhone.message}</span>}
                  </div>
                </td>
                <td>
                  <button type="button" onClick={() => removeStudents(index)}>
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


    </div>
  )
}
