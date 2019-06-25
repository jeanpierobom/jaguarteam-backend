import { success, failure } from "./libs/response-lib";
const Joi = require('@hapi/joi');
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
    availability: data.availability,
    classTypes: data.classTypes,
    languages: data.languages
  }

  // // Create the validation schema
  // const schema = Joi.object().keys({
  //   id: Joi.number().integer().min(1),
  //   cityId: Joi.number().integer().min(1),
  //   birthDate: Joi.date().iso(),
  //   bio: Joi.string(),
  //   motherCountryId: Joi.number().integer().min(1),
  //   teacherType: Joi.string().min(1).max(1),
  //   teacherPrice: Joi.number(),
  //   availability: Joi.array().items({
  //     dayOfWeek: Joi.number().integer().min(1).max(7),
  //     timeStart: Joi.string().min(8).max(8),
  //     timeEnd: Joi.string().min(8).max(8)
  //   }),
  //   classTypes: Joi.array().items(Joi.string()),
  //   languages: Joi.array().items(Joi.integer())
  // });

  // // Validate
  // const validationResult = Joi.validate(item, schema);
  // console.log(`validationResult: ${JSON.stringify(validationResult)}`)
  // if (validationResult && validationResult.error) {
  //   return failure({ status: false, message: validationResult.error.details })
  // }
  
  try {
    // Saves the object
    console.log(`item: ${item}`)
    const results = await dao.updateTeacher(item)
    console.log(`results: ${JSON.stringify(results)}`);

    // Return status code 200
    if (results.affectedRows === 1) {
      const teacher = await dao.getTeacher(item.id)

			// Retrieves the teacher languages
			const languages = await dao.getTeacherLanguages(item.id)
			if (languages) {
				teacher.languages = languages
			}

			// Retrieves the teacher class types
			const classTypes = await dao.getTeacherClassTypes(item.id)
			if (classTypes) {
				teacher.classTypes = classTypes
			}
			
			// Retrieves the teacher availability
			const availability = await dao.getTeacherAvailability(item.id)
			if (availability) {
				teacher.availability = availability
			}

			// Retrieves the teacher ratings
			const ratings = await dao.getTeacherRatings(item.id)
			if (ratings) {
				teacher.ratings = ratings
			}

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