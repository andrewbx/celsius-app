import Constants from "../../constants";

const { API_URL } = Constants;

const FONTS = [
  { "Barlow-Thin": require("../../assets/fonts/Barlow/Barlow-Thin.ttf") },
  {
    "Barlow-ThinItalic": require("../../assets/fonts/Barlow/Barlow-ThinItalic.ttf"),
  },
  {
    "Barlow-ExtraLight": require("../../assets/fonts/Barlow/Barlow-ExtraLight.ttf"),
  },
  {
    "Barlow-ExtraLightItalic": require("../../assets/fonts/Barlow/Barlow-ExtraLightItalic.ttf"),
  },
  { "Barlow-Light": require("../../assets/fonts/Barlow/Barlow-Light.ttf") },
  {
    "Barlow-LightItalic": require("../../assets/fonts/Barlow/Barlow-LightItalic.ttf"),
  },
  { "Barlow-Regular": require("../../assets/fonts/Barlow/Barlow-Regular.ttf") },
  {
    "Barlow-RegularItalic": require("../../assets/fonts/Barlow/Barlow-Italic.ttf"),
  },
  { "Barlow-Medium": require("../../assets/fonts/Barlow/Barlow-Medium.ttf") },
  {
    "Barlow-MediumItalic": require("../../assets/fonts/Barlow/Barlow-MediumItalic.ttf"),
  },
  {
    "Barlow-SemiBold": require("../../assets/fonts/Barlow/Barlow-SemiBold.ttf"),
  },
  {
    "Barlow-SemiBoldItalic": require("../../assets/fonts/Barlow/Barlow-SemiBoldItalic.ttf"),
  },
  { "Barlow-Bold": require("../../assets/fonts/Barlow/Barlow-Bold.ttf") },
  {
    "Barlow-BoldItalic": require("../../assets/fonts/Barlow/Barlow-BoldItalic.ttf"),
  },
  {
    "Barlow-ExtraBold": require("../../assets/fonts/Barlow/Barlow-ExtraBold.ttf"),
  },
  {
    "Barlow-ExtraBoldItalic": require("../../assets/fonts/Barlow/Barlow-ExtraBoldItalic.ttf"),
  },
  { "Barlow-Black": require("../../assets/fonts/Barlow/Barlow-Black.ttf") },
  {
    "Barlow-BlackItalic": require("../../assets/fonts/Barlow/Barlow-BlackItalic.ttf"),
  },
  {
    "RobotoMono-Regular": require("../../assets/fonts/Roboto-Mono/RobotoMono-Regular.ttf"),
  },
  {
    "Pangram-Black": require("../../assets/fonts/Pangram/Pangram-Black.otf"),
  },
  {
    "Pangram-Bold": require("../../assets/fonts/Pangram/Pangram-Bold.otf"),
  },
  {
    "Pangram-ExtraBold": require("../../assets/fonts/Pangram/Pangram-ExtraBold.otf"),
  },
  {
    "Pangram-ExtraLight": require("../../assets/fonts/Pangram/Pangram-ExtraLight.otf"),
  },
  {
    "Pangram-Light": require("../../assets/fonts/Pangram/Pangram-Light.otf"),
  },
  {
    "Pangram-Medium": require("../../assets/fonts/Pangram/Pangram-Medium.otf"),
  },
  {
    "Pangram-Regular": require("../../assets/fonts/Pangram/Pangram-Regular.otf"),
  },
];

const CACHE_IMAGES = [
  require("../../assets/images/security-meter/01-pass-strength-weak-light.png"),
  require("../../assets/images/security-meter/01-pass-strength-weak-dark.png"),
  require("../../assets/images/security-meter/02-pass-strength-fair-light.png"),
  require("../../assets/images/security-meter/02-pass-strength-fair-dark.png"),
  require("../../assets/images/security-meter/03-pass-strength-good-light.png"),
  require("../../assets/images/security-meter/03-pass-strength-good-dark.png"),
  require("../../assets/images/security-meter/04-pass-strength-strong.png"),
  require("../../assets/images/security-overview/01_gauge-weak.png"),
  require("../../assets/images/security-overview/01_gauge-dark-weak.png"),
  require("../../assets/images/security-overview/02_gauge-fair.png"),
  require("../../assets/images/security-overview/02_gauge-dark-fair.png"),
  require("../../assets/images/security-overview/03_gauge-good.png"),
  require("../../assets/images/security-overview/03_gauge-dark-good.png"),
  require("../../assets/images/security-overview/04_gauge-strong.png"),
  require("../../assets/images/security-overview/04_gauge-dark-strong.png"),
  require("../../assets/images/icons/get-coin-modal-dark.png"),
  require("../../assets/images/icons/get-coin-modal.png"),
  require("../../assets/images/coins/tron3x.png"),
  require("../../assets/images/icons/icon-email.png"),
  require("../../assets/images/coins/algorand.png"),
  require("../../assets/images/coins/paxGoldFullColor3x.png"),
  require("../../assets/images/illustrations-v3/PolarBearSad3x.png"),
  require("../../assets/images/illustrations-v3/stamp3x.png"),
  require("../../assets/images/bear-happyKYC3x.png"),
  require("../../assets/images/modal-withdraw.png"),
  require("../../assets/images/empty-profile/empty-profile.png"),
  require("../../assets/images/icons/contacts-circle/contacts-circle.png"),
  require("../../assets/images/icons/fb-circle/fb-circle.png"),
  require("../../assets/images/icons/tw-circle/tw-circle.png"),
  require("../../assets/images/mask/circle-mask.png"),
  require("../../assets/images/mask/dark-circle-mask.png"),
  require("../../assets/images/mask/square-mask-01.png"),
  require("../../assets/images/mask/dark-qrcode-mask3x.png"),
  require("../../assets/images/mask/bill-mask-markers-dark.png"),
  require("../../assets/images/mask/bill-mask-markers-light.png"),
  require("../../assets/images/splashScreen-celsius-new.png"),
  require("../../assets/images/victory-bear3x.png"),
  require("../../assets/images/loyaltyIcons/star-bg3x.png"),
  require("../../assets/images/loyaltyIcons/star-icon3x.png"),
  require("../../assets/images/PartnerLogos/DP.png"),
  require("../../assets/images/PartnerLogos/litecoin-foundation.png"),
  require("../../assets/images/PartnerLogos/prime-trust-llc-vector-logo.png"),
  require("../../assets/images/community/frenchie.png"),
  require("../../assets/images/community/frenchie-dark.png"),
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/bear/profile-bear.png`,
  `${API_URL.replace("/api/v3", "")}/profile-images/avatar/cat/profile-cat.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/deer/profile-deer.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/diane/profile-diane.png`,
  `${API_URL.replace("/api/v3", "")}/profile-images/avatar/dog/profile-dog.png`,
  `${API_URL.replace("/api/v3", "")}/profile-images/avatar/fox/profile-fox.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/hyppo/profile-hyppo.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/monkeyboy/profile-monkeyboy.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/monkeygirl/profile-monkeygirl.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/shark/profile-shark.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/sheep/profile-sheep.png`,
  `${API_URL.replace(
    "/api/v3",
    ""
  )}/profile-images/avatar/unicorn/profile-unicorn.png`,
  require("../../assets/images/icons/antenna.png"),
  require("../../assets/images/icons/tool.png"),
  require("../../assets/images/email-sent.png"),
  require("../../assets/images/email-sent-dark.png"),
  require("../../assets/images/calculator.png"),
  require("../../assets/images/calculator-unicorn.png"),
  require("../../assets/images/icons/help-center-dark.png"),
  require("../../assets/images/icons/help-center-unicorn.png"),
  require("../../assets/images/icons/help-center.png"),
  require("../../assets/images/icons/support-dark.png"),
  require("../../assets/images/icons/support-unicorn.png"),
  require("../../assets/images/icons/support.png"),
  require("../../assets/images/checkmark.png"),
  require("../../assets/images/coin-stack-icon.png"),
  require("../../assets/images/coin-stack-icon-dark.png"),
  require("../../assets/images/deposit-icn.png"),
  require(`../../assets/images/deposit-icn-dark.png`),
  require("../../assets/images/icon-apply-for-a-new-loan.png"),
  require("../../assets/images/icon-apply-for-a-new-loan-unicorn.png"),
  require(".././../assets/images/icons/cel-dark.png"),
  require("../../assets/images/icons/cel-unicorn.png"),
  require("../../assets/images/icons/cel.png"),
  require("../../assets/images/icons/crypto.png"),
  require(".././../assets/images/icons/crypto-dark.png"),
  require(".././../assets/images/icons/crypto-unicorn.png"),
  require("../../assets/images/icons/dollars.png"),
  require("../../assets/images/icons/dollars-dark.png"),
  require("../../assets/images/icons/dollars-unicorn.png"),
  require("../../assets/images/icons/referrals/dog.png"),
  require("../../assets/images/loyaltyIcons/celsiusCircleIcon3x.png"),
  require("../../assets/images/loyaltyIcons/celsiusCircleIconDark3x.png"),
  require("../../assets/images/loyaltyIcons/celsiusCircleIconUnicorn3x.png"),
  require("../../assets/images/loyaltyIcons/interestCircleIcon3x.png"),
  require("../../assets/images/loyaltyIcons/interestCircleIconDark3x.png"),
  require("../../assets/images/loyaltyIcons/interestCircleIconUnicorn3x.png"),
  require("../../assets/images/loyaltyIcons/reward-icon3x.png"),
  require("../../assets/images/loyaltyIcons/reward-dark-icon3x.png"),
  require("../../assets/images/loyaltyIcons/reward-unicorn-icon3x.png"),
  require("../../assets/images/loyaltyIcons/star-dark-bg3x.png"),
  require("../../assets/images/loyaltyIcons/star-dark-icon3x.png"),
  require("../../assets/images/loyaltyIcons/withdraw-icon-dark3x.png"),
  require("../../assets/images/loyaltyIcons/withdraw-icon3x.png"),
  require("../../assets/images/alert-icon.png"),
  require("../../assets/images/kyc-icon.png"),
  require("../../assets/images/present-image.png"),
  require("../../assets/images/illustration-borrow-dollars_white.png"),
  require("../../assets/images/hands-in-the-air.png"),
  require("../../assets/images/money-currency-union.png"),
  require("../../assets/images/money-currency-union-dark.png"),
  require("../../assets/images/money-currency-union-unicorn.png"),
  require("../../assets/images/hands-in-the-air-dark.png"),
  require("../../assets/images/hands-in-the-air-unicorn.png"),
  require("../../assets/images/icon-send.png"),
  require("../../assets/images/icon-send-dark.png"),
  require("../../assets/images/icons/bank-wire-dark.png"),
  require("../../assets/images/icons/bank-wire-light.png"),
  require("../../assets/images/icons/bank-wire-unicorn.png"),
  require("../../assets/images/icons/credit-card-dark.png"),
  require("../../assets/images/icons/credit-card-light.png"),
  require("../../assets/images/icons/credit-card-unicorn.png"),
  require("../../assets/images/coins/binance.png"),
  require("../../assets/images/coins/binanceusd.png"),
  require("../../assets/images/coins/iota.png"),
  require("../../assets/images/checkEmail.png"),
  require("../../assets/images/error.png"),
  require("../../assets/images/hodlModeStatus.png"),
  require("../../assets/images/plus-celsiusBlue.png"),
  require("../../assets/images/plus-white.png"),
  require("../../assets/images/illustration-borrow-dollars.png"),
  require("../../assets/images/illustration-borrow-dollars-unicorn.png"),
  require("../../assets/images/illustration-borrow-stablecoins.png"),
  require("../../assets/images/illustration-borrow-stablecoins-unicorn.png"),
  require(`../../assets/images/modal-withdraw-dark.png`),
  require(`../../assets/images/bankToTheFuture.png`),
  require(`../../assets/images/bankToTheFuture2.png`),
  require(`../../assets/images/bankToTheFuture3.png`),
  require(`../../assets/images/target-missed.png`),
  require("../../assets/images/sunset-mockup-02.png"),
];

export default {
  FONTS,
  CACHE_IMAGES,
};
