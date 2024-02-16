import React, { useState, createContext } from 'react'
import { tempData } from '../assets/tempData'
import { dataArray } from '../assets/Motivos'

const FormularioContext = createContext()

function FormularioProvider({ children }) {
  /** Array con los tipos de documento que puede seleccionar el usuario */
  const documentTypeList = [
    {
      id: 0,
      name: 'Selecciona una opción',
      value: '',
      stringValue: '',
    },
    {
      id: 1,
      name: 'Cédula de Ciudadania',
      value: '1',
      stringValue: 'CC',
    },
    {
      id: 8,
      name: 'Tarjeta de Identidad',
      value: '8',
      stringValue: 'TI',
    },
    {
      id: 7,
      name: 'Registro Civil',
      value: '7',
      stringValue: 'RC',
    },
    {
      id: 2,
      name: 'Cédula Extranjería',
      value: '2',
      stringValue: 'CE',
    },
    {
      id: 6,
      name: 'Pasaporte',
      value: '6',
      stringValue: 'PA',
    },
    {
      id: 3,
      name: 'Menor sin Identificación',
      value: '3',
      stringValue: 'MSI',
    },
    {
      id: 4,
      name: 'Número de Identificación Tributaria',
      value: '4',
      stringValue: 'NIT',
    },
    {
      id: 5,
      name: 'Número de Identificación Patronal',
      value: '5',
      stringValue: 'NIP',
    },
    {
      id: 9,
      name: 'Carné Diplomático',
      value: '9',
      stringValue: 'CD',
    },
    {
      id: 10,
      name: 'Certificado de Nacido Vivo',
      value: '10',
      stringValue: 'CN',
    },
    {
      id: 11,
      name: 'Salvoconducto de Permanencia',
      value: '11',
      stringValue: 'SC',
    },
    {
      id: 12,
      name: 'Pasaporte ONU',
      value: '12',
      stringValue: 'ONU',
    },
    {
      id: 13,
      name: 'Permiso Especial',
      value: '13',
      stringValue: 'PE',
    },
    {
      id: 14,
      name: 'Permiso por protección Temporal',
      value: '14',
      stringValue: 'PT',
    },
  ]

  /** Array con los tipos de servicio que puede seleccionar el usuario */
  const serviceTypeList = [
    {
      value: '',
      name: 'Selecciona una opción',
    },
    {
      value: 1,
      name: 'Autorizaciones',
    },
    {
      value: 2,
      name: 'Validación cartera y Estado de Cuenta',
    },
    {
      value: 3,
      name: 'Soporte de canales virtuales',
    },
    {
      value: 4,
      name: 'Información general',
    },
  ]
  // data inicial del componente metadata
  const initialData = {
    docType: '',
    docNum: 0,
  }
  //data inicial del componente tipifications
  const initialTip = { texto: 'Seleccione...', nivel1: [] }

  //Estado inicial de metadata
  const [metaData, setMetaData] = useState([initialData])
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
  //logica que agrega en uno hasta máximo 10 el valor de las tipificaciones
  const addLine = () => {
    if (tipificationsLines < 10) {
      setTipificationsLines(tipificationsLines + 1)
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
    const result = dataArray.find(({ texto }) => valorEnviado === texto)
    setNivel1(result.nivel1)
  }
  // filtro del nivel 2
  const filtNiv2 = (valor) => {
    const valorEnviado = valor
    const result = nivel1.find(({ texto }) => valorEnviado === texto)
    setNivel2(result.nivel2)
  }
  // filtro del nivel 3
  const filtNiv3 = (valor) => {
    const valorEnviado = valor
    const result = nivel2.find(({ texto }) => valorEnviado === texto)
    setNivel3(result.nivel3)
  }

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
        serviceTypeList,
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
      }}
    >
      {children}
    </FormularioContext.Provider>
  )
}

export { FormularioContext, FormularioProvider }
