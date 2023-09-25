export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = { ...body }
  if (
    data.hasOwnProperty("name") &&
    data.hasOwnProperty("email") &&
    data.hasOwnProperty("phone") &&
    data.hasOwnProperty("subject") &&
    data.hasOwnProperty("message") &&
    data.name !== '' &&
    data.email !== '' &&
    data.phone !== '' &&
    data.subject !== '' &&
    data.message !== ''
  ) {
    setResponseStatus(event, 202)
    return ({ "message: ": "Thank for submitting message. we will contact you soon." })
  } else {
    setResponseStatus(event, 400)
    return ({ "message: ": "Some data is missing." })
  }
})