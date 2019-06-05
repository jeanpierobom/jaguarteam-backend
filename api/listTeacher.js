// import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
//import mysql from "./util/database";
const pool = require('./util/database')

export async function main(event, context) {
//   const params = {
//     TableName: "notes",
//     // 'KeyConditionExpression' defines the condition for the query
//     // - 'userId = :userId': only return items with matching 'userId'
//     //   partition key
//     // 'ExpressionAttributeValues' defines the value in the condition
//     // - ':userId': defines 'userId' to be Identity Pool identity id
//     //   of the authenticated user
//     KeyConditionExpression: "userId = :userId",
//     ExpressionAttributeValues: {
//       ":userId": event.requestContext.identity.cognitoIdentityId
//     }
//   };

	// const teachers = [
	// 	{
	// 		email: 'name1@email.com',
	// 		name: 'Name1',
	// 		cityId: 1,
	// 		cityAsString: 'Vancouver',
	// 		birthDate: '2019-05-31',
	// 		bio: 'bio text',
	// 		motherCountryId: 1,
	// 		motherCountryAsString: 'Canada',
	// 		price: 15,
	// 		languages: [
	// 			"string"
	// 		],
	// 		classTypes: [
	// 			{ "id": 1, "name": "Hiking at Grouse Mountain" },
	// 			{ "id": 2, "name": "Groceries" },
	// 			{ "id": 3, "name": "Visit Canada Place" },
	// 		]
	// 	},
	// 	{
	// 		email: 'name2@email.com',
	// 		name: 'Name2',
	// 		cityId: 1,
	// 		cityAsString: 'Vancouver',
	// 		birthDate: '2019-05-31',
	// 		bio: 'bio text',
	// 		motherCountryId: 1,
	// 		motherCountryAsString: 'Canada',
	// 		price: 15,
	// 		languages: [
	// 			"string"
	// 		],
	// 		classTypes: [
	// 			{ "id": 1, "name": "Meeting at a Cafe" },
	// 			{ "id": 2, "name": "Visit a bank" },
	// 			{ "id": 3, "name": "Visit Science Center" },
	// 		]
	// 	}
	// ]

  try {
		// Run your query
		console.log('Starting execution, new method')
		const results = await pool.query('SELECT * FROM user WHERE user_type = "T"')
		console.log('Connected')
		// Run clean up function
		//await mysql.end()
	
		// Return the results
		// return results
	
		//const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(results);
  } catch (e) {
		console.log('There was an error')
		console.log(e);
		console.log(e.message);
    return failure({ status: false, message: e.message });
  }
}