import { useContext, useEffect } from 'react'
import { FormularioContext } from '../Context/index'
// import { dataArray } from '../assets/Motivos'
import { AddButton } from '../Atoms/AddButton'
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
    userExist,
    // setData,
  } = useContext(FormularioContext)

  const textAreaOnChange = (e) => {
    e.preventDefault()

    const value = e.target.value

    if (value !== '') {
      setTextAreaValue(value)
    } else {
      setTextAreaValue('N/A')
    }
  }

  const style = {
    backgroundColor: '#c5c5c5',
    cursor: 'not-allowed',
    pointerEvents: 'none',
    color: 'white',
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
          <span onClick={addLine} className={userExist ? '' : 'add-disabled'}>
            {/* <img src={plusIcon} alt="icono de más" className="tip-icon" /> */}
            {userExist ? (
              <AddButton fill={'#0071ce'} />
            ) : (
              <AddButton fill={'#c5c5c5'} />
            )}
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
            disabled={userExist ? false : true}
            style={userExist ? {} : style}
          />
        </div>
      </form>
    </details>
  )
}

export { TipificationsV2 }
