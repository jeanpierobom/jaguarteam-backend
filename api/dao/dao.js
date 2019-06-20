const pool = require('../util/database')

class Dao {

  /**
   * Retrieves a list of city
   */
  async listCity() {
    // Define query
    const query = `
    SELECT 
      city.id, city.name,
      city.country_id AS countryId, country.name as countryName
    FROM city
    LEFT JOIN country ON country.id = city.country_id
    ORDER BY city.name, country.name`

    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a list of class type
   */
  async listClassType() {
    // Define query
    const query = 'SELECT DISTINCT class_type.name FROM class_type ORDER BY class_type.name'

    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a list of country
   */
  async listCountry() {
    // Define query
    const query = 'SELECT country.id, country.name FROM country ORDER BY country.name'

    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a list of language
   */
  async listLanguage() {
    // Define query
    const query = 'SELECT language.id, language.name FROM language ORDER BY language.name'
    
    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a list of student
   */
  async listStudent() {
    // Define query
		let query = `
		SELECT
      user.id,
      user.email,
      user.name,
      user.city_id AS cityId,
      city.name as cityAsString,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
			(SELECT AVG(class.rating_to_student) FROM class WHERE class.student_id = user.id AND class.class_completed) AS averageRatingToStudent
		FROM user
		LEFT JOIN city ON city.id = user.city_id
		LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user_type = "S"
    ORDER BY averageRatingToStudent DESC, name`

    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a list of teacher
   */
  async listTeacher(cityId, languageId, date) {
    // Define query
		let query = `
		SELECT
      user.id,
      user.email,
      user.name,
      user.city_id AS cityId,
      city.name as cityAsString,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
			(SELECT GROUP_CONCAT(language.name)
				FROM language, teacher_language
				WHERE teacher_language.language_id = language.id
				AND teacher_language.teacher_id = user.id) AS languages,
			user.teacher_type AS teacherType,
			user.teacher_price AS teacherPrice,
			(SELECT AVG(class.rating_to_teacher) FROM class WHERE class.teacher_id = user.id AND class.class_completed) AS averageRatingToTeacher
		FROM user
		LEFT JOIN city ON city.id = user.city_id
		LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user_type = "T"`
    
    // Filter by city
		if (cityId) {
			query += ` AND city_id = ${cityId}`
		}

		// Filter by language
		if (languageId) {
			query += ` AND user.id IN (SELECT teacher_language.teacher_id FROM teacher_language WHERE teacher_language.language_id = ${languageId})`
    }

    // TODO filter by date
    if (date) {

    }

    query += ` ORDER BY averageRatingToTeacher DESC, name`

    // Executes the query and return results
    const result = await pool.query(query)
    return result
  }

  /**
   * Retrieves a student by ID
   * @param {*} studentId 
   */
  async getStudent(studentId) {
    if (!studentId) {
      return null;
    }

    // Define query
    let query = `
    SELECT
      user.id,
      user.email,
      user.name,
      user.city_id AS cityId,
      city.name as cityAsString,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
      (SELECT AVG(class.rating_to_student) FROM class WHERE class.student_id = user.id AND class.class_completed) AS averageRatingToStudent
    FROM user
    LEFT JOIN city ON city.id = user.city_id
    LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user.id = ?`

    const result = await pool.query(query, [studentId])
    return result[0]
  }

  /**
   * Retrieves the student ratings
   * @param {*} studentId 
   */
  async getStudentRatings(studentId) {
    if (!studentId) {
      return null;
    }

    // Define query
    let query = `
    SELECT class.rating_to_student AS score, class.review_to_student AS comment, teacher.name AS author
    FROM class
    INNER JOIN user AS teacher ON teacher.id = class.teacher_id
    WHERE class.class_completed AND class.student_id = ?
    ORDER BY score DESC, author`

    const result = await pool.query(query, [studentId])
    return result
  }

  /**
   * Retrieves a teacher by ID
   * @param {*} teacherId 
   */
  async getTeacher(teacherId) {
    if (!teacherId) {
      return null;
    }

    // Define query
    let query = `
    SELECT
      user.id,
      user.email,
      user.name,
      user.city_id AS cityId,
      city.name as cityAsString,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
      user.teacher_type AS teacherType,
      user.teacher_price AS teacherPrice,
      (SELECT AVG(class.rating_to_teacher) FROM class WHERE class.teacher_id = user.id AND class.class_completed) AS averageRatingToTeacher
    FROM user
    LEFT JOIN city ON city.id = user.city_id
    LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user.id = ?`

    // (SELECT GROUP_CONCAT(language.name)
    // FROM language, teacher_language
    // WHERE teacher_language.language_id = language.id
    // AND teacher_language.teacher_id = user.id) AS languages,

    // (SELECT
    //   CONCAT(
    //     '[',
    //     GROUP_CONCAT(
    //       JSON_OBJECT(
    //         'id', class_type.id,
    //         'name', class_type.name,
    //         'description', class_type.description
    //       )
    //     ),
    //   ']')
    // FROM class_type
    // WHERE class_type.teacher_id = user.id) AS classTypes,

    const result = await pool.query(query, [teacherId])
    return result[0]
  }

  /**
   * Retrieves the teacher languages
   * @param {*} teacherId 
   */
  async getTeacherLanguages(teacherId) {
    if (!teacherId) {
      return null;
    }

    // Define query
    let query = `
    SELECT language.name
    FROM language, teacher_language
    WHERE teacher_language.language_id = language.id AND teacher_language.teacher_id = ?`

    const result = await pool.query(query, [teacherId])
    return result
  }

  /**
   * Retrieves the teacher class types
   * @param {*} teacherId 
   */
  async getTeacherClassTypes(teacherId) {
    if (!teacherId) {
      return null;
    }

    // Define query
    let query = `
    SELECT class_type.name
    FROM class_type
    WHERE class_type.teacher_id = ?`

    const result = await pool.query(query, [teacherId])
    return result
  }

  /**
   * Retrieves the teacher availability
   * @param {*} teacherId 
   */
  async getTeacherAvailability(teacherId) {
    if (!teacherId) {
      return null;
    }

    // Define query
    let query = `
    SELECT day_of_week AS dayOfWeek, begin, end
    FROM teacher_availability
    WHERE teacher_id = ?`

    const result = await pool.query(query, [teacherId])
    return result
  }

  /**
   * Retrieves the teacher ratings
   * @param {*} teacherId 
   */
  async getTeacherRatings(teacherId) {
    if (!teacherId) {
      return null;
    }

    let query = `
    SELECT 
      class.rating_to_teacher AS score,
      class.review_to_teacher AS comment,
      student.name AS author,
      DATE_FORMAT(class.date, '%Y-%m-%d') AS date
    FROM class
    INNER JOIN user AS student ON student.id = class.student_id
    WHERE class.class_completed AND class.teacher_id = ?
    ORDER BY score DESC, author`

    const result = await pool.query(query, [teacherId])
    return result
  }

  /**
   * Retrieves a user by ID
   * @param {*} userId 
   */
  async getUser(userId) {
    if (!userId) {
      return null;
    }

    // Define query
    let query = `
    SELECT
      user.id,
      user.email,
      user.user_type AS userType,
      user.name,
      user.city_id AS cityId,
      city.name as cityAsString,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName
    FROM user
    LEFT JOIN city ON city.id = user.city_id
    LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user.id = ?`

    const result = await pool.query(query, [userId])
    return result[0]
  }

  /**
   * Creates a new teacher in the database
   * @param {*} teacher 
   */
  async createTeacher(teacher) {
    // const query = 
    //     `INSERT INTO user
    //     (email, password, user_type, name, city_id, birth_date, bio, mother_country_id, teacher_type, teacher_price)
    //     VALUES ('${teacher.email}', '${teacher.password}', '${teacher.userType}', '${teacher.name}', ${teacher.cityId}, '${teacher.birthDate}',
    //     '${teacher.bio}', ${teacher.motherCountryId}, '${teacher.teacherType}', '${teacher.teacherPrice}')`
    // const result = await pool.query(query)

    const query = 
        `INSERT INTO user
        (email, password, user_type, name, city_id, birth_date, bio, mother_country_id, teacher_type, teacher_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [teacher.email, teacher.password, teacher.userType, teacher.name, teacher.cityId, teacher.birthDate, teacher.bio, teacher.motherCountryId, teacher.teacherType, teacher.teacherPrice]
    const result = await pool.query(query, params)
    return result
  }

  /**
   * Creates a new user in the database
   * @param {*} user 
   */
  async createUser(user) {
    const query = 
        `INSERT INTO user
        (email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [user.email, user.password, user.userType, user.name, user.cityId, user.birthDate, user.bio, user.motherCountryId]
    const result = await pool.query(query, params)
    return result
  }

  /**
   * Updates an existing teacher in the database
   * @param {*} teacher 
   */
  async updateTeacher(teacher) {
    const fieldsToUpdate = []

    // Identify fields to be updated
    if (teacher.cityId) {
      fieldsToUpdate.push(`city_id = ${teacher.cityId}`)
    }

    if (teacher.birthDate) {
      fieldsToUpdate.push(`birth_date = '${teacher.birthDate}'`)
    }

    if (teacher.bio) {
      fieldsToUpdate.push(`bio = '${teacher.bio}'`)
    }

    if (teacher.motherCountryId) {
      fieldsToUpdate.push(`mother_country_id = ${teacher.motherCountryId}`)
    }

    if (teacher.teacherType) {
      fieldsToUpdate.push(`teacher_type = '${teacher.teacherType}'`)
    }

    if (teacher.teacherPrice) {
      fieldsToUpdate.push(`teacher_price = ${teacher.teacherPrice}`)
    }

    // const query = 
    //     `UPDATE user SET
    //       city_id = ${teacher.cityId},
    //       birth_date = '${teacher.birthDate}',
    //       bio = '${teacher.bio}',
    //       mother_country_id = ${teacher.motherCountryId},
    //       teacher_type = '${teacher.teacherType}',
    //       teacher_price = ${teacher.teacherPrice}
    //     WHERE id = ${teacher.id}`

    const query = `UPDATE user SET ${fieldsToUpdate.join(', ')} WHERE id = ${teacher.id}`
    console.log(`query: ${query}`)
    const result = await pool.query(query)

    if (teacher.availability) {
      const queryDeleteAvailability = `DELETE FROM teacher_availability WHERE teacher_id = ${teacher.id}`
      await pool.query(queryDeleteAvailability)

      for (let a of teacher.availability) {
        const queryInsertAvailability = `INSERT INTO teacher_availability (teacher_id, day_of_week, begin, end) 
          VALUES (${teacher.id}, ${a.dayOfWeek}, '${a.timeStart}', '${a.timeEnd}')`
          await pool.query(queryInsertAvailability)
      }
    }

    if (teacher.classTypes) {
      const queryDeleteClassTypes = `DELETE FROM class_type WHERE teacher_id = ${teacher.id}`
      await pool.query(queryDeleteClassTypes)

      for (let t of teacher.classTypes) {
        const queryInsertClassType = `INSERT INTO class_type (name, teacher_id, description) 
          VALUES ('${t}', ${teacher.id}, ' ')`
          await pool.query(queryInsertClassType)
      }
    }

    return result
  }

  /**
   * Updates an existing user in the database
   * @param {*} user
   */
  async updateUser(user) {
    const fieldsToUpdate = []

    // Identify fields to be updated
    if (user.userType) {
      fieldsToUpdate.push(`user_type = '${user.userType}'`)
    }

    if (user.cityId) {
      fieldsToUpdate.push(`city_id = ${user.cityId}`)
    }

    if (user.birthDate) {
      fieldsToUpdate.push(`birth_date = '${user.birthDate}'`)
    }

    if (user.bio) {
      fieldsToUpdate.push(`bio = '${user.bio}'`)
    }

    if (user.motherCountryId) {
      fieldsToUpdate.push(`mother_country_id = ${user.motherCountryId}`)
    }

    const query = `UPDATE user SET ${fieldsToUpdate.join(', ')} WHERE id = ${user.id}`
    console.log(`query: ${query}`)
    const result = await pool.query(query)

    return result
  }

  // async delete(todoId) {
  //     try {
  //         const query = 
  //             `DELETE FROM todoList
  //             WHERE todoId = ${todoId}`
  //         const result = await pool.query(query)
  //         return result
  //     } catch(error) {
  //         console.log(error)
  //     }
  // }

}

const dao = new Dao()
module.exports = dao