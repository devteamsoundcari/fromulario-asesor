import React, { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { Input } from '../Atoms/Input'

const Metadata = () => {
  const { documentTypeList, metaData, setMetaData, cleanData, findUser } =
    useContext(FormularioContext)

  const { docType, docNum } = metaData

  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const valor = event.target.value
    setMetaData((prevData) => ({
      ...prevData,
      [name]: valor,
    }))
  }

  return (
    <details>
      <summary>Metadata</summary>
      {/* <Input
        type={'select'}
        label={'Ingrese el tipo de documento'}
        onChange={onChange}
        options={documentTypeList}
        value={docType}
        name={'docType'}
        id={'docType'}
      /> */}
      <select
        name="motivo"
        value={metaData.docType}
        id="motivo"
        onChange={onChange}
      >
        <option value="">Seleccionar...</option>
        {documentTypeList.map((opcion, index) => (
          <option key={opcion.id} value={opcion.name} onChange={onChange}>
            {opcion.name}
          </option>
        ))}
      </select>
      <Input
        type={'text'}
        label={'Ingrese el número de documento'}
        onChange={onChange}
        value={docNum}
        name={'docNum'}
        id={'docNum'}
      />
      <button onClick={(e) => findUser(docNum)}>
        Buscar usario - Nueva Atención
      </button>
      <button onClick={(e) => cleanData(e, 1)}>Limpiar formulario</button>
    </details>
  )
}

export { Metadata }
