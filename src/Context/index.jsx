import React, { useState, createContext } from 'react'
// import { tempData } from '../assets/tempData'
import { getTipifications } from '../lib/services'
import { documentTypeList, tempData } from '../lib/hardcoded'
// import { TipificationRow } from '../Components/TipificationRow'
import PropTypes from 'prop-types'

const FormularioContext = createContext()

function FormularioProvider({ children }) {
  // data inicial del componente metadata
  const initialData = {
    docType: '',
    docNum: '',
  }
  //data inicial del componente tipifications
  const initialTip = { texto: 'Seleccione...', nivel1: [] }

  //Estado para tipificaciones desde el servicio
  const [data, setData] = useState([])
  const [fieldsCount, setFieldsCount] = useState(5)

  //Estado inicial de metadata
  const [metaData, setMetaData] = useState(initialData)
  // El usuario existe
  const [userExist, setUserExist] = useState(false)
  //Estado inicial de la data pagina autorizaciones
  const [autData, setAutData] = useState()
  //Estado inicial de la data en tipificaciones
  const [tipData, setTipData] = useState([initialTip])
  //Controlador para el valor del textarea
  const [textAreaValue, setTextAreaValue] = useState('')
  //Array de usuarios encontrados
  const [filteredUser, setFilteredUser] = useState(undefined)
  //cantidad de tipificaciones a mapear
  const [tipificationsLines, setTipificationsLines] = useState(1)
  const [tipifications, setTipifications] = useState([])
  //setea el id del campo para que se llene solo uno a la vez
  const [fieldId, setFieldId] = useState('')

  //array del nivel 1
  const [nivel1, setNivel1] = useState([])
  //array del nivel 2
  const [nivel2, setNivel2] = useState([])
  //array del nivel 3
  const [nivel3, setNivel3] = useState([])

  //funcion que limpia la información los input
  const cleanData = (e, num) => {
    e.preventDefault()
    switch (num) {
      case 1:
        setMetaData(initialData)
        setFilteredUser([initialTip])
        break
      case 2:
        setTipifications([])
        setTipData((prevData) => ({
          ...prevData,
          motivo: '', // Establecer el valor de "motivo" a ""
        }))
        setNivel1([])
        setNivel2([])
        setNivel3([])
        setTextAreaValue('')
        break
    }
  }

  // funcion que busca el usuario por el número de documento
  const findUser = (numeroId) => {
    const sendNumber = numeroId
    const result = tempData.find(({ numeroId }) => sendNumber === numeroId)
    if (result) {
      if (result.autorizaciones.length > 1) {
        setFilteredUser(result.autorizaciones)
      }
    } else {
      return
    }
  }

  //aumenta el valor del array con el que se imprimen las tipificaciones
  const formLines = () => {
    const newArray = []
    for (let index = 0; index < tipificationsLines; index++) {
      newArray.push(index)
    }
    return newArray
  }

  //funcion que maneja el envio de la data
  const sendData = () => {
    const finalObject = {
      tipificacion: tipData,
      valorTextarea: textAreaValue,
    }
    console.log('aca se van a enviar los datos de', finalObject)
  }

  // filtro del nivel 1
  const filtNiv1 = (valor) => {
    const valorEnviado = valor
    const result = data.find(({ value }) => valorEnviado === value)
    // console.log('Result', result.tag_lvl1)
    setNivel1(result.tag_lvl1)
    return result.tag_lvl1
  }

  // filtro del nivel 2
  const filtNiv2 = (valor) => {
    const valorEnviado = valor
    // console.log('Valor', valor)
    const result = nivel1.find(({ value }) => valorEnviado === value)
    setNivel2(result.tag_lvl2)
    return result.tag_lvl2
  }

  // filtro del nivel 3
  const filtNiv3 = (valor) => {
    const valorEnviado = valor
    const result = nivel2.find(({ value }) => valorEnviado === value)
    // console.log('Nivel 2', result)
    if (result.tag_lvl3) {
      setNivel3(result.tag_lvl3)
      return result.tag_lvl3
    } else {
      setNivel3([])
      return []
    }
  }

  //Función para validar el usuario
  const validateUser = (e) => {
    e.preventDefault()

    console.log('Metadata', metaData)
    const docType = metaData.docType
    const docNum = metaData.docNum

    const user = tempData.find(
      (user) => user.tipoId === docType && user.numeroId === docNum
    )
    console.log('User', user)

    if (user) {
      setUserExist(true)
      setAutData(user)
    } else {
      setUserExist(false)
      setAutData(null)
    }

    return user === undefined ? false : true
  }

  //logica que agrega en uno hasta máximo 10 el valor de las tipificaciones
  const addLine = () => {
    if (tipifications.length <= fieldsCount) {
      let number
      for (let i = 0; i < tipifications.length; i++) {
        number = i + 1
      }

      const id = new Date().getTime()
      const newLine = {
        id: id,
        tipNumber: number,
        htmlData: {
          id: number,
        },
      }
      // console.log('Entra a set tip', newLine)
      setTipifications([...tipifications, newLine])
    }
  }

  //logica que elimina una fila específica de las tipificaciones
  const removeLine = (id) => {
    // console.log('Se removerá el id', id)
    const newTipArray = tipifications.filter((item) => item.id !== id)
    // console.log('Se removió', newTipArray)
    setTipificationsLines(tipifications.length)
    setTipifications(newTipArray)

    //borra el valor de la tipificacion que se elimina
    const newTipData = { ...tipData }
    delete newTipData[`tipificacion${id}`]
    setTipData(newTipData)
  }

  React.useEffect(() => {
    async function fetchTipifications() {
      try {
        const res = await getTipifications()
        // console.log('Tipo res', res)
        if (res.status === 200) {
          setData(res.message[0].reason)
          setFieldsCount(res.message[0].parameterCount)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchTipifications()
  }, [])

  return (
    <FormularioContext.Provider
      value={{
        metaData,
        initialTip,
        setMetaData,
        setAutData,
        setTipData,
        tipificationsLines,
        documentTypeList,
        cleanData,
        addLine,
        findUser,
        filteredUser,
        formLines,
        filtNiv1,
        nivel1,
        filtNiv2,
        nivel2,
        filtNiv3,
        nivel3,
        tipData,
        textAreaValue,
        setTextAreaValue,
        sendData,
        validateUser,
        fieldId,
        setFieldId,
        data,
        autData,
        removeLine,
        tipifications,
        userExist,
      }}
    >
      {children}
    </FormularioContext.Provider>
  )
}

FormularioProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { FormularioContext, FormularioProvider }
