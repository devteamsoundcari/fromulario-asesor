import React, { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { dataArray } from '../assets/Motivos'
import plusIcon from '../assets/add-circle.svg'
import { Input } from '../Atoms/Input'
import '../Styles/Tipifications.css'

const Tipifications = () => {
  const {
    cleanData,
    addLine,
    formLines,
    initialTip,
    setTipData,
    filtNiv1,
    nivel1,
    filtNiv2,
    nivel2,
    filtNiv3,
    nivel3,
    tipData,
  } = useContext(FormularioContext)
  const { motivo } = initialTip

  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const valor = event.target.value
    if (name === 'motivo') {
      filtNiv1(valor)
    } else if (name === 'nivel-1') {
      filtNiv2(valor)
    } else if (name === 'nivel-2') {
      filtNiv3(valor)
    }
    setTipData((prevData) => ({
      ...prevData,
      [name]: valor,
    }))
  }

  useEffect(() => {}, [tipData])

  return (
    <details>
      <summary>Tipificaciones</summary>
      {formLines().map((line, id) => {
        return (
          <div key={id} className="form">
            <select
              name="motivo"
              value={tipData.motivo}
              id="motivo"
              onChange={onChange}
            >
              <option value="">Seleccionar...</option>
              {dataArray.map((opcion, index) => (
                <option
                  key={opcion.texto}
                  value={opcion.texto}
                  onChange={onChange}
                >
                  {opcion.texto}
                </option>
              ))}
            </select>
            <Input
              type={'select-tip'}
              label={'Nivel 1'}
              onChange={onChange}
              options={nivel1}
              value={motivo}
              name={'nivel-1'}
              id={'nivel-1'}
              required={true}
            />
            <Input
              type={'select-tip'}
              label={'Nivel 2'}
              onChange={onChange}
              options={nivel2}
              value={motivo}
              name={'nivel-2'}
              id={'nivel-2'}
              required={true}
            />
            <Input
              type={'select-tip'}
              label={'Nivel 3'}
              onChange={onChange}
              options={nivel3}
              value={motivo}
              name={'nivel-3'}
              id={'nivel-3'}
              required={false}
            />
          </div>
        )
      })}

      <span onClick={addLine}>
        <img src={plusIcon} alt="icono de más" className="tip-icon" />
      </span>
      <label htmlFor="Description">Descripcion</label>
      <textarea
        name="Description"
        id="Description"
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={(e) => cleanData(e, 2)}>Limpiar Formulario</button>
      <button>Registar tipificación</button>
    </details>
  )
}

export { Tipifications }
