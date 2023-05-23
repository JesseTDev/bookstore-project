import SignInForm from "./components/SignIn.component";
import SignUpForm from "./components/SignUp.component";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 24px;
  max-width: 80%;
  justify-content: space-between;
  display: flex;
  h2 {
    margin: 10px 0;
  }
`;

const Wrapper = styled.div`
  width: 300px;
`;

const AuthenticationPage = () => {
  return (
    <StyledContainer>
      <Wrapper>
        <SignUpForm />
      </Wrapper>
      <Wrapper>
        <SignInForm />
      </Wrapper>
    </StyledContainer>
  );
};

export default AuthenticationPage;
