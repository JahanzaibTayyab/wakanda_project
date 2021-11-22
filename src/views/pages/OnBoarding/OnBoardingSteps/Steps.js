import * as React from "react";
import { StepContext } from "./StepContext";

export const Steps = (props) => {
  const { activeStep, children } = props;
  const steps = React.useMemo(
    () =>
      React.Children.toArray(children).map((step, i, arr) => (
        <StepContext.Provider
          key={i}
          value={{
            isActive: activeStep === i,
            isCompleted: activeStep > i,
            isLastStep: arr.length !== i + 1,
            step: i + 1,
          }}
        >
          {step}
        </StepContext.Provider>
      )),
    [activeStep, children]
  );
  return <>{steps}</>;
};
