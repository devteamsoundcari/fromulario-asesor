import { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { Input } from '../Atoms/Input'
import Button from '../Atoms/Button'
import { BiCollapseVertical } from 'react-icons/bi'
import { documentTypeList } from '../lib/hardcoded'
import '../Styles/Metadata.css'
import { UserData } from './UserData'

const Metadata = () => {
  const { metaData, setMetaData, cleanData, validateUser, autData, userExist } =
    useContext(FormularioContext)

  const { docType, docNum } = metaData

  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const valor = event.target.value
    setMetaData({
      ...metaData,
      [name]: valor,
    })
  }

  useEffect(() => {
    // console.log('MetaData', metaData)
  }, [metaData])

  return (
    <details>
      <summary>
        Metadata
        <span className="icon-span">
          <BiCollapseVertical />
        </span>
      </summary>

      <form className="metadata-form" id="metadataForm" name="metadataForm">
        <div className="input-cont">
          <label htmlFor="motivo">Tipo de documento</label>
          <select
            name="docType"
            value={docType}
            id="docType"
            onChange={onChange}
          >
            {documentTypeList.map((opcion) => (
              <option key={opcion.id} value={opcion.value} onChange={onChange}>
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
        </div>

        <div className="btn-container">
          <Button
            className={'blue-primary-btn'}
            onClick={(e) => validateUser(e)}
            value={'Buscar usario - Nueva Atención'}
            type={'button'}
          />

          <Button
            className={'blue-primary-btn'}
            onClick={(e) => cleanData(e, 1)}
            value={'Limpiar formulario'}
            type={'button'}
          />
        </div>
      </form>

      {userExist ? <UserData user={autData} /> : null}
    </details>
  )
}

export { Metadata }
