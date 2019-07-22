// Reference
// https://yos.io/2017/09/03/serverless-authentication-with-jwt/

import { success, failure, forbidden } from "./libs/response-lib";
var jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const dao = require('./dao/dao')
import config from './util/config'

export async function main(event, context, callback) {
  console.log('Executing auth')

  // Validates if the payload was provided or not
  console.log(`event.body: ${event.body}`)
  if (!event.body) {
    return failure({ status: false, message: 'POST data expected' })
  }

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  // Creates the object to be saved
  const item = {
    email: data.email,
    password: data.password
  }

  try {
    
    // Return results
    // TODO hash password before saving into MySQL
    const user = await dao.login(item.email, item.password)
    console.log(`user: ${JSON.stringify(user)}`)
    if (!user || !user.id) {
      return forbidden({message: 'Invalid credentials'})
    }

    //const token = jwt.sign({user}, config.oauthSecret, { expiresIn: config.jwtExpirationTime })
    const token = jwt.sign({user}, config.oauthSecret)
    console.log(`token: ${token}`)
    return success({ id: user.id, token: token })

  } catch(error) {

    // Return status code 500
    console.log(error)
    return forbidden({ message: error || 'Error while logging user' })

  }

}
