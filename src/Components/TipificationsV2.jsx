import { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
// import { dataArray } from '../assets/Motivos'
import plusIcon from '../assets/add-circle.svg'
import { BiCollapseVertical } from 'react-icons/bi'
// import { Input } from '../Atoms/Input'
import { TipificationRow } from './TipificationRow'
import '../Styles/Tipifications.css'

const TipificationsV2 = () => {
  const {
    cleanData,
    addLine,
    // formLines,
    // initialTip,
    tipData,
    setTipData,
    filtNiv1,
    filtNiv2,
    filtNiv3,
    setTextAreaValue,
    textAreaValue,
    sendData,
    data,
    tipifications,
    // setData,
  } = useContext(FormularioContext)

  const textAreaOnChange = (e) => {
    e.preventDefault()

    const value = e.target.value

    setTextAreaValue(value)

    setTipData((prevData) => ({
      ...prevData,
      observaciones: value,
    }))
  }

  useEffect(() => {
    // console.log('Data', data)
    // console.log('TipData', tipData)
    // console.log('Tipifications', tipifications)
  }, [data, tipData, tipifications])

  return (
    <details>
      <summary>
        Tipificaciones{' '}
        <span className="icon-span">
          <BiCollapseVertical />
        </span>
      </summary>

      {tipifications && tipifications.length === 0
        ? null
        : tipifications.map((element) => {
            // console.log('Line', element)
            return (
              <TipificationRow
                key={element.id}
                id={element.id}
                number={element.tipNumber ? element.tipNumber + 1 : 1}
                motivo={''}
                filtNiv1={filtNiv1}
                filtNiv2={filtNiv2}
                filtNiv3={filtNiv3}
                setTipData={setTipData}
              />
            )
          })}

      <div className="add-row-btn-cont">
        <span onClick={addLine}>
          <img src={plusIcon} alt="icono de más" className="tip-icon" />
        </span>
      </div>

      <div className="observations-cont">
        <label htmlFor="Description">Descripcion</label>
        <textarea
          name="valor"
          id="Description"
          cols="60"
          rows="10"
          value={textAreaValue}
          onChange={textAreaOnChange}
        ></textarea>
      </div>

      <button onClick={(e) => cleanData(e, 2)}>Limpiar Formulario</button>
      <button onClick={sendData}>Registar tipificación</button>
    </details>
  )
}

export { TipificationsV2 }