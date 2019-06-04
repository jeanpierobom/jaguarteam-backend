import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

	const teacher = {
		id: 1,
		email: 'name1@email.com',
		name: 'Name1',
		cityId: 1,
		cityAsString: 'Vancouver',
		birthDate: '2019-05-31',
		bio: 'bio text',
		motherCountryId: 1,
		motherCountryAsString: 'Canada',
		languages: [
			"string"
		],
		classTypes: [
			{ "id": 1, "name": "Hiking at Grouse Mountain" },
			{ "id": 2, "name": "Groceries" },
			{ "id": 3, "name": "Visit Canada Place" },
		]
	};

  try {
    return success(teacher);
  } catch (e) {
    return failure({ status: false });
  }
	
}