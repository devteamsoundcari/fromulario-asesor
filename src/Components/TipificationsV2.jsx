import { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
// import { dataArray } from '../assets/Motivos'
import plusIcon from '../assets/add-circle.svg'
import { BiCollapseVertical } from 'react-icons/bi'
// import { Input } from '../Atoms/Input'
import { TipificationRow } from './TipificationRow'
import '../styles/Tipifications.css'

const TipificationsV2 = () => {
  const {
    cleanData,
    addLine,
    fieldsCount,
    tipError,
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

    if (value !== '') {
      setTextAreaValue(value)
      // console.log(tipData)

      Object.entries(tipData).map((element, i) => {
        // console.log('Element', element)
        // console.log(element[0])
        const id = element[0].split('tipificacion')[1]
        setTipData((prevData) => ({
          ...prevData,
          [`tipificacion${id}`]: {
            ...prevData[`tipificacion${id}`],
            observaciones: value,
          },
        }))
      })
    } else {
      setTextAreaValue('N/A')

      Object.entries(tipData).map((element) => {
        const id = element[0].split('tipificacion')[1]
        setTipData((prevData) => ({
          ...prevData,
          [`tipificacion${id}`]: {
            ...prevData[`tipificacion${id}`],
            observaciones: value,
          },
        }))
      })
    }
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

      {tipError.error ? (
        <p className="error-message">* {tipError.message}</p>
      ) : null}

      <form onSubmit={(e) => sendData(e)} method="post" className="form-tip">
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

        <div
          className={
            fieldsCount >= tipifications.length
              ? 'add-row-btn-cont'
              : 'add-row-btn-cont-d'
          }
        >
          <span onClick={addLine}>
            <img src={plusIcon} alt="icono de más" className="tip-icon" />
          </span>
        </div>

        <div className="observations-cont">
          <label htmlFor="description">Observaciones:</label>
          <textarea
            name="valor"
            id="description"
            cols="60"
            rows="10"
            value={textAreaValue === 'N/A' ? '' : textAreaValue}
            onChange={textAreaOnChange}
          ></textarea>
        </div>

        <div className="button-section">
          <button className="primary-button" onClick={(e) => cleanData(e, 2)}>
            Limpiar tipificaciones
          </button>
          <input
            type="submit"
            name="send-data"
            id="send-data"
            className="blue-primary-btn"
            value={'Enviar formulario'}
          />
        </div>
      </form>
    </details>
  )
}

export { TipificationsV2 }
