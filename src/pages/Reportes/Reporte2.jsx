import React, { useState, useEffect, useRef } from 'react'
import { getStateReport, searchStudent } from '../../api/reports';
import { createEntity, getEntities } from '../../api/entity';
import { useAuth } from "../../context/authContext";
import { DateTime } from "luxon";

export default function Reporte2() {
  const { user } = useAuth();
  const [selectedEntity, setSelectedEntity] = useState(user.entity.name)
  const [students, setStudents] = useState([])

  const inputRef = useRef(null);

  const handleSearch = async () => {
    const searchTerm = inputRef.current.value;

    if (searchTerm.trim() === "") {
      alert("Please enter a search term."); // Or handle empty search term differently
      return; // Stop here if search term is empty
    }

    const data = await searchStudent(searchTerm)
    setStudents(data.data)

  };

  return (
    <div>
      <div>
        Buscar Estudiantes Atendidos:
      </div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleSearch}>
          BUSCAR
        </button>
      </div>




      <table className="report-table-2">
        <thead>
          <tr>
            <th>
              CI
            </th>
            <th>
              Nombre
            </th>
            <th>
              Apellido
            </th>
            <th>
              Colegio
            </th>
            <th>
              Estado
            </th>
            <th>
              Ente
            </th>
            <th>
              Fecha de Actividad
            </th>
          </tr>
        </thead>
        {students.map((item) => {
          return (
            <tr>
              <td>
                {item.ci}
              </td>
              <td>
                {item.name}
              </td>
              <td>
                {item.lastName}
              </td>
              <td>
                {item.school}
              </td>
              <td>
                {item.activityLink.schools[0].state.label}
              </td>
              <td>
                {item.entity}
              </td>
              <td>
                {DateTime.fromISO(item.activityDate).toFormat('dd-LL-yyyy')}
              </td>
            </tr>
          )
        })}

      </table>
    </div>
  )
}
