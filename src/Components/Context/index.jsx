import React, { createContext } from 'react'

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

  const perro = 'perro'

  return (
    <FormularioContext.Provider
      value={{
        perro,
        documentTypeList,
        serviceTypeList,
      }}
    >
      {children}
    </FormularioContext.Provider>
  )
}

export { FormularioContext, FormularioProvider }
