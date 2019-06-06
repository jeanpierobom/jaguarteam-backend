import { success, failure } from "./libs/response-lib";
const pool = require('./util/database')

export async function main(event, context) {
  try {
		// Define query
		const SQL = `
		SELECT 
			city.id, city.name,
			city.country_id AS countryId, country.name as countryName
		FROM city
		LEFT JOIN country ON country.id = city.country_id
		ORDER BY city.name, country.name`;

		// Run query
		const results = await pool.query(SQL)
    // Return results in response body
    return success(results);
  } catch (e) {
		console.log('There was an error: ' + e)
    return failure({ status: false, message: e.message });
  }
}