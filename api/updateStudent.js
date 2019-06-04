import headers from './util/headers';

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Return status code 200 and the newly created item
  const Item = {
    code: 0,
    type: "string",
    message: "string"
  }
  
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(Item)
  };
  
  callback(null, response);  
}