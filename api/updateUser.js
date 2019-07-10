import { success, failure } from "./libs/response-lib";
const Joi = require('@hapi/joi');
const dao = require('./dao/dao')

export async function main(event, context, callback) {
  console.log('Executing updateUser')
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
    userType: data.userType,
    cityId: data.cityId,
    birthDate: data.birthDate,
    bio: data.bio,
    motherCountryId: data.motherCountryId
  }

  // Create the validation schema
  const schema = Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
    userType: Joi.string().min(1).max(1),
    cityId: Joi.number().integer().min(1),
    birthDate: Joi.date().iso(),
    bio: Joi.string(),
    motherCountryId: Joi.number().integer().min(1)
  });

  // Validate
  const validationResult = Joi.validate(item, schema);
  console.log(`validationResult: ${JSON.stringify(validationResult)}`)
  if (validationResult && validationResult.error) {
    return failure({ status: false, message: validationResult.error.details })
  }
  
  try {
    // Saves the object
    console.log(`item: ${item}`)
    const results = await dao.updateUser(item)
    console.log(`results: ${JSON.stringify(results)}`);

    // Return status code 200
    if (results.affectedRows === 1) {
      const user = await dao.getUser(item.id)
      console.log(`user: ${JSON.stringify(user)}`)
      return success(user)
    } else {
      return success(results);
    }
    
  } catch(error) {
    // Return status code 500
    console.log(error)
    return failure({ status: false, message: error });
  }

}