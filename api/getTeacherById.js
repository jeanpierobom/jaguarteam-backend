import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing getTeacherById')

	try {
		// Obtain parameters
		let id
		const data = event.queryStringParameters
		if (data) {
			id = data.id
		} else {
			return failure({ status: false, message: 'ID not provided' })
		}

		// Retrieves the teacher
		const results = await dao.getTeacher(id)
		if (!results) {
			return failure({ status: false, message: `Teacher not found with ID ${id}` })
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
