import React, { useContext } from 'react'
import { FormularioContext } from '../Context/index'
import { Input } from '../Atoms/Input'
import Button from '../Atoms/Button'

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

      <label htmlFor="motivo">Tipo de documento</label>
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

      <Button
        className={'blue-primary-btn'}
        onClick={(e) => findUser(docNum)}
        value={'Buscar usario - Nueva Atención'}
        type={'button'}
      />

      <Button
        className={'blue-primary-btn'}
        onClick={(e) => cleanData(e, 1)}
        value={'Limpiar formularion'}
        type={'button'}
      />
    </details>
  )
}

export { Metadata }
