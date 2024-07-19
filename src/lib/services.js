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
