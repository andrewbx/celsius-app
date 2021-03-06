@security
Feature: Set 2FA verification for my account
  As a User
  ISBAT turn 2FA on

  Background:
    Given User has one of the auth apps installed on his device (eg. Authenticator)
    And User is logged in
    And Navigated to Security Settings screen
    And User doesn't have 2FA set

  @happy
  Scenario: User sets 2FA successfully
    When User toggles 2FA on
    And Verifies his profile
    Then User is navigated to his 2FA secret screen

    When User enters his 2FA secret into his favourite auth app
    And Enters his six digit code generated by the app into Celsius
    Then User should get a confirmation email for 2FA settings
    And A toast message should inform him about the email
    And User is redirected to Security Settings screen

    When User confirms 2FA setting via email
    Then User has successfully set his 2FA
