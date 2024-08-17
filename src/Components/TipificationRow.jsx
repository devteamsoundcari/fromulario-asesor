import { useState, useContext } from 'react'
import { FormularioContext } from '../Context'
import { Input } from '../Atoms/Input'
import PropTypes from 'prop-types'
import { FaTrashAlt } from 'react-icons/fa'
import '../styles/TipificationRow.css'

const TipificationRow = ({
  id,
  motivo,
  filtNiv1,
  filtNiv2,
  filtNiv3,
  setTipData,
  number,
}) => {
  const { data, removeLine } = useContext(FormularioContext)
  const [localMotivo, setLocalMotivo] = useState(motivo)
  const [localNivel1, setLocalNivel1] = useState([])
  const [valNiv1, setValNiv1] = useState('')
  const [localNivel2, setLocalNivel2] = useState([])
  const [valNiv2, setValNiv2] = useState('')
  const [localNivel3, setLocalNivel3] = useState([])
  const [valNiv3, setValNiv3] = useState('')
  const [valNiv4, setValNiv4] = useState('')
  const [localDisabled, setLocalDisabled] = useState(false)
  const [errors, setErrors] = useState({
    motivoError: false,
    nivel1Error: false,
    nivel2Error: false,
    nivel3Error: false,
  })

  const reasonOnChange = async (e) => {
    e.preventDefault()
    const value = e.target.value
    setLocalMotivo(value)

    if (value === '') {
      setLocalNivel1([])
      setLocalNivel2([])
      setLocalNivel3([])
      setLocalDisabled(false)
      setErrors({
        motivoError: true,
      })
      return
    } else {
      setErrors(() => ({
        ...errors,
        motivoError: false,
      }))
      const niv1 = await filtNiv1(value)
      setLocalNivel1(niv1)
      setLocalNivel2([])
      setLocalNivel3([])
    }
  }

  const level1OnChange = async (e) => {
    e.preventDefault()
    const value = e.target.value
    setValNiv1(value)

    if (value === '') {
      setLocalNivel2([])
      setLocalNivel3([])
      setLocalDisabled(false)
      setErrors((prev) => ({
        ...prev,
        nivel1Error: true,
      }))
      return
    } else {
      setErrors((prev) => ({
        ...prev,
        nivel1Error: false,
      }))
      const niv2 = await filtNiv2(value)
      setLocalNivel2(niv2)
      setLocalNivel3([])
    }

    // console.log('En tip row component', value)
  }

  const level2OnChange = async (e) => {
    e.preventDefault()
    const value = e.target.value

    if (value === '') {
      setLocalNivel3([])
      setLocalDisabled(false)
      setErrors((prev) => ({
        ...prev,
        nivel2Error: true,
      }))
      return
    } else {
      setErrors((prev) => ({
        ...prev,
        nivel2Error: false,
      }))
    }

    setValNiv2(value)
    const niv3 = await filtNiv3(value)

    if (niv3.length === 0) {
      setValNiv3('N/A')
      setLocalDisabled(true)
      setTipData((prev) => ({
        ...prev,
        [`tipificacion${id}`]: {
          motivo: localMotivo,
          nivel1: valNiv1,
          nivel2: valNiv2,
          nivel3: 'N/A',
          nivel4: 'N/A',
        },
      }))
    } else {
      setLocalNivel3(niv3)
      setLocalDisabled(false)
    }
  }

  const level3OnChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setValNiv3(value)

    if (value === '' && !localDisabled) {
      setLocalDisabled(false)
      setErrors((prev) => ({
        ...prev,
        nivel3Error: true,
      }))
      return
    } else {
      setErrors((prev) => ({
        ...prev,
        nivel3Error: false,
      }))
    }

    // Actualizar el estado del componente padre con los datos de la tipificación
    setTipData((prev) => ({
      ...prev,
      [`tipificacion${id}`]: {
        motivo: localMotivo,
        nivel1: valNiv1,
        nivel2: valNiv2,
        nivel3: value === '' ? 'N/A' : value,
        nivel4: 'N/A',
      },
    }))
  }

  const level4OnChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setValNiv4(value)
    // Actualizar el estado del componente padre con los datos de la tipificación
    setTipData((prev) => ({
      ...prev,
      [`tipificacion${id}`]: {
        motivo: localMotivo,
        nivel1: valNiv1,
        nivel2: valNiv2,
        nivel3: valNiv3,
        nivel4: value,
      },
    }))
  }

  return (
    <>
      <div className="title">
        <h3>Tipificación {number}</h3>
      </div>
      <div className="tipCont">
        <div className="form">
          <div className="inputBox">
            <label htmlFor={`motivo-${id}`}>Motivo</label>
            <select
              name="motivo"
              className="selector reason-select"
              value={localMotivo}
              id={`motivo-${id}`}
              onChange={reasonOnChange}
            >
              <option value="">Seleccionar...</option>
              {data.map((opcion) => (
                <option key={opcion.motivo} value={opcion.value}>
                  {opcion.motivo}
                </option>
              ))}
            </select>
            {errors.motivoError && (
              <p className="error-par">No puedes dejar el motivo vacío</p>
            )}
          </div>

          <div className="level-row">
            <Input
              type={'select-tip'}
              label={'Nivel 1'}
              onChange={level1OnChange}
              options={localNivel1}
              value={valNiv1} // Se puede ajustar según sea necesario
              name={'nivel-1'}
              id={`motivo-${id}-level-1`}
              required={true}
              disabled={false}
              className={'selector level-1'}
            />
            {errors.nivel1Error && (
              <p className="error-par">No puedes dejar este nivel vacío</p>
            )}
          </div>

          <div className="level-row">
            <Input
              type={'select-tip'}
              label={'Nivel 2'}
              onChange={level2OnChange}
              options={localNivel2}
              value={valNiv2} // Se puede ajustar según sea necesario
              name={'nivel-2'}
              id={`motivo-${id}-level-2`}
              required={true}
              disabled={false}
              className={'selector level-2'}
            />
            {errors.nivel2Error && (
              <p className="error-par">No puedes dejar este nivel vacío</p>
            )}
          </div>

          <div className="level-row">
            <Input
              type={'select-tip'}
              label={'Nivel 3'}
              onChange={level3OnChange}
              options={localNivel3}
              value={valNiv3} // Se puede ajustar según sea necesario
              name={'nivel-3'}
              id={`motivo-${id}-level-3`}
              required={false}
              disabled={localDisabled}
              className={'selector level-3'}
            />
            {errors.nivel3Error && (
              <p className="error-par">No puedes dejar este nivel vacío</p>
            )}
          </div>

          <Input
            type={'text'}
            label={'Nivel 4'}
            onChange={level4OnChange}
            placeHolder={'Observaciones...'}
            name={'nivel-4'}
            required={false}
            value={valNiv4}
            id={`motivo-${id}-level-4`}
            className={'texto level-4'}
          />
        </div>
        <div className="delete-row">
          <button className="delete-btn" onClick={() => removeLine(id)}>
            <FaTrashAlt />
          </button>
        </div>
      </div>

      <div className="divider"></div>
    </>
  )
}

TipificationRow.propTypes = {
  id: PropTypes.any.isRequired,
  motivo: PropTypes.string.isRequired,
  filtNiv1: PropTypes.func.isRequired,
  filtNiv2: PropTypes.func.isRequired,
  filtNiv3: PropTypes.func.isRequired,
  setTipData: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
}

export { TipificationRow }
