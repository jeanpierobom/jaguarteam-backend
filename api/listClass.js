import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing listClass')

		try {
			// Obtain parameters
			let studentId, teacherId 
			const data = event.queryStringParameters
			if (data) {
				studentId = data.studentId
				teacherId = data.teacherId
			}

			// Retrieves a list of classes
			const results = await dao.listClass(studentId, teacherId)
	
			// Return status code 200
			console.log(`results: ${JSON.stringify(results)}`)
			return success(results)

	} catch(error) {
			// Return status code 500
			console.log(error)
			return failure({ status: false, message: error });
		}		

}