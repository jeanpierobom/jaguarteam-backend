'use strict';

class ProviderConfig {
  constructor() {
    this.google = {
      host: 'www.googleapis.com',
      path: '/oauth2/v3/tokeninfo?id_token=',
      port: 443
    };
  }

  getGoogle() {
    return this.google;
  }

}

module.exports = ProviderConfig;