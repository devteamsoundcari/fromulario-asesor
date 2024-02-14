import React, { useContext } from 'react'
import { FormularioContext } from './Context/index'

const Metadata = () => {
  const { documentTypeList } = useContext(FormularioContext)
  return (
    <details>
      <summary>Metadata</summary>
      <select>
        Seleccione un tipo de documento
        {documentTypeList.map((documentType) => (
          <option value={documentType.value}>{documentType.name}</option>
        ))}
      </select>
      <label htmlFor="documentInput">Ingrese el número de documento</label>
      <input type="text" id="documentInput" />
      <button>Buscar usario - Nueva Atención</button>
      <button>Limpiar formulario</button>
    </details>
  )
}

export { Metadata }
