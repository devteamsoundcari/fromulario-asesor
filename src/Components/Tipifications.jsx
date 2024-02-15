import React, { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
import { dataArray } from '../assets/Motivos'
import plusIcon from '../assets/add-circle.svg'
import '../Styles/Tipifications.css'
import { Input } from '../Atoms/Input'

const Tipifications = () => {
  const {
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
      console.log('perro')
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
            <Input
              type={'select-tip'}
              label={'Motivo'}
              onChange={onChange}
              options={dataArray}
              value={motivo}
              name={'motivo'}
              id={'motivo'}
            />
            <Input
              type={'select-tip'}
              label={'Nivel 1'}
              onChange={onChange}
              options={nivel1}
              value={motivo}
              name={'nivel-1'}
              id={'motivo'}
            />
            <Input
              type={'select-tip'}
              label={'Nivel 2'}
              onChange={onChange}
              options={nivel2}
              value={motivo}
              name={'nivel-2'}
              id={'motivo'}
            />
            <Input
              type={'select-tip'}
              label={'Nivel 3'}
              onChange={onChange}
              options={nivel3}
              value={motivo}
              name={'nivel-3'}
              id={'motivo'}
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
      <button>Limpiar Formulario</button>
      <button>Registar tipificación</button>
    </details>
  )
}

export { Tipifications }

// return (
//   <div className="form">
//     <select>
//       Seleccione un tipo de documento
//       {serviceTypeList.map((serviceType) => (
//         <option key={serviceType.value} value={serviceType.value}>
//           {serviceType.name}
//         </option>
//       ))}
//     </select>
//     <label htmlFor="level1">Nivel 1</label>
//     <select name="" id="level1">
//       -
//     </select>
//     <label htmlFor="2">Nivel 2</label>
//     <select name="" id="2">
//       -
//     </select>
//     <label htmlFor="level3">Nivel 3</label>
//     <select name="" id="level3">
//       -
//     </select>
//   </div>
// )

/*                <option key={serviceType.value} value={serviceType.value}>
                  {serviceType.name}
                </option> */
