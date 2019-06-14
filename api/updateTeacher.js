import { success, failure } from "./libs/response-lib";
import headers from './util/headers';
const dao = require('./dao/dao')

export async function main(event, context, callback) {
  console.log('createTeacher')
  console.log(`event.body: ${event.body}`)
  if (!event.body) {
    return failure({ status: false, message: 'POST data expected' });
  }

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Return status code 200 and the newly created item
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
    const results = await dao.updateTeacher(item)
    console.log(`results: ${JSON.stringify(results)}`);
    return success(results);
  } catch(error) {
    console.log(error)
    return failure({ status: false, message: error });
  }

}