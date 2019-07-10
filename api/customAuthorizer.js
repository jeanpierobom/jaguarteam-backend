// Reference
// https://yos.io/2017/09/03/serverless-authentication-with-jwt/

//const _ = require('lodash');
const jwt = require('jsonwebtoken');
//const utils = require('../lib/utils');
const utils = require('./util/iamUtils');
import config from './util/config'

// Returns a boolean whether or not a user is allowed to call a particular method
// A user with scopes: ['pangolins'] can
// call 'arn:aws:execute-api:ap-southeast-1::random-api-id/dev/GET/pangolins'
const authorizeUser = (userScopes, methodArn) => {
  // const hasValidScope = _.some(userScopes, scope => _.endsWith(methodArn, scope));
  // return hasValidScope;
  
  // There are no different scopes
  return true;
};

/**
  * Authorizer functions are executed before your actual functions.
  * @method authorize
  * @param {String} event.authorizationToken - JWT
  * @throws Returns 401 if the token is invalid or has expired.
  * @throws Returns 403 if the token does not have sufficient permissions.
  */
module.exports.handler = (event, context, callback) => {
  console.log('Executing customAuthorizer')
  const token = event.authorizationToken;
  console.log(`token: ${JSON.stringify(token)}`)

  try {
    //TODO test
    const bearer = token.split(' ')[1]
    console.log(`bearer: ${bearer}`)

    // Verify JWT
    //const decoded = jwt.verify(token, config.oauthSecret);
    const decoded = jwt.verify(bearer, config.oauthSecret);
    console.log(`decoded: ${JSON.stringify(decoded)}`)
    const user = decoded.user;
    console.log(`user: ${JSON.stringify(user)}`)
    
    // Checks if the user's scopes allow her to call the current function
    const isAllowed = authorizeUser(user.scopes, event.methodArn);

    const effect = isAllowed ? 'Allow' : 'Deny';
    const userId = user.email;
    const authorizerContext = { user: JSON.stringify(user) };
    // Return an IAM policy document for the current endpoint
    const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

    callback(null, policyDocument);
  } catch (e) {
    console.log(`e: ${e}`)
    callback('Unauthorized'); // Return a 401 Unauthorized response
  }
};