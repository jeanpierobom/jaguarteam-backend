import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context, callback) {
  console.log('Executing updateTeacher')
  if (!event.body) {
    return failure({ status: false, message: 'POST data expected' });
  }

  // Validates if the payload was provided or not
  console.log(`event.body: ${event.body}`)
  if (!event.body) {
    return failure({ status: false, message: 'PUT data expected' })
  }
  
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Creates the object to be saved
  const item = {
    id: data.id,
    cityId: data.cityId,
    birthDate: data.birthDate,
    bio: data.bio,
    motherCountryId: data.motherCountryId,
    teacherType: data.teacherType,
    teacherPrice: data.teacherPrice,
    availability: data.availability
  }

  try {
    // Saves the object
    console.log(`item: ${item}`)
    const results = await dao.updateTeacher(item)
    console.log(`results: ${JSON.stringify(results)}`);

    // Return status code 200
    if (results.affectedRows === 1) {
      const teacher = await dao.getTeacher(item.id)
      console.log(`teacher: ${JSON.stringify(teacher)}`)
      return success(teacher)
    } else {
      return success(results);
    }
    
  } catch(error) {
    // Return status code 500
    console.log(error)
    return failure({ status: false, message: error });
  }

}