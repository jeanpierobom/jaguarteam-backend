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

		// Retrieves a list of language
		const results = await dao.listTeacher(cityId, languageId, date)

		// Return status code 200
		console.log(`results: ${JSON.stringify(results)}`)
		return success(results)

	} catch(error) {
		// Return status code 500
		console.log(error)
		return failure({ status: false, message: error })
	}

}
