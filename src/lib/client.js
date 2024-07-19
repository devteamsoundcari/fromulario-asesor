class Client {
  async postData(url, data) {
    const options = {
      method: 'POST',
      body: data,
    }

    const response = await fetch(url, options)
    const res = await response.json()

    return res
  }
}

export { Client }
