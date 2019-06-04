import headers from './util/headers';

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Return status code 200 and the newly created item
  const Item = {
    id: data.id,
    studentId: data.studentId,
    teacherId: data.teacherId,
    date: data.date,
    duration: data.duration,
    classType: data.classType,
    location: data.location,
    price: data.price,
    classCompleted: data.classCompleted,
    ratingToTeacher: data.ratingToTeacher,
    ratingToStudent: data.ratingToStudent,
    reviewToTeacher: data.reviewToTeacher,
    reviewToStudent: data.reviewToStudent
  }

  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(Item)
  };

  callback(null, response);  
}