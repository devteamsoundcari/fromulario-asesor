import React, { useState, createContext } from 'react'
// import { tempData } from '../assets/tempData'
import { getTipifications, getUserInfo, registerTags } from '../lib/services'
import { documentTypeList, tempData } from '../lib/hardcoded'
// import { TipificationRow } from '../Components/TipificationRow'
import PropTypes from 'prop-types'

const FormularioContext = createContext()
const paramsData = new URLSearchParams(window.location.search)
const conversationId = paramsData.get('conversationId')
const typeDocument = paramsData.get('typeDocument')
const numberDocument = paramsData.get('numberDocument')

function FormularioProvider({ children }) {
  // data inicial del componente metadata
  const initialData = {
    conversationId: conversationId,
    docType: typeDocument ? typeDocument : '',
    docNum: numberDocument ? numberDocument : '',
  }

  //Estado para tipificaciones desde el servicio
  const [data, setData] = useState([])
  const [fieldsCount, setFieldsCount] = useState(5)

  // Estado metadata primer paciente
  const [initialMetaData] = useState(initialData)
  //Estado inicial de metadata
  const [metaData, setMetaData] = useState(initialData)
  // El usuario existe
  const [userExist, setUserExist] = useState(false)
  // Data adicional del usuario
  const [userHeaders, setUserHeaders] = useState({})
  //Estado inicial de la data pagina autorizaciones
  const [autData, setAutData] = useState()
  //Estado inicial de la data en tipificaciones
  const [tipData, setTipData] = useState([])
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

  // Errores para cuando se crea una tipificación o no hay un usuario seleccionado
  const [tipError, setTipError] = useState({
    error: false,
    message: 'Debe crear al menos una tipificación con el botón "+"',
  })

  const [loading, setLoading] = useState(true)

  //funcion que limpia la información los input
  const cleanData = (e, num) => {
    e.preventDefault()
    switch (num) {
      case 1:
        setMetaData((prevData) => {
          return {
            ...prevData,
            docType: '',
            docNum: '',
          }
        })
        setFilteredUser([])
        setUserExist(false)
        break
      case 2:
        setTipifications([])
        setTipData([])
        setNivel1([])
        setNivel2([])
        setNivel3([])
        setTextAreaValue('')
        setTipError({
          error: false,
          message: 'Debe crear al menos una tipificación con el botón "+"',
        })
        break
    }
  }

  // funcion que busca el usuario por el número de documento
  const findUser = async () => {
    const initialDocType = initialMetaData.docType
    const initialdocNum = initialMetaData.docNum
    const docType = metaData.docType
    const docNum = metaData.docNum
    setLoading(true)

    try {
      const user = await getUserInfo(
        initialDocType,
        initialdocNum,
        docType,
        docNum
      )
      // console.log('User', user.message[0].tipoDocumento)

      if (user.status && user.status === 200) {
        setLoading(false)
        setUserExist(true)
        setAutData(user)
        const autorizaciones =
          typeof user.message[0].autorizaciones === 'string'
            ? []
            : user.message[0].autorizaciones
        setFilteredUser(autorizaciones)
        setUserHeaders({
          bot_client_id: user.message[0].bot_client_id,
          flux_session_id: user.message[0].flux_session_id,
          flux_bot_id: user.message[0].flux_bot_id,
          idConversacion: user.message[0].idConversacion,
          tipoDocumento: user.message[0].tipoDocumento,
          numeroDocumento: user.message[0].numeroDocumento,
          nombre: user.message[0].nombre,
          telefonoFormulario: user.message[0].telefonoFormulario,
          correoFormulario: user.message[0].correoFormulario,
          cod_cia: user.message[0].cod_cia,
          cod_plan: user.message[0].cod_plan,
          user_document_type_registered:
            user.message[0].user_document_type_registered,
          rol: user.message[0].rol,
          user_contract_number: user.message[0].user_contract_number,
          user_contract_name: user.message[0].user_contract_name,
          user_family_number: user.message[0].user_family_number,
          user_contract_status: user.message[0].user_contract_status,
          user_relationship: user.message[0].user_relationship,
          user_email_bh: user.message[0].user_email_bh,
          user_cellphone_bh: user.message[0].user_cellphone_bh,
          term_and_conditions: user.message[0].term_and_conditions,
          servies_type: user.message[0].servies_type,
          agent_skill: user.message[0].agent_skill,
          agent_id: user.message[0].agent_id,
          agent_name: user.message[0].agent_name,
        })
      } else {
        setUserExist(false)
        setAutData(null)
        setFilteredUser([])
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
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
  const sendData = async (e) => {
    e.preventDefault()
    setTipError((prevData) => ({
      ...prevData,
      error: false,
    }))

    if (Object.entries(tipData).length === 0) {
      // console.log('Aquí se dispararía el error')
      setTipError((prevData) => ({
        ...prevData,
        error: true,
        message: 'Debe crear al menos una tipificación con el botón de "+"',
      }))
      return
    }

    if (
      userHeaders.nombre === null ||
      userHeaders.tipoDocumento === null ||
      userHeaders.numeroDocumento === null
    ) {
      setTipError((prevData) => ({
        ...prevData,
        error: true,
        message: 'No puede enviar tipificaciones sin haber buscado un usuario',
      }))
    }

    // console.log(userHeaders)

    const finalObject = {
      tipificaciones: tipData,
      userInfo: userHeaders,
      observaciones: textAreaValue,
    }

    const objArray = [finalObject]
    // console.log('aca se van a enviar los datos de', objArray)

    const res = await registerTags(objArray)
    // console.log('Response register Tags', res)
    cleanData(e, 2)
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

  //Función para validar el usuario. Tendrá que ser
  const validateUser = async (e) => {
    e.preventDefault()

    // console.log('Metadata', metaData)
    const initialDocType = initialMetaData.docType
    const initialdocNum = initialMetaData.docNum
    const docType = metaData.docType
    const docNum = metaData.docNum

    setLoading(true)
    try {
      const user = await getUserInfo(
        initialDocType,
        initialdocNum,
        docType,
        docNum
      )
      // console.log('User', user.message)

      if (user.status && user.status === 200) {
        setLoading(false)
        setUserExist(true)
        setAutData(user)
        const autorizaciones =
          typeof user.message[0].autorizaciones === 'string'
            ? []
            : user.message[0].autorizaciones
        setFilteredUser(autorizaciones)
        setUserHeaders({
          bot_client_id: user.message[0].bot_client_id,
          flux_session_id: user.message[0].flux_session_id,
          flux_bot_id: user.message[0].flux_bot_id,
          idConversacion: user.message[0].idConversacion,
          tipoDocumento: user.message[0].tipoDocumento,
          numeroDocumento: user.message[0].numeroDocumento,
          nombre: user.message[0].nombre,
          telefonoFormulario: user.message[0].telefonoFormulario,
          correoFormulario: user.message[0].correoFormulario,
          cod_cia: user.message[0].cod_cia,
          cod_plan: user.message[0].cod_plan,
          user_document_type_registered:
            user.message[0].user_document_type_registered,
          rol: user.message[0].rol,
          user_contract_number: user.message[0].user_contract_number,
          user_contract_name: user.message[0].user_contract_name,
          user_family_number: user.message[0].user_family_number,
          user_contract_status: user.message[0].user_contract_status,
          user_relationship: user.message[0].user_relationship,
          user_email_bh: user.message[0].user_email_bh,
          user_cellphone_bh: user.message[0].user_cellphone_bh,
          term_and_conditions: user.message[0].term_and_conditions,
          servies_type: user.message[0].servies_type,
          agent_skill: user.message[0].agent_skill,
          agent_id: user.message[0].agent_id,
          agent_name: user.message[0].agent_name,
        })
      } else {
        setUserExist(false)
        setAutData(null)
        setFilteredUser([])
        setLoading(false)
      }

      // return user === undefined ? false : true
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  //logica que agrega en uno hasta máximo 10 el valor de las tipificaciones
  const addLine = () => {
    if (tipError.error) {
      setTipError((prevData) => ({
        ...prevData,
        error: false,
      }))
    }

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

  // Función que guarda las tipificaciones en sessionStorage
  function fixData(data) {
    const objData = {
      conversationId: conversationId,
      userId: numberDocument,
      data: data,
    }
    sessionStorage(`fixData${conversationId}`, JSON.stringify(objData))
  }

  React.useEffect(() => {
    setMetaData(initialMetaData)
    if (typeDocument && numberDocument) {
      findUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        fixData,
        tipError,
        fieldsCount,
        loading,
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
