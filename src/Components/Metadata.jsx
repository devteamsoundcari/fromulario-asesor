import { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { Input } from '../Atoms/Input'
import Button from '../Atoms/Button'
import { BiCollapseVertical } from 'react-icons/bi'
import { documentTypeList } from '../lib/hardcoded'
import '../styles/Metadata.css'
import { UserData } from './UserData'
import Loader from '../Atoms/Loader'

const Metadata = () => {
  const {
    metaData,
    setMetaData,
    cleanData,
    validateUser,
    autData,
    userExist,
    loading,
    userError,
  } = useContext(FormularioContext)

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

  // useEffect(() => {
  //   console.log('Log loading', loading)
  // }, [metaData])

  return (
    <details open>
      <summary>
        Metadata
        <span className="icon-span">
          <BiCollapseVertical />
        </span>
      </summary>

      <form
        method="POST"
        className="metadata-form"
        id="metadataForm"
        name="metadataForm"
      >
        <div className="input-cont">
          <label htmlFor="docType">Tipo de documento</label>
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
            label={'Número de documento'}
            onChange={onChange}
            value={docNum}
            name={'docNum'}
            id={'docNum'}
            labelId={'docNumLabel'}
          />
        </div>

        <div className="btn-container">
          <Button
            className={'blue-primary-btn'}
            onClick={(e) => validateUser(e)}
            value={'Buscar usuario - Nueva Atención'}
            type={'button'}
          />

          <Button
            className={'primary-button'}
            onClick={(e) => cleanData(e, 1)}
            value={'Limpiar formulario'}
            type={'button'}
          />
        </div>
      </form>

      <div>
        {userError.error && userError.errorType === 400 ? (
          <p className="error-message">{userError.message}</p>
        ) : null}

        {loading ? <Loader /> : userExist ? <UserData user={autData} /> : null}
      </div>
    </details>
  )
}

export { Metadata }
