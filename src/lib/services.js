import { Client } from '../lib/client'

const client = new Client()
const url = 'https://cariai.com/colsanitasdevelop/process'

export const getTipifications = async () => {
  const body = new FormData()
  body.append('operation', 'tagsWebView')
  body.append('user', 'KbYe*7fB455R')

  const data = await client.postData(url, body)

  return data
}

export const getUserInfo = async (
  baseDocType,
  baseDocNumber,
  consultDocType,
  consultDocNumber
) => {
  const body = new FormData()
  body.append('operation', 'userConsultInformation')
  body.append('user', 'KbYe*7fB455R')
  body.append('typeDocument', baseDocType)
  body.append('numberDocument', baseDocNumber)
  body.append('typeDocumentConsult', consultDocType)
  body.append('numberDocumentConsult', consultDocNumber)

  const data = await client.postData(url, body)

  return data
}

export const registerTags = async (data) => {
  const formData = new FormData()
  formData.append('operation', 'userRegisterInformationTags')
  formData.append('user', 'KbYe*7fB455R')
  formData.append('data', data)

  try {
    const data = await client.postData(url, formData)
    console.log('Response register Tags', data)

    if (data.status === 200) {
      return data
    } else {
      throw new Error('Error al registrar los datos')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
