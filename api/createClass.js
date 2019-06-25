import { success, failure } from "./libs/response-lib";
const Joi = require('@hapi/joi');
const dao = require('./dao/dao')

export async function main(event, context, callback) {
  console.log('Executing createClass')

  // Validates if the payload was provided or not
  console.log(`event.body: ${event.body}`)
  if (!event.body) {
    return failure({ status: false, message: 'POST data expected' })
  }

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Creates the object to be saved
  const item = {
    studentId: data.studentId,
    teacherId: data.teacherId,
    date: data.date,
    startTime: data.startTime,
    duration: data.duration,
    classType: data.classType,
    location: data.location,
    locationLat: data.locationLat,
    locationLong: data.locationLong,
    price: data.price
  }

  // Create the validation schema
  const schema = Joi.object().keys({
    studentId: Joi.number().integer().min(1).required(),
    teacherId: Joi.number().integer().min(1).required(),
    date: Joi.date().iso().required(),
    startTime: Joi.string().min(8).max(8),
    duration: Joi.string().min(5).max(5).required(),
    classType: Joi.string().max(50),
    location: Joi.string().max(255),
    locationLat: Joi.string().max(30),
    locationLong: Joi.string().max(30),
    price: Joi.number()
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
    const results = await dao.createClass(item)
    console.log(`results: ${JSON.stringify(results)}`)

    // Store the ID of the object
    console.log(`results.insertId: ${JSON.stringify(results.insertId)}`)
    const id = results.insertId
    console.log(`id: ${id}`)

    // Return status code 200
    // Return the object that was saved
    if (id) {
      const klass = await dao.getClass(id)

      console.log(`klass: ${JSON.stringify(klass)}`)
      return success(klass)
    }
    
    // Or return results from database
    return success(results)
    
  } catch(error) {
    // Return status code 500
    console.log(error)
    return failure({ status: false, message: error })
  }

}

