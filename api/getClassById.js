import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

	const student = {
		id: 1,
		email: 'name1@email.com',
		name: 'Name1',
		cityId: 1,
		cityAsString: 'Vancouver',
		birthDate: '2019-05-31',
		bio: 'bio text',
		motherCountryId: 1,
		motherCountryAsString: 'Canada'
	};

  try {
    return success(student);
  } catch (e) {
    return failure({ status: false });
  }
	
}