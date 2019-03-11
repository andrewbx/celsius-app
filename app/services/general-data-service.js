import axios from 'axios';
import apiUrl from './api-url';

const generalDataService = {
  getSupportedCurrencies,
  getBackendStatus,
  getBlacklisted,
  getCelsiusInitialData
};


/**
 * Gets all supported currency rates from db
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0c4f5f63-d1b5-418e-9097-5bb2afcac31e
 * @deprecated
 *
 * @returns {Promise}
 */
function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/currencies`);
}


/**
 * Gets application status from backend
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#089ffaed-d892-4fca-9b19-d0638b31325f
 *
 * @returns {Promise}
 */
function getBackendStatus() {
  return axios.get(`${apiUrl}/status`);
}


/**
 * Gets all general data needed for Celsius app (loan LTVs, interest rates...)
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#3e4af1fd-7b92-41de-bfc8-63927fd8792b
 *
 * @returns {Promise}
 */
function getCelsiusInitialData() {
  return axios.get(`${apiUrl}/initial_data`);
}


/**
 * Gets all blacklisted countries
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#926f2d55-8965-4716-abda-367771c3babe
 * @deprecated
 *
 * @returns {Promise}
 */
function getBlacklisted() {
  return axios.get(`${apiUrl}/countries/blacklist`)
}

export default generalDataService;
