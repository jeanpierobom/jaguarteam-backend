import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing getUserById')

	try {

    // Obtain parameters
		if (!event.pathParameters || !event.pathParameters.id) {
			return failure({ status: false, message: 'ID not provided' })
		}

		let id = event.pathParameters.id

		// Retrieves the user
		const results = await dao.getUser(id)
		if (!results) {
			return failure({ status: false, message: `User not found with ID ${id}` })
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
