import axios from "axios";
import apiUrl from "./api-url";
import Constants from "../../constants";

const { ONFIDO_API_KEY } = Constants;

const userKYCService = {
  getKYCDocTypes,
  getUtilityBill,
  setUtilityBill,
  getPrimeTrustToULink,
  updateProfileAddressInfo,
  getProfileTaxpayerInfo,
  updateProfileTaxpayerInfo,
  startKYC,
  getKYCDocuments,
  ensureApplicant,
  getMobileSDKToken,
  saveKYCDocuments,
};

/**
 * Gets documents that Onfido supports for all countries
 *
 * @returns {Promise}
 */
function getKYCDocTypes() {
  return axios.get(`${apiUrl}/kyc/countries`);
}

/**
 * Gets Utility bill image
 *
 * @returns {Promise}
 */
function getUtilityBill() {
  return axios.get(`${apiUrl}/me/documents/utility_bill`);
}

/**
 * Sets utility bill image
 *
 * @param {Object} utilityBill
 * @returns {Promise}
 */
function setUtilityBill(utilityBill) {
  const formData = new FormData();
  formData.append("utility_bill_image", {
    name: "utility_bill_image.jpg",
    type: "image/jpg",
    uri: utilityBill.uri,
  });
  return axios.put(`${apiUrl}/user/profile/documents/utility_bill`, formData);
}

/**
 * Gets Link for Primetrust KYC ToU
 *
 * @returns {Promise}
 */
function getPrimeTrustToULink() {
  return axios.get(`${apiUrl}/kyc/primetrust/custodial_agreement_preview`);
}

/**
 * Updates address info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#55dd21a1-2e99-4c6d-865c-a605eaef5b57
 *
 * @param {Object} profileAddressInfo
 * @param {string} profileAddressInfo.country - eg. "Serbia"
 * @param {string} profileAddressInfo.state - US state
 * @param {string} profileAddressInfo.city - eg. "Beograd"
 * @param {string} profileAddressInfo.zip - eg. "11FG0"
 * @param {string} profileAddressInfo.street
 * @param {string} profileAddressInfo.building_number - eg. "456b"
 * @param {string} profileAddressInfo.flat_number
 * @return {Promise}
 */
function updateProfileAddressInfo(profileAddressInfo) {
  return axios.post(`${apiUrl}/me/address`, profileAddressInfo);
}

/**
 * Gets taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#46f917e4-9e14-4531-bebd-a11ccf9e1fc2
 *
 * @return {Promise}
 */
function getProfileTaxpayerInfo() {
  return axios.get(`${apiUrl}/me/taxpayer_info`);
}

/**
 * Updates taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ce921baa-1d5e-4cca-986c-ed1bcfb393ff
 *
 * @param {Object} profileTaxpayerInfo
 * @param {string} profileTaxpayerInfo.ssn
 * @param {string} profileTaxpayerInfo.itin
 * @param {string} profileTaxpayerInfo.national_id
 * @return {Promise}
 */
function updateProfileTaxpayerInfo(profileTaxpayerInfo) {
  return axios.post(`${apiUrl}/me/taxpayer_info`, profileTaxpayerInfo);
}

/**
 * Start the KYC process on Onfido for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0846a0d3-ae4f-4ee6-a6c0-fa38230b2f1c
 *
 * @returns {Promise}
 */
function startKYC() {
  return axios.post(`${apiUrl}/me/kyc/start`);
}

/**
 * Gets kyc documents for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#9dfb9269-c3af-4723-8ec9-f62b380b3892
 *
 * @returns {Promise}
 */
function getKYCDocuments() {
  return axios.get(`${apiUrl}/me/documents`);
}

/**
 * Creates/ensures applicant on Onfido
 *
 * @returns {Promise}
 */
function ensureApplicant() {
  return axios.get(`${apiUrl}/me/kyc/ensure_applicant`);
}

/**
 * Saves KYC doc ids from Onfido into db
 *
 * @param {Array} documents
 * @param {string} documents[].id - document id from Onfido
 * @param {string} documents[].type - passport|driving_licence|identity_card
 * @param {string} documents[].side - front|back
 * @returns {Promise}
 */
function saveKYCDocuments(documents) {
  return axios.put(`${apiUrl}/user/kyc/documents`, { documents });
}

/**
 * Gets OnfidoSDK mobile token
 *
 * @param {string} applicantId - applicant id from onfido
 * @returns {Promise}
 */
function getMobileSDKToken(applicantId) {
  return fetch("https://api.onfido.com/v3/sdk_token", {
    method: "POST",
    headers: {
      Authorization: `Token token=${ONFIDO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicant_id: applicantId,
      application_id: "network.celsius.wallet",
    }),
  });
}

export default userKYCService;
