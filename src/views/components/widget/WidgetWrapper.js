import { useContext } from "react";
import Espresso from "./Espresso";
import Onboarding from "../pages/Onboarding";
import OnboardingContext from "../pages/OnboardingContext";
import SignupXL from "./SignupXL";
import SendVerificationEmail from "../pages/SendVerificationEmail";
import SimpleCard from "../components/SimpleCard";
import ContainerCard from "../components/ContainerCard";

function WidgetWrapper(props) {

  const userInfo = useContext(OnboardingContext);

  if (!props.isSignedin)
    return (
      <ContainerCard auth={props.auth} action={props.action}>
        <SignupXL />
      </ContainerCard>
    );

  if (!props.isVerified)
    return (
      <ContainerCard auth={props.auth} action={props.action}>
        <SendVerificationEmail userReload={props.userReload} />
      </ContainerCard>
    );

  if (!userInfo.workspaceName || !userInfo.database)
    return (
      <ContainerCard auth={props.auth} action={props.action}>
        <Onboarding />
      </ContainerCard>
    );

  return (
    <SimpleCard auth={props.auth} action={props.action}>
      <Espresso />
    </SimpleCard>
  );
}

export default WidgetWrapper;