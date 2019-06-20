import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing listClassType')

		try {
			// Retrieves a list of class type
			const results = await dao.listClassType()
	
			// Return status code 200
			console.log(`results: ${JSON.stringify(results)}`)
			return success(results)

	} catch(error) {
			// Return status code 500
			console.log(error)
			return failure({ status: false, message: error });
		}		

}