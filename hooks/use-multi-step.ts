"use client";
import { useState } from "react";

export type FormStep = {
  label: string;
  component: JSX.Element;
  fields?: string[];
};

export function useMultiStep(steps: FormStep[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    if (currentStepIndex >= steps.length - 1) return;
    setCurrentStepIndex((current) => current + 1);
  }
  function back() {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((current) => current - 1);
  }

  return {
    next,
    back,
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex === 0,
  };
}
