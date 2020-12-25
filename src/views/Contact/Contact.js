import React from "react";
import { HeadingOne, HeadingTwo } from "../../reusableComponents/Heading";
import Button from "../../reusableComponents/Button";
import { Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import { handleCheckboxChange, sendQuestion } from "../../actions/index";
import {
  StyledContactNavContainer,
  StyledFormContainer,
  StyledFormElementsContainer,
  StyledInputContainer,
  StyledFormLabel,
  StyledFormInput,
  StyledFormTextarea,
  StyledCheckboxContainer,
  StyledButtonContainer,
  StyledHiglight,
} from "./ContactStyles";

const ContactForm = ({ isChecked, handleCheckboxChange, sendQuestion }) => {
  return (
    <>
      <StyledContactNavContainer>
        <HeadingOne>Contact</HeadingOne>
      </StyledContactNavContainer>
      <HeadingTwo>
        If you are looking for answers to your questions contact us.
        <br /> We are available from Monday to Friday from 8am to 6pm and on
        Saturday from 8am to 13pm.
        <br /> You can call us +12 345 67 89 or send e-mail jewelryshop@shop.com
      </HeadingTwo>
      <StyledFormContainer onSubmit={sendQuestion}>
        <StyledFormElementsContainer>
          <HeadingTwo help>How can we help?</HeadingTwo>
          <StyledInputContainer>
            <StyledFormLabel>
              Name and Surname<StyledHiglight>*</StyledHiglight>
            </StyledFormLabel>
            <StyledFormInput
              type="text"
              name="name"
              autoComplete="off"
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledFormLabel>
              E-mail<StyledHiglight>*</StyledHiglight>
            </StyledFormLabel>
            <StyledFormInput
              type="email"
              name="email"
              autoComplete="off"
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledFormLabel>
              Subject<StyledHiglight>*</StyledHiglight>
            </StyledFormLabel>
            <StyledFormInput
              type="text"
              name="subject"
              autoComplete="off"
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledFormLabel>
              Comment or message<StyledHiglight>*</StyledHiglight>
            </StyledFormLabel>
            <StyledFormTextarea
              name="desc"
              cols="29"
              rows="10"
              autoComplete="off"
              required
            />
          </StyledInputContainer>
          <StyledCheckboxContainer>
            <Checkbox
              required
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <HeadingTwo termsAndConditions>
              I accept the{" "}
              <StyledHiglight terms>Terms and Conditions</StyledHiglight>
            </HeadingTwo>
          </StyledCheckboxContainer>
          <StyledButtonContainer>
            <Button send type="submit">
              Send
            </Button>
          </StyledButtonContainer>
        </StyledFormElementsContainer>
      </StyledFormContainer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isChecked: state.isChecked,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleCheckboxChange: () => dispatch(handleCheckboxChange()),
    sendQuestion: (e) => dispatch(sendQuestion(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
