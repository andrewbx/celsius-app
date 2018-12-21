import signupFlow from './flows/signup-flow';
import loginFlow from "./flows/login-flow";
import kycFlow from "./flows/kyc-flow";
import withdrawFlow from './flows/withdraw-flow'

export default function (spec) {
  // testSignupFlow(spec);
  // testLoginFlow(spec);
  // testKycFlow(spec);
  // testWithdrawFlow(spec);
  testSingleSuite(spec);
}

export function testSignupFlow(spec) {
  spec.describe('Signup Flow', () => {

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', signupFlow.successfulFlow(spec))

    // Welcome screen tests
    spec.it('should go to SignupOne screen when button is pressed', signupFlow.pressSkipIntro(spec))

    // SignupOne screen tests
    spec.it('button should be disabled when no email and password entered', signupFlow.disableWhenNoData(spec))
    spec.it('button should be disabled when no email entered', signupFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', signupFlow.disableWhenNoPassword(spec))
    spec.it('button should be disabled when no repeat password entered', signupFlow.disabledWhenNoRepeatPassword(spec))
    spec.it('should show error when invalid email entered', signupFlow.errorWhenEmailInvalid(spec))
    spec.it('should show error when when weak password', signupFlow.errorWhenPasswordWeak(spec))
    spec.it('should show error when user exists', signupFlow.errorWhenUserExists(spec))
    spec.it('should show error when repeat password not same as password', signupFlow.errorWPasswordsDifferent(spec))
    spec.it('should go to SignupTwo screen when all info is valid', signupFlow.stepOneSuccess(spec))

    // SignupTwo screen tests
    spec.it('button should be disabled when no first and last name entered', signupFlow.disableWhenNoNames(spec))
    spec.it('button should be disabled when no first name entered', signupFlow.disableWhenNoLastName(spec))
    spec.it('button should be disabled when no last name entered', signupFlow.disableWhenNoFirstName(spec))
    spec.it('button should be disabled when terms not agreed to', signupFlow.disabledWhenNoCheckbox(spec))
    spec.it('should go to EnterPasscode screen when all info is valid', signupFlow.stepTwoSuccess(spec))

    // CreatePasscode screen tests
    spec.it('should disable button click when 3 digits are entered', signupFlow.disableCreatePasscode(spec))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', signupFlow.createPasscode(spec))

    // RepeatPasscode screen tests
    spec.it('should show error when different pin is entered', signupFlow.disableWrongPasscode(spec))
    spec.it('should go to NoKYC screen when repeated pin is valid', signupFlow.finishPasscode(spec))
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', loginFlow.successfulFlow(spec))

    // Welcome screen
    spec.it('should go to Login screen when skip intro and login pressed', loginFlow.initFlow(spec))

    // Login screen
    spec.it('should go to passport forgoten screen when forgot password pressed', loginFlow.forgottenPassword(spec))
    spec.it('button should be disabled when no email and password entered', loginFlow.disableWhenNoLoginData(spec))
    spec.it('button should be disabled when no email entered', loginFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', loginFlow.disableWhenNoPassword(spec))
    spec.it('should show error when wrong credentials', loginFlow.errWhenWrongCredentials(spec))
    spec.it('should show error when user doesn\'t exist', loginFlow.errUserDoesNotExists(spec))
    spec.it('should go to NoKYC screen when all info is valid', loginFlow.loginSuccess(spec))

    // ForgottenPassword screen
    spec.it('should show error message when not existing email is entered', loginFlow.forgottenPasswordErrWrongEmail(spec))
    spec.it('should show error message when wrong email format is entered', loginFlow.forgottenPasswordErrWrongEmailFormat(spec))
    spec.it('should show info message when existing email is entered', loginFlow.forgottenPasswordSuccessMsg(spec))
  })
}

export function testSingleSuite(spec) {
  spec.describe('Single test', () => {
    spec.it('should got to NoKyc with pending screen when flow is successful', kycFlow.successKYCflow(spec))
  })
}

export function testKycFlow(spec) {
  spec.describe('KYC Flow', () => {

    // Successful flow
    spec.it('should got to NoKyc with pending screen when flow is successful', kycFlow.successKYCflow(spec))

    // NoKYC screen
    spec.it('should go to Profile details screen when verify profile is pressed', kycFlow.startKyc(spec))

    // Profile details screen
    spec.it('should prepopulate first name and last name', kycFlow.prepopulateFirstAndLastName(spec))
    spec.it('should show error when no title', kycFlow.noTitle(spec))
    spec.it('should show error when no first name', kycFlow.noFirstName(spec))
    spec.it('should show error when no last name', kycFlow.noLastName(spec))
    spec.it('should show error when no date of birth', kycFlow.noDateOfBirth(spec))
    spec.it('should show error when age is under 18', kycFlow.underAge(spec))
    spec.it('should show error when no citizenship', kycFlow.noCitizenship(spec))
    spec.it('should show error when no gender', kycFlow.noGender(spec))
    spec.it('should go to Address Information when all info filled', kycFlow.profileDetailsFinish(spec))

    // Address information screen
    spec.it('should prepopulate country', kycFlow.prepopulateCountry(spec))
    spec.it('should show state if country is USA', kycFlow.stateFieldExistsIfUSA(spec))
    spec.it('should show error when no City', kycFlow.errWhenNoCity(spec))
    spec.it('should show error when no ZIP/Postal code', kycFlow.errWhenNoZIP(spec))
    spec.it('should show error when no street', kycFlow.errWhenNoStreet(spec))
    spec.it('should go to taxpayer ID screen when all info filled', kycFlow.addressInfoValid(spec))

    // Taxpayer ID Screen
    spec.it('should throw error when no SSN input', kycFlow.taxpayerIDUSNoSSN(spec))
    spec.it('should throw error when SSN input is invalid', kycFlow.taxpayerIDUSInvalidSSN(spec))
    spec.it('should go to Verify profile when SSN is valid', kycFlow.taxpayerIDUSValidSSN(spec))
    spec.it('should go to Verify profile when info filled in correctly', kycFlow.taxpayerIDSuccess(spec))

    // Verify Documents Screen
    spec.it('should show error when no phone number is filled', kycFlow.showErrorNoPhoneNumber(spec))
    spec.it('should show error when no front photo', kycFlow.showErrorNoFrontPhoto(spec))
    spec.it('should show error when no back photo', kycFlow.showErrorNoBackPhoto(spec))
    spec.it('should go to VerifyPhoneNumber when passport photo is ok', kycFlow.takePassportPicture(spec))
    spec.it('should go to VerifyPhoneNumber when driving licence photos are ok', kycFlow.takeFrontAndBackOfDrivingLicence(spec))
    spec.it('should go to VerifyPhoneNumber when id photos are ok', kycFlow.takeFrontAndBackofIdentityCard(spec))

    // Verify Phone Number Screen
    spec.it('should show error when code in bad', kycFlow.wrongSMSCode(spec))
  })
}

export function testWithdrawFlow(spec) {
  spec.describe('Withdraw Flow', () => {
    
    // Wallet landing
    spec.it('should show wallet landing when enter pin', withdrawFlow.testFailed(spec))
    spec.it('should switch between tabs correctly', withdrawFlow.testFailed(spec))
    spec.it('should open wallet details when ETH pressed', withdrawFlow.testFailed(spec))
    spec.it('should change currency when right arrow pressed', withdrawFlow.testFailed(spec))
    spec.it('should change currency when left arrow pressed', withdrawFlow.testFailed(spec))
    
    // ETH wallet details
    spec.it('should open wallet details when ETH pressed', withdrawFlow.testFailed(spec))
    spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
    spec.it('should open add funds when add eth pressed', withdrawFlow.testFailed(spec))
    spec.it('should show QR and address', withdrawFlow.testFailed(spec))
    spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to ETH wallet details when done is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))

    // BTC wallet details
    spec.it('should open wallet details when BTC pressed', withdrawFlow.testFailed(spec))
    spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
    spec.it('should open add funds when add BTC pressed', withdrawFlow.testFailed(spec))
    spec.it('should show QR and address', withdrawFlow.testFailed(spec))
    spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to BTC wallet details when done is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))
    
    // BCH wallet details
    spec.it('should open wallet details when BCH pressed', withdrawFlow.testFailed(spec))
    spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
    spec.it('should open add funds when add BCH pressed', withdrawFlow.testFailed(spec))
    spec.it('should show QR and address', withdrawFlow.testFailed(spec))
    spec.it('should change QR and address when use cash address format is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to BCH wallet details when done is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))

    // LTC wallet details
    spec.it('should open wallet details when LTC pressed', withdrawFlow.testFailed(spec))
    spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
    spec.it('should open add funds when add LTC pressed', withdrawFlow.testFailed(spec))
    spec.it('should show QR and address', withdrawFlow.testFailed(spec))
    spec.it('should change QR and address when use M-format address is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to LTC wallet details when done is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))

    // BCH wallet details
    spec.it('should open wallet details when BCH pressed', withdrawFlow.testFailed(spec))
    spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
    spec.it('should open add funds when add BCH pressed', withdrawFlow.testFailed(spec))
    spec.it('should show QR and address', withdrawFlow.testFailed(spec))
    spec.it('should have XRP destination tag box', withdrawFlow.testFailed(spec))
    spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to BCH wallet details when done is pressed', withdrawFlow.testFailed(spec))
    spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))

     // OMG wallet details
     spec.it('should open wallet details when OMG pressed', withdrawFlow.testFailed(spec))
     spec.it('should show chart for each period of time', withdrawFlow.testFailed(spec))
     spec.it('should open add funds when add OMG pressed', withdrawFlow.testFailed(spec))
     spec.it('should show QR and address', withdrawFlow.testFailed(spec))
     spec.it('should change QR and address when use cash address format is pressed', withdrawFlow.testFailed(spec))
     spec.it('should go to BitGo page when transactions are secure is pressed', withdrawFlow.testFailed(spec))
     spec.it('should go to OMG wallet details when done is pressed', withdrawFlow.testFailed(spec))
     spec.it('should go to wallet landing when x is pressed', withdrawFlow.testFailed(spec))
  })
}