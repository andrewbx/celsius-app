import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCTaxpayerStyle from "./KYCTaxpayer.styles";
import CelText from "../../atoms/CelText/CelText";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Card from "../../atoms/Card/Card";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

@connect(
  state => ({
    user: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCTaxpayer extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Taxpayer ID",
    customCenterComponent: <ProgressBar steps={4} currentStep={3}/>
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      updatingTaxInfo: false
    };
  }

  componentDidMount() {
    const { actions, user } = this.props;
    actions.profileTaxpayerInfo();
    this.setState({ isLoading: false });
    this.initForm(user);
  }

  initForm = (user) => {
    const { actions } = this.props;
    if (user) {
      if (this.isFromUS()) {
        actions.updateFormFields({ ssn: user.ssn });
      } else {
        actions.updateFormFields({
          itin: user.itin,
          national_id: user.national_id
        });
      }
    }
  };

  isFromUS = () => {
    const { formData } = this.props;

    let usCitizen = false
    if (formData.citizenship.name === 'United States' || formData.country.name === 'United States') usCitizen = true
    // if (user.citizenship === 'United States' || user.country === 'United States') usCitizen = true
    return usCitizen
  }

  submitTaxpayerInfo = async () => {
    const { actions, formData } = this.props;
    let updateTaxInfo;
    const errors  = {};
    if (this.isFromUS()) {
      if (formData.ssn === "" || !formData.ssn) {
        errors.ssn = "Please enter valid SSN.";
        actions.setFormErrors(errors);
        return
      }
      updateTaxInfo = { ssn: formData.ssn };
    } else {
      updateTaxInfo = {
        national_id: formData.national_id,
        itin: formData.itin
      };
    }
    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateTaxpayerInfo(updateTaxInfo);

    if (response.success) {
      actions.navigateTo("KYCVerifyID");
    }

    this.setState({ updatingTaxInfo: false });
  };

  render() {
    const { formData, formErrors, actions } = this.props;
    const { updatingTaxInfo, isLoading } = this.state;
    // const style = KYCTaxpayerStyle();

    if (isLoading) return <LoadingScreen/>;

    return (
      <RegularLayout>

        <CelText weight={"700"} type={"H1"} align='center'>Taxpayer ID</CelText>

        <CelText align={"center"} margin={"10 0 0 0"} type={"H4"} weight={"300"}>We need this information due to
          anti-money laundering (AML) regulations and background checks.</CelText>

        {(this.isFromUS()) ?
          <React.Fragment>
            <CelInput keyboardType={"number-pad"} margin="20 0 20 0" type="password" field="ssn" placeholder="Social Security Number (optional)"
                      value={formData.ssn} error={formErrors.ssn}/>
            <Card margin={"0 0 20 0"}>
              <CelText type={"H5"} weight={"300"}>
                SSN and residency are needed to issue 1099 for the interest paid. Private information is encrypted and
                highly secured.
              </CelText>
            </Card>
          </React.Fragment>
          :
          <React.Fragment>
            <CelInput margin="20 0 20 0" type="text" field="itin" placeholder="E-International Tax ID Number (optional)"
                      value={formData.itin} error={formErrors.itin}/>
            <CelInput margin="0 0 30 0" type="text" field="national_id" placeholder="E-National ID Number (optional)"
                      value={formData.national_id} error={formErrors.national_id}/>
          </React.Fragment>
        }

        <CelButton
          onPress={() => this.submitTaxpayerInfo()}
          iconRight={"IconArrowRight"}
          iconRightHeight={"20"}
          iconRightWidth={"20"}
          loading={updatingTaxInfo}
        >
          Continue
        </CelButton>

        <CelButton
          onPress={() => actions.navigateTo('KYCVerifyID')}
          disabled={updatingTaxInfo}
          basic
          margin="20 0 20 0"
        >
          Skip
        </CelButton>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(KYCTaxpayer);
