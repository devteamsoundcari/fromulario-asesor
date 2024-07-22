import React, { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { dataArray } from '../assets/Motivos'
import plusIcon from '../assets/add-circle.svg'
import { Input } from '../Atoms/Input'
import '../styles/Tipifications.css'
import Button from '../Atoms/Button'

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
    setTextAreaValue,
    textAreaValue,
    sendData,
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
    if (name === 'valor') {
      setTextAreaValue(valor)
    }
    setTipData((prevData) => ({
      ...prevData,
      [name]: valor,
    }))
  }

  useEffect(() => {}, [tipData])

  return (
    <details className="tipifications-sections">
      <summary>Tipificaciones</summary>
      <div className="section-form">
        {formLines().map((line, id) => {
          return (
            <div key={id} className="row-form">
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
          name="valor"
          id="Description"
          cols="30"
          rows="10"
          value={textAreaValue}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="button-section">
        <Button
          className="primary-button"
          onClick={(e) => cleanData(e, 2)}
          value={'Limpiar Formulario'}
        />

        <Button
          className="primary-button"
          onClick={(e) => cleanData(e, 2)}
          value={'Registar tipificación'}
        />
      </div>
    </details>
  )
}

export { Tipifications }
