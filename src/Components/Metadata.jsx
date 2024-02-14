import React, { useContext, useEffect } from 'react'
import { FormularioContext } from './Context/index'
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
      <Input
        type={'select'}
        label={'Ingrese el número de documento'}
        onChange={onChange}
        options={documentTypeList}
        value={docType}
        name={'docType'}
        id={'docType'}
      />
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
