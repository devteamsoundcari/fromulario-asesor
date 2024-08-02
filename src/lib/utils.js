export const formatDate = (date) => {
  const dateObj = new Date(date)
  const monthInit = dateObj.getMonth() + 1
  const month = monthInit < 10 ? `0${monthInit}` : monthInit
  const day =
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${day}/${month}/${year}`
}

export const formatDateWithHour = (date) => {
  const dateObj = new Date(date)
  const monthInit = dateObj.getMonth() + 1
  const month = monthInit < 10 ? `0${monthInit}` : monthInit
  const day =
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
  const year = dateObj.getFullYear()
  const hour =
    dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
  const minute =
    dateObj.getMinutes() < 10
      ? `0${dateObj.getMinutes()}`
      : dateObj.getMinutes()
  return `${day}/${month}/${year} ${hour}:${minute}`
}
