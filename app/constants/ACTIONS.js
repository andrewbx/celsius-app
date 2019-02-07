export default {
  // api actions
  START_API_CALL: 'START_API_CALL',
  REFRESH_BOTTOM_NAVIGATION: 'REFRESH_BOTTOM_NAVIGATION',
  API_ERROR: 'API_ERROR',
  CLEAR_API_ERROR: 'CLEAR_API_ERROR',
  SET_INTERNET_CONNECTIVITY: 'SET_INTERNET_CONNECTIVITY',

  // branch actions
  BRANCH_LINK_REGISTERED: 'BRANCH_LINK_REGISTERED',
  CREATE_BRANCH_LINK_SUCCESS: 'CREATE_BRANCH_LINK_SUCCESS',
  SAVE_BRANCH_LINK_SUCCESS: 'SAVE_BRANCH_LINK_SUCCESS',
  GET_INDIVIDUAL_LINK_SUCCESS: 'GET_INDIVIDUAL_LINK_SUCCESS',

  // navigation actions
  NAVIGATE: 'Navigation/NAVIGATE',
  NAVIGATE_BACK: 'Navigation/BACK',
  NAVIGATION_RESET: 'Navigation/RESET',

  // general data actions
  GET_SUPPORTED_CURRENCIES_SUCCESS: 'GET_SUPPORTED_CURRENCIES_SUCCESS',
  GET_KYC_DOC_TYPES_SUCCESS: 'GET_KYC_DOC_TYPES_SUCCESS',
  GET_BACKEND_STATUS_SUCCESS: 'GET_BACKEND_STATUS_SUCCESS',

  // currencies actions
  GET_CURRENCY_RATES_SUCCESS: 'GET_CURRENCY_RATES_SUCCESS',
  GET_CURRENCY_GRAPHS_SUCCESS: 'GET_CURRENCY_GRAPHS_SUCCESS',

  // ui actions
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  SET_HEADER_HEIGHT: 'SET_HEADER_HEIGHT',
  TOGGLE_CAMERA: 'TOGGLE_CAMERA',
  FLIP_CAMERA: 'FLIP_CAMERA',
  TAKE_CAMERA_PHOTO: 'TAKE_CAMERA_PHOTO',
  UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
  UPDATE_FORM_FIELDS: 'UPDATE_FORM_FIELDS',
  ACTIVATE_CAMERA: 'ACTIVATE_CAMERA',
  DEACTIVATE_CAMERA: 'DEACTIVATE_CAMERA',
  RETAKE_PHOTO: 'RETAKE_PHOTO',
  INIT_FORM: 'INIT_FORM',
  CLEAR_FORM: 'CLEAR_FORM',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  CLEAR_FORM_ERRORS: 'CLEAR_FORM_ERRORS',
  SET_KEYBOARD_HEIGHT: 'SET_KEYBOARD_HEIGHT',
  SET_INPUT_LAYOUT: 'SET_INPUT_LAYOUT',
  CLEAR_INPUT_LAYOUTS: 'CLEAR_INPUT_LAYOUTS',
  SCROLL_TO: 'SCROLL_TO',
  SET_SCROLL_ELEMENT_LAYOUT: 'SET_SCROLL_ELEMENT_LAYOUT',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  FIRE_USER_ACTION: 'FIRE_USER_ACTION',
  SET_APP_THEME: 'SET_APP_THEME',
  OPEN_FAB_MENU: 'OPEN_FAB_MENU',
  CLOSE_FAB_MENU: 'CLOSE_FAB_MENU',

  // auth actions
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_TWITTER_SUCCESS: 'REGISTER_USER_TWITTER_SUCCESS',
  LOGIN_USER_TWITTER_SUCCESS: 'LOGIN_USER_TWITTER_SUCCESS',
  REGISTER_USER_FACEBOOK_SUCCESS: 'REGISTER_USER_FACEBOOK_SUCCESS',
  LOGIN_USER_FACEBOOK_SUCCESS: 'LOGIN_USER_FACEBOOK_SUCCESS',
  REGISTER_USER_GOOGLE_SUCCESS: 'REGISTER_USER_GOOGLE_SUCCESS',
  LOGIN_USER_GOOGLE_SUCCESS: 'LOGIN_USER_GOOGLE_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  SET_USER_LOCATION: 'SET_USER_LOCATION',
  SEND_RESET_LINK_SUCCESS: 'SEND_RESET_LINK_SUCCESS',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  LOGOUT_USER: 'LOGOUT_USER',
  EXPIRE_SESSION: 'EXPIRE_SESSION',
  UPDATE_USER_APP_SETTINGS: 'UPDATE_USER_APP_SETTINGS',

  // 3rd party user on-boarding
  TWITTER_GET_ACCESS_TOKEN: 'TWITTER_GET_ACCESS_TOKEN',
  TWITTER_SUCCESS: 'TWITTER_SUCCESS',
  TWITTER_CLOSE: 'TWITTER_CLOSE',
  TWITTER_OPEN: 'TWITTER_OPEN',
  FACEBOOK_SUCCESS: 'FACEBOOK_SUCCESS',
  GOOGLE_GET_ACCESS_TOKEN: 'GOOGLE_GET_ACCESS_TOKEN',
  GOOGLE_SUCCESS: 'GOOGLE_SUCCESS',
  GOOGLE_CLOSE: 'GOOGLE_CLOSE',
  GOOGLE_OPEN: 'GOOGLE_OPEN',

  // user actions
  GET_USER_PERSONAL_INFO_SUCCESS: 'GET_USER_PERSONAL_INFO_SUCCESS',
  UPDATE_USER_PERSONAL_INFO_SUCCESS: 'UPDATE_PERSONAL_USER_INFO_SUCCESS',
  UPDATE_USER_ADDRESS_INFO_SUCCESS: 'UPDATE_USER_ADDRESS_INFO_SUCCESS',
  UPDATE_USER_TAXPAYER_INFO_SUCCESS: 'UPDATE_USER_TAXPAYER_INFO_SUCCESS',
  UPDATE_USER_TAXPAYER_INFO_ERROR: 'UPDATE_USER_TAXPAYER_INFO_ERROR',
  TOGGLE_TERMS_OF_USE: 'TOGGLE_TERMS_OF_USE',
  UPLOAD_PLOFILE_IMAGE_SUCCESS: 'UPLOAD_PLOFILE_IMAGE_SUCCESS',
  CREATE_KYC_DOCUMENTS_SUCCESS: 'CREATE_KYC_DOCUMENTS_SUCCESS',
  GET_KYC_DOCUMENTS_SUCCESS: 'GET_KYC_DOCUMENTS_SUCCESS',
  SEND_VERIFICATION_SMS_SUCCESS: 'SEND_VERIFICATION_SMS_SUCCESS',
  VERIFY_SMS_SUCCESS: 'VERIFY_SMS_SUCCESS',
  START_KYC_SUCCESS: 'START_KYC_SUCCESS',
  GET_KYC_STATUS_SUCCESS: 'GET_KYC_STATUS_SUCCESS',
  GET_ICO_USERS_INFO_SUCCESS: "GET_ICO_USERS_INFO_SUCCESS",
  GET_BLACKLISTED_COUNTRIES_SUCCESS: "GET_BLACKLISTED_COUNTRIES_SUCCESS",
  SET_INDIVIDUAL_REFERRAL_LINK: "SET_INDIVIDUAL_REFERRAL_LINK",

  // wallet actions
  GET_WALLET_DETAILS_SUCCESS: 'GET_WALLET_DETAILS_SUCCESS',
  GET_COIN_BALANCE_SUCCESS: 'GET_COIN_BALANCE_SUCCESS',
  GET_COIN_ADDRESS_SUCCESS: 'GET_COIN_ADDRESS_SUCCESS',
  GET_COIN_ORIGINATING_ADDRESS_SUCCESS: 'GET_COIN_ORIGINATING_ADDRESS_SUCCESS',
  SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS: 'SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS',
  WITHDRAW_CRYPTO_SUCCESS: 'WITHDRAW_CRYPTO_SUCCESS',
  GET_TRANSACTION_DETAILS_SUCCESS: 'GET_TRANSACTION_DETAILS_SUCCESS',
  GET_ALL_TRANSACTIONS_SUCCESS: 'GET_ALL_TRANSACTIONS_SUCCESS',
  GET_COIN_TRANSACTIONS_SUCCESS: 'GET_COIN_TRANSACTIONS_SUCCESS',
  SET_PIN: 'SET_PIN_SUCCESS',
  SET_PIN_SUCCESS: 'SET_PIN_SUCCESS',
  STORE_PIN: 'STORE_PIN',
  CHECK_USER_PIN_STATUS: 'CHECK_USER_PIN_STATUS',
  CHECK_USER_PIN_STATUS_SUCCESS: 'CHECK_USER_PIN_STATUS_SUCCESS',

  // interest actions
  GET_INTEREST_RATES_SUCCESS: 'GET_INTEREST_RATES_SUCCESS',
  GET_INTEREST_CHART_DATA_SUCCESS: 'GET_INTEREST_CHART_DATA_SUCCESS',

  // transfer actions
  GET_ALL_TRANSFERS_SUCCESS: 'GET_ALL_TRANSFERS_SUCCESS',
  GET_TRANSFER_SUCCESS: 'GET_TRANSFER_SUCCESS',
  CLAIM_TRANSFER_SUCCESS: 'CLAIM_TRANSFER_SUCCESS',
  CANCEL_TRANSFER_SUCCESS: 'CANCEL_TRANSFER_SUCCESS',
  CREATE_TRANSFER_SUCCESS: 'CREATE_TRANSFER_SUCCESS',

  // cameraRoll actions
  GET_CAMERA_ROLL_SUCCESS: 'GET_CAMERA_ROLL_SUCCESS',

  // loan calls
  APPLY_FOR_LOAN_SUCCESS: 'APPLY_FOR_LOAN_SUCCESS',

  // apy key calls
  CREATE_API_KEY_SUCCESS: 'CREATE_API_KEY_SUCCESS',
  DELETE_API_KEY_SUCCESS: 'DELETE_API_KEY_SUCCESS',
  GET_API_KEYS_SUCCESS: 'GET_API_KEYS_SUCCESS',

  // app calls
  APP_INIT_START: 'APP_INIT_START',
  APP_INIT_DONE: 'APP_INIT_DONE',
  RESET_APP: 'RESET_APP',
  START_LOADING_ASSETS: 'START_LOADING_ASSETS',
  FINISH_LOADING_ASSETS: 'FINISH_LOADING_ASSETS',
  SET_INTERNET_CONNECTION: 'SET_INTERNET_CONNECTION',
  SET_APP_STATE: 'SET_APP_STATE',
}
