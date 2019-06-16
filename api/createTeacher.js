import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context, callback) {
  console.log('Executing createTeacher')

  // Validates if the payload was provided or not
  console.log(`event.body: ${event.body}`)
  if (!event.body) {
    return failure({ status: false, message: 'POST data expected' })
  }

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Creates the object to be saved
  const item = {
    email: data.email,
    password: data.password,
    userType: 'T',
    name: data.name,
    cityId: data.cityId,
    birthDate: data.birthDate,
    bio: data.bio,
    motherCountryId: data.motherCountryId,
    teacherType: data.teacherType,
    teacherPrice: data.teacherPrice
  }

  try {
    // Saves the object
    console.log(`item: ${item}`)
    const results = await dao.createTeacher(item)
    console.log(`results: ${JSON.stringify(results)}`)

    // Store the ID of the object
    console.log(`results.insertId: ${JSON.stringify(results.insertId)}`)
    const id = results.insertId
    console.log(`id: ${id}`)

    // Return status code 200
    // Return the object that was saved
    if (id) {
      const teacher = await dao.getTeacher(id)
      console.log(`teacher: ${JSON.stringify(teacher)}`)
      return success(teacher)
    }
    
    // Or return results from database
    return success(results)
    
  } catch(error) {
    // Return status code 500
    console.log(error)
    return failure({ status: false, message: error })
  }

}