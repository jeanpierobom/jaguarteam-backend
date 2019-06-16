import { success, failure } from "./libs/response-lib";
const dao = require('./dao/dao')

export async function main(event, context) {
	console.log('Executing listCountry')

		try {
			// Retrieves a list of country
			const results = await dao.listCountry()
	
			// Return status code 200
			console.log(`results: ${JSON.stringify(results)}`)
			return success(results)

	} catch(error) {
			// Return status code 500
			console.log(error)
			return failure({ status: false, message: error });
		}		

}