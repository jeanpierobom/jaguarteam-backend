const pool = require('../util/database')

const NUMBER_OF_DAYS_CALENDAR = 5

class Dao {

  /**
   * Returns a user based on the email and password
   */
  async login(email, password) {
    if (!email || !password) {
      return null;
    }

    // Define query
    let query = `
    SELECT user.id, user.email, user.name, user.user_type AS userType
    FROM user
    WHERE user.email = ? AND user.password = ?`

    const result = await pool.query(query, [email, password])
    if (result) return result[0]
    return result
  }

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
   * Retrieves a list of class
   */
  async listClass(studentId, teacherId, upcoming, past) {
    // Define query
    let query = `
    SELECT
      class.id,
      student.id AS studentId,
      student.name AS studentName,
      student.email AS studentEmail,
      student_city.name AS studentCity,
      teacher.id AS teacherId,
      teacher.name AS teacherName,
      teacher.email AS teacherEmail,
      teacher_city.name AS teacherCity,
      DATE_FORMAT(class.date, '%Y-%m-%d') AS date,
      class.start_time AS startTime,
      TIME_FORMAT(class.duration, '%H:%i') AS duration,
      class.class_type AS classType,
      class.location,
      class.location_lat AS locationLat,
      class.location_long AS locationLong,
      class.price,
      class.class_completed,
      class.rating_to_teacher AS ratingToTeacher,
      class.review_to_teacher AS reviewToTeacher,
      class.rating_to_student AS ratingToStudent,
      class.review_to_student AS reviewToStudent,
      class.message
    FROM class
    LEFT JOIN user AS student ON class.student_id = student.id
    LEFT JOIN city AS student_city ON student.city_id = student_city.id
    LEFT JOIN user AS teacher ON class.teacher_id = teacher.id
    LEFT JOIN city AS teacher_city ON teacher.city_id = teacher_city.id
    WHERE 1=1 `

    // Filter by student
		if (studentId) {
			query += ` AND student_id = ${studentId}`
		}

    // Filter by teacher
		if (teacherId) {
			query += ` AND teacher_id = ${teacherId}`
    }
    
    // Only upcoming classes
    if (upcoming) {
			query += ` AND DATE(class.date) >= DATE(DATE_ADD(now(), INTERVAL -7 HOUR))`
    } else if (past) {
			query += ` AND DATE(class.date) < DATE(DATE_ADD(now(), INTERVAL -7 HOUR))`
    }

    query += ` ORDER BY class.date DESC, studentName, teacherName`
    
    //date -s "14 JUL 2019 6:18:00 PM"

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
      city.name as cityName,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
			user.teacher_type AS teacherType,
			user.teacher_price AS price,
			(SELECT GROUP_CONCAT(language.name)
				FROM language, teacher_language
				WHERE teacher_language.language_id = language.id
				AND teacher_language.teacher_id = user.id) AS language,
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
   * Retrieves a class by ID
   * @param {*} classId 
   */
  async getClass(classId) {
    if (!classId) {
      return null;
    }

    // Define query
    let query = `
    SELECT
      class.id,
      student.id AS studentId,
      student.name AS studentName,
      student.email AS studentEmail,
      student_city.name AS studentCity,
      teacher.id AS teacherId,
      teacher.name AS teacherName,
      teacher.email AS teacherEmail,
      teacher_city.name AS teacherCity,
      DATE_FORMAT(class.date, '%Y-%m-%d') AS date,
      class.start_time AS startTime,
      TIME_FORMAT(class.duration, '%H:%i') AS duration,
      class.class_type AS classType,
      class.location,
      class.location_lat AS locationLat,
      class.location_long AS locationLong,
      class.price,
      class.class_completed AS classCompleted,
      class.rating_to_teacher AS ratingToTeacher,
      class.review_to_teacher AS reviewToTeacher,
      class.rating_to_student AS ratingToStudent,
      class.review_to_student AS reviewToStudent,
      class.message
    FROM class
    LEFT JOIN user AS student ON class.student_id = student.id
    LEFT JOIN city AS student_city ON student.city_id = student_city.id
    LEFT JOIN user AS teacher ON class.teacher_id = teacher.id
    LEFT JOIN city AS teacher_city ON teacher.city_id = teacher_city.id
    WHERE class.id = ?`

    const result = await pool.query(query, [classId])
    return result[0]
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
      city.name as cityName,
      DATE_FORMAT(user.birth_date, '%Y-%m-%d') AS birthDate,
      user.bio,
      user.mother_country_id AS motherCountryId,
      country.name as motherCountryName,
      user.teacher_type AS teacherType,
      user.teacher_price AS price,
      (SELECT GROUP_CONCAT(language.name)
      FROM language, teacher_language
      WHERE teacher_language.language_id = language.id
      AND teacher_language.teacher_id = user.id) AS language,
      (SELECT AVG(class.rating_to_teacher) FROM class WHERE class.teacher_id = user.id AND class.class_completed) AS averageRatingToTeacher
    FROM user
    LEFT JOIN city ON city.id = user.city_id
    LEFT JOIN country ON country.id = user.mother_country_id
    WHERE user.id = ?`

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
   * Retrieves the teacher slots books
   * @param {*} teacherId 
   */
  async getTeacherSlotsBooked(teacherId) {
    if (!teacherId) {
      return null;
    }

    let query = `
    SELECT
      DISTINCT
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
      start_time
    FROM class 
    WHERE teacher_id = ?
    AND date BETWEEN date_add(now(), INTERVAL -5 DAY) AND date_add(now(), INTERVAL 5 DAY)
    ORDER BY date`

    const slotsBooked = await pool.query(query, [teacherId])
    return slotsBooked
  }

  async getSlotsBooked(teacherId) {
    if (!teacherId) {
      return null;
    }

    let query = `
    SELECT
      DISTINCT
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
      start_time AS startTime
    FROM class 
    WHERE teacher_id = ?
    AND date BETWEEN date_add(now(), INTERVAL -1 DAY) AND date_add(now(), INTERVAL ${NUMBER_OF_DAYS_CALENDAR} DAY)
    ORDER BY date`

    const slotsBooked = await pool.query(query, [teacherId])
    return slotsBooked
  }

  getCalendarDates() {
    const dates = []

    var date = new Date()
    for (let i = 0; i < 5; i++) {
      dates.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
      date = new Date(date.getDate() + 1)
    }

    return dates
  }

  getCalendarTimes() {
    return ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
  }

  /**
   * Retrieves the teacher availability
   * @param {*} teacherId 
   */
  async getTeacherAvailability(teacherId) {
    if (!teacherId) {
      return null;
    }

    // Load slots booked
    const slotsBooked = await this.getSlotsBooked(teacherId)

    const availability = []
    var date = new Date()
    for (let i = 0; i < NUMBER_OF_DAYS_CALENDAR; i++) {
      let dateEntry = {}
      //dateEntry.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      dateEntry.date = date.toISOString().slice(0,10)
      dateEntry.timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']

      // Remove slots already booked
      try {
        for (var slot of slotsBooked) {
          if (slot.date == dateEntry.date) {
            for( var j = 0; j < dateEntry.timeSlots.length; j++){ 
              if ( dateEntry.timeSlots[j] === slot.startTime) {
                dateEntry.timeSlots.splice(j, 1); 
                j--;
              }
            }
          }
        }
      } catch(e) {
        console.log(`An error has occured while removing a slot already booked ${e}`)
      }
  
      availability.push(dateEntry)
      date.setDate(date.getDate() + 1)
    }


    return availability
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
   * Creates a new class in the database
   * @param {*} class 
   */
  async createClass(klass) {
    klass.classCompleted = false
    const query = 
        `INSERT INTO class
        (student_id, teacher_id, date, start_time, duration, class_type, location, location_lat, location_long, price, class_completed, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [klass.studentId, klass.teacherId, klass.date, klass.startTime, klass.duration, klass.classType, klass.location, klass.locationLat, klass.locationLong, klass.price, klass.classCompleted, klass.message]
    const result = await pool.query(query, params)
    return result
  }

  /**
   * Creates a new teacher in the database
   * @param {*} teacher 
   */
  async createTeacher(teacher) {
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
   * Updates an existing class in the database
   * @param {*} klass 
   */
  async updateClass(klass) {
    const query = 
        `UPDATE class SET
          location = ?,
          location_lat = ?,
          location_long = ?,
          message = ?
        WHERE id = ?`

    console.log(`query: ${query}`)
    const params = [klass.location, klass.locationLat, klass.locationLong, klass.message, klass.id]
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

    if (teacher.languages) {
      const queryDeleteLanguages = `DELETE FROM teacher_language WHERE teacher_id = ${teacher.id}`
      await pool.query(queryDeleteLanguages)

      for (let l of teacher.languages) {
        const queryInsertLanguage = `INSERT INTO teacher_language (language_id, teacher_id) 
          VALUES (${l}, ${teacher.id})`
          await pool.query(queryInsertLanguage)
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

}

const dao = new Dao()
module.exports = dao