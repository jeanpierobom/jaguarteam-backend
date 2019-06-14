const pool = require('../util/database')

class Dao {

    // async list() {
    //     try {
    //         const query = 'SELECT * FROM todoList ORDER BY todoStatus, todoDueBy, todoItem'
    //         const result = await pool.query(query)
    //         return result
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // async get(todoId) {
    //     try {
    //         const query = `SELECT * FROM todoList WHERE todoId = ${todoId}`
    //         const result = await pool.query(query)
    //         return result[0]
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    async createTeacher(teacher) {
      const query = 
          `INSERT INTO user
          (email, password, user_type, name, city_id, birth_date, bio, mother_country_id, teacher_type, teacher_price)
          VALUES ('${teacher.email}', '${teacher.password}', '${teacher.userType}', '${teacher.name}', ${teacher.cityId}, '${teacher.birthDate}',
          '${teacher.bio}', ${teacher.motherCountryId}, '${teacher.teacherType}', '${teacher.teacherPrice}')`
      const result = await pool.query(query)
      return result
    }

    async updateTeacher(teacher) {
      const query = 
          `UPDATE user SET
            city_id = ${teacher.cityId},
            birth_date = '${teacher.birthDate}',
            bio = '${teacher.bio}',
            mother_country_id = ${teacher.motherCountryId},
            teacher_type = '${teacher.teacherType}',
            teacher_price = ${teacher.teacherPrice}
          WHERE id = ${teacher.id}`
      console.log(query)
      const result = await pool.query(query)

      if (teacher.availability) {
        const queryDeleteAvailability = `DELETE FROM teacher_availability WHERE teacher_id = ${teacher.id}`
        await pool.query(queryDeleteAvailability)

        for (let a of teacher.availability) {
          console.log(`availability: ${a}`)
          const queryInsertAvailability = `INSERT INTO teacher_availability (teacher_id, day_of_week, begin, end) 
           VALUES (${teacher.id}, ${a.dayOfWeek}, '${a.timeStart}', '${a.timeEnd}')`
           await pool.query(queryInsertAvailability)
        }
      }

      return result
    }

    // async update(todoId, todoItem, todoStatus, todoDueBy) {
    //     try {
    //         const query = 
    //             `UPDATE todoList
    //             SET todoItem = '${todoItem}', todoStatus = '${todoStatus}', todoDueBy = '${todoDueBy}'
    //             WHERE todoId = ${todoId}`
    //         const result = await pool.query(query)
    //         return result
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

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