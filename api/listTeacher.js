// import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

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
	const teachers = [
		{
			email: 'name1@email.com',
			name: 'Name1',
			cityId: 1,
			cityAsString: 'Vancouver',
			birthDate: '2019-05-31',
			bio: 'bio text',
			motherCountryId: 1,
			motherCountryAsString: 'Canada',
			price: 15,
			languages: [
				"string"
			],
			classTypes: [
				{ "id": 1, "name": "Hiking at Grouse Mountain" },
				{ "id": 2, "name": "Groceries" },
				{ "id": 3, "name": "Visit Canada Place" },
			]
		},
		{
			email: 'name2@email.com',
			name: 'Name2',
			cityId: 1,
			cityAsString: 'Vancouver',
			birthDate: '2019-05-31',
			bio: 'bio text',
			motherCountryId: 1,
			motherCountryAsString: 'Canada',
			price: 15,
			languages: [
				"string"
			],
			classTypes: [
				{ "id": 1, "name": "Meeting at a Cafe" },
				{ "id": 2, "name": "Visit a bank" },
				{ "id": 3, "name": "Visit Science Center" },
			]
		}
	]

  try {
    //const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(teachers);
  } catch (e) {
    return failure({ status: false });
  }
}