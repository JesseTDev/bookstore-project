import SignInForm from "./components/SignIn.component";
import SignUpForm from "./components/SignUp.component";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 16px;
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
