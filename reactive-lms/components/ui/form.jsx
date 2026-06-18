"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const Form = FormProvider;

const FormField = (props) => {
  return <Controller {...props} />;
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={className} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

const useFormField = () => {
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(
    itemContext.name,
    formState
  );

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const { id } = itemContext;

  return {
    id,
    name: itemContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={className}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(
  ({ ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        {...props}
      />
    );
  }
);

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={className}
        {...props}
      />
    );
  }
);

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();

    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={className}
        {...props}
      >
        {body}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};