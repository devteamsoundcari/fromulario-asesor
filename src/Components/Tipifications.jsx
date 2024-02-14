import React, { useContext } from 'react'
import { FormularioContext } from './Context/index'
import plusIcon from '../assets/add-circle.svg'

const Tipifications = () => {
  const { serviceTypeList } = useContext(FormularioContext)
  return (
    <details>
      <summary>Tipificaciones</summary>
      <select>
        Seleccione un tipo de documento
        {serviceTypeList.map((serviceType) => (
          <option value={serviceType.value}>{serviceType.name}</option>
        ))}
      </select>
      <label htmlFor="level1">Nivel 1</label>
      <select name="" id="level1">
        -
      </select>
      <label htmlFor="2">Nivel 2</label>
      <select name="" id="2">
        -
      </select>
      <label htmlFor="level3">Nivel 3</label>
      <select name="" id="level3">
        -
      </select>
      <span>
        <img src={plusIcon} alt="icono de más" />
      </span>
      <label htmlFor="Description">Descripcion</label>
      <textarea
        name="Description"
        id="Description"
        cols="30"
        rows="10"
      ></textarea>
      <button>Limpiar Formulario</button>
      <button>Registar tipificación</button>
    </details>
  )
}

export { Tipifications }
