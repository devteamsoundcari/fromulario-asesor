import React, { useState, createContext } from 'react'
import { tempData } from '../../assets/tempData'

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

  const initialData = {
    docType: '',
    docNum: 0,
  }

  //Estado inicial de metadata
  const [metaData, setMetaData] = useState(initialData)
  //Estado inicial de la data pagina 2
  const [autData, setAutData] = useState()
  //Estado inicial de la data pagina 3
  const [tipData, setTipData] = useState([])
  //Array de usuarios encontrados
  const [filteredUser, setFilteredUser] = useState(undefined)

  const cleanData = (e, num) => {
    e.preventDefault()
    switch (num) {
      case 1:
        setMetaData(initialData)
        setFilteredUser()
        break
      case 2:
        setAutData()
        break
      case 3:
        setTipData([])
        break
    }
  }

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

  return (
    <FormularioContext.Provider
      value={{
        metaData,
        setMetaData,
        setAutData,
        setTipData,
        documentTypeList,
        serviceTypeList,
        cleanData,
        findUser,
        filteredUser,
      }}
    >
      {children}
    </FormularioContext.Provider>
  )
}

export { FormularioContext, FormularioProvider }
