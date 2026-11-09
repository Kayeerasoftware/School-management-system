"use client";

import { useState, useTransition } from "react";

export function useFormState<State, Payload = any>(
  action: (state: State, payload: Payload) => Promise<State> | State,
  initialState: State
): [State, (payload: Payload) => void, boolean] {
  const [state, setState] = useState<State>(initialState);
  const [isPending, startTransition] = useTransition();

  const formAction = (payload: Payload) => {
    startTransition(async () => {
      try {
        const nextState = await action(state, payload);
        setState(nextState);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return [state, formAction, isPending];
}

export const useActionState = useFormState;
