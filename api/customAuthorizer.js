// Reference
// https://yos.io/2017/09/03/serverless-authentication-with-jwt/

//const _ = require('lodash');
const jwt = require('jsonwebtoken');
//const utils = require('../lib/utils');
const utils = require('./util/iamUtils');
import config from './util/config'

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

// Returns a boolean whether or not a user is allowed to call a particular method
// A user with scopes: ['pangolins'] can
// call 'arn:aws:execute-api:ap-southeast-1::random-api-id/dev/GET/pangolins'
const authorizeUser = (userId, userScopes, methodArn) => {
  // const hasValidScope = _.some(userScopes, scope => _.endsWith(methodArn, scope));
  // return hasValidScope;
  // There are no different scopes

  // Return true if there is a user
  if (userId) {
    return true;
  } else {
    return false;
  }
};

/**
  * Authorizer functions are executed before your actual functions.
  * @method authorize
  * @param {String} event.authorizationToken - JWT
  * @throws Returns 401 if the token is invalid or has expired.
  * @throws Returns 403 if the token does not have sufficient permissions.
  */
module.exports.handler = async (event, context, callback) => {
  console.log('Executing customAuthorizer')
  const authorizationToken = event.authorizationToken;
  console.log(`authorizationToken: ${JSON.stringify(authorizationToken)}`)

  try {
    const tokenType = authorizationToken.split(' ')[0]
    // Google = Bearer, Outcom = JWT
    const token = authorizationToken.split(' ')[1]
    console.log(`tokenType: ${tokenType} - token: ${token}`)

    if (!tokenType || !token) {
      throw new Error('Token and/or token type were not provided')
    }

    let user = null;
    let userId = null;
    // Google Token
    if (tokenType === 'Bearer') {
      // Verify the Google Token
      console.log('Starting verification of Google Token')
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      console.log('Payload of Google Token JSON: ' + JSON.stringify(payload))
      user = payload;
      userId = payload['sub'];
      console.log('Userid of Google Token: ' + userId)

    } else { // Outcom Token
      // Verify JWT Outcom Token
      console.log('Starting verification of JWT Outcom Token')
      const decoded = jwt.verify(token, config.oauthSecret);
      console.log(`decoded: ${JSON.stringify(decoded)}`)
      user = decoded.user;
      userId = user.email;
      console.log('Userid of Outcom Token: ' + userId)
    }

    console.log(`user: ${JSON.stringify(user)}`)

    // // Checks if the user's scopes allow her to call the current function
    const isAllowed = authorizeUser(userId, user.scopes, event.methodArn);
    const effect = isAllowed ? 'Allow' : 'Deny';
    const authorizerContext = { user: JSON.stringify(user) };
    // Return an IAM policy document for the current endpoint
    const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

    callback(null, policyDocument);
  } catch (e) {
    console.log(`e: ${e}`)
    console.log('Problem to verify Token');
    callback('Unauthorized'); // Return a 401 Unauthorized response
  }
};