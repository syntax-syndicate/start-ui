import { createContext, useMemo } from 'react';

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { useFormField } from '@/components/Form/FormField';

import { FieldText, FieldTextProps } from './FieldText';

type FormFieldSize = 'sm' | 'md' | 'lg';

type FieldCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: 'custom';
} & Omit<ControllerProps<TFieldValues, TName>, 'disabled'> &
  Required<Pick<ControllerProps<TFieldValues, TName>, 'control'>>;

export type FieldCommonProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FieldCustomProps<TFieldValues, TName>, 'render' | 'type'> & {
  size?: FormFieldSize;
  displayError?: boolean;
  isDisabled?: boolean;
};

export type FormFieldControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | FieldCustomProps<TFieldValues, TName>
  // -- ADD NEW FIELD PROPS TYPE HERE --
  | FieldTextProps<TFieldValues, TName>;

export const FormFieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  _props: FormFieldControllerProps<TFieldValues, TName>
) => {
  const { size } = useFormField();

  const props = {
    ..._props,
    size: 'size' in _props ? _props.size ?? size : size,
  };

  const getField = () => {
    switch (props.type) {
      case 'custom':
        return <Controller {...props} />;

      case 'text':
      case 'email':
      case 'tel':
        return <FieldText {...props} />;

      // -- ADD NEW FIELD COMPONENT HERE --
    }
  };

  const displayError = 'displayError' in props ? props.displayError : undefined;

  const contextValue: FormFieldControllerContextValue<TFieldValues, TName> =
    useMemo(
      () => ({
        name: props.name,
        control: props.control,
        displayError: displayError,
      }),
      [props.name, props.control, displayError]
    );

  return (
    <FormFieldControllerContext.Provider value={contextValue as ExplicitAny}>
      {getField()}
    </FormFieldControllerContext.Provider>
  );
};

export type FormFieldControllerContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Required<Pick<ControllerProps<TFieldValues, TName>, 'control' | 'name'>> & {
  displayError?: boolean;
};

export const FormFieldControllerContext =
  createContext<FormFieldControllerContextValue | null>(null);
