import { success, failure } from "./libs/response-lib";
const pool = require('./util/database')

export async function main(event, context) {
  try {
		// Define query
		const SQL = 'SELECT country.id, country.name FROM country ORDER BY country.name';
		// Run query
		const results = await pool.query(SQL)
    // Return results in response body
    return success(results);
  } catch (e) {
		console.log('There was an error: ' + e)
    return failure({ status: false, message: e.message });
  }
}