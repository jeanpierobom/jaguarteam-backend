import { success, failure } from "./libs/response-lib";
const pool = require('./util/database')

export async function main(event, context) {
	// console.log(`event: ${event}`);
	// console.log(`event.queryStringParameters ${event.queryStringParameters}`);
	// console.log(`event.queryStringParameters.cityId ${event.queryStringParameters.cityId}`);
	// console.log(`event.queryStringParameters.languageId ${event.queryStringParameters.languageId}`);
	// console.log(`event.cityId ${event.cityId}`);
	// console.log(`event.languageId ${event.languageId}`);
	let data = event.queryStringParameters;
	console.log(`data: ${data}`);
	if (data) {
		console.log(`data.cityId: ${data.cityId}`);
		console.log(`data.languageId: ${data.languageId}`);
	}

  try {
		// Define query
		let SQL = `
		SELECT
			user.id, user.email, user.name,
			user.city_id AS cityId, city.name as cityAsString,
			user.birth_date AS birthDate, user.bio,
			user.mother_country_id AS motherCountryId, country.name as motherCountryName,
			(SELECT GROUP_CONCAT(language.name)
				FROM language, teacher_language
				WHERE teacher_language.language_id = language.id
				AND teacher_language.teacher_id = user.id) AS languages,
			(SELECT
				CONCAT(
					'[',
					GROUP_CONCAT(
						JSON_OBJECT(
							'id', class_type.id,
							'name', class_type.name,
							'description', class_type.description
						)
					),
				']')
			FROM class_type
			WHERE class_type.teacher_id = user.id) AS classTypes,
			user.teacher_type AS teacherType,
			user.teacher_price AS teacherPrice
		FROM user
		LEFT JOIN city ON city.id = user.city_id
		LEFT JOIN country ON country.id = user.mother_country_id
		WHERE user_type = "T"`;

		// Filter by city
		if (data && data.cityId) {
			SQL += ` AND city_id = ${data.cityId}`
		}

		// Filter by language
		if (data && data.languageId) {
			SQL += ` AND user.id IN (SELECT teacher_language.teacher_id FROM teacher_language WHERE teacher_language.language_id = ${data.languageId})`
		}

		// Run query
		const results = await pool.query(SQL)

    // Return results in response body
    return success(results);
  } catch (e) {
		console.log('There was an error: ' + e)
    return failure({ status: false, message: e.message })
  }
}

//(SELECT GROUP_CONCAT(CONCAT('{', id, ',''', class_type.name, ''',''', class_type.description, '''}'))