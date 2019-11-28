import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import SocialLogin from "../../organisms/SocialLogin/SocialLogin";
import Separator from "../../atoms/Separator/Separator";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import RegisterPromoCodeModal from "../../organisms/RegisterPromoCodeModal/RegisterPromoCodeModal";
import RegisterPromoCodeCard from "../../molecules/RegisterPromoCodeCard/RegisterPromoCodeCard";
import RegisterToUCard from "../../molecules/RegisterToUCard/RegisterToUCard";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress,
    promoCode: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterInitial extends Component {
  static navigationOptions = () => ({
    right: "login",
    customCenterComponent: <ProgressBar steps={3} currentStep={1} />,
  });

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  componentDidMount() {
    const { promoCode } = this.props;

    if (promoCode) {
      this.setState({ isExpanded: true });
    }
  }

  isFormValid = () => {
    const { actions, formData } = this.props;

    const errors = {};
    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;
    let errorFocus = false;

    if (!formData.firstName) {
      errors.firstName = "First name is required!";
      if (!errorFocus) this.firstNameInput.focus();
      errorFocus = true;
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required!";
      if (!errorFocus) this.last.focus();
      errorFocus = true;
    }
    if (!formData.email) {
      errors.email = "Email is required!";
      if (!errorFocus) this.email.focus();
      errorFocus = true;
    }
    if (!isUsingSocial && !formData.password) {
      errors.password = "Password is required!";
      if (!errorFocus) this.pass.focus();
      errorFocus = true;
    }

    if (Object.keys(errors).length) {
      actions.setFormErrors(errors);
      return false;
    }

    return true;
  };

  submitForm = () => {
    const { actions } = this.props;
    const isFormValid = this.isFormValid();

    if (isFormValid) {
      actions.createAccount();
    }
  };

  render() {
    const {
      formData,
      actions,
      callsInProgress,
      formErrors,
      promoCode,
    } = this.props;

    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;

    const registerLoading = apiUtil.areCallsInProgress(
      [
        API.REGISTER_USER,
        API.REGISTER_USER_FACEBOOK,
        API.REGISTER_USER_GOOGLE,
        API.REGISTER_USER_TWITTER,
        API.SOCIAL_REGISTER,
      ],
      callsInProgress
    );

    // TODO(ns): check ref if !isUsingSocial for pass input

    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">
          Join Celsius
        </CelText>
        <SocialLogin type="register" actions={actions} />

        <Separator allCaps text="Create your account" margin="20 0 20 0" />

        <CelInput
          disabled={registerLoading}
          autoCapitalize="words"
          type="text"
          field="firstName"
          value={formData.firstName}
          error={formErrors.firstName}
          placeholder="First name"
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.last.focus();
          }}
          refs={input => {
            this.firstNameInput = input;
          }}
        />
        <CelInput
          disabled={registerLoading}
          autoCapitalize="words"
          type="text"
          field="lastName"
          value={formData.lastName}
          error={formErrors.lastName}
          placeholder="Last name"
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.email.focus();
          }}
          refs={input => {
            this.last = input;
          }}
        />

        <CelInput
          disabled={!!isUsingSocial || registerLoading}
          type="text"
          value={formData.email}
          error={formErrors.email}
          field="email"
          placeholder="E-mail"
          keyboardType={KEYBOARD_TYPE.EMAIL}
          returnKeyType={!isUsingSocial ? "next" : "done"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            if (!isUsingSocial) this.pass.focus();
          }}
          refs={input => {
            this.email = input;
          }}
        />

        {!isUsingSocial && (
          <CelInput
            disabled={registerLoading}
            type="password"
            field="password"
            placeholder="Password"
            value={formData.password}
            error={formErrors.password}
            refs={input => {
              this.pass = input;
            }}
          />
        )}

        <RegisterToUCard
          termsOfUse={formData.termsOfUse}
          updateFormField={actions.updateFormField}
        />

        <RegisterPromoCodeCard
          promoCode={promoCode}
          openModal={actions.openModal}
        />

        <CelButton
          margin="30 0 10 0"
          onPress={this.submitForm}
          iconRight="IconArrowRight"
          loading={registerLoading}
          disabled={!formData.termsOfUse}
        >
          Create account
        </CelButton>

        <RegisterPromoCodeModal type={"register"} />
      </AuthLayout>
    );
  }
}

export default RegisterInitial;
