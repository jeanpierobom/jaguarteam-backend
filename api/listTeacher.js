import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing listTeacher')

	try {
		// Obtain parameters
		let cityId, languageId, date 
		const data = event.queryStringParameters
		if (data) {
			cityId = data.cityId
			languageId = data.languageId
			date = data.date
		}

		// Retrieves a list of teacher
		const results = await dao.listTeacher(cityId, languageId, date)

		if (results) {
      for (let r of results) {
				r.classTypes = await dao.getTeacherClassTypes(r.id)
				r.ratings = await dao.getTeacherRatings(r.id)
				r.availability = await dao.getTeacherAvailability(r.id)
      }
    }

		// Return status code 200
		console.log(`results: ${JSON.stringify(results)}`)
		return success(results)

	} catch(error) {
		// Return status code 500
		console.log(error)
		return failure({ status: false, message: error })
	}

}
