import React, { useEffect } from "react";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { DateFieldState, DateSegment, useDateFieldState } from "react-stately";
import { GregorianCalendar, parseDate } from "@internationalized/date";
import "./style.scss";
import Typo from "../../../../front/src/components/atoms/typo";

type Size = ("L" | "M" | "S") & string;

interface FormDateProps {
  id: string;
  name: string;
  label?: string | JSX.Element;
  ariaLabel?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isError?: boolean;
  errorMessage?: string;
  description?: string;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  defaultValue?: Date;
  className?: string;
  onChange?: (value: Date) => void;
  size?: Size;
}

function convertDate(dt: Date | undefined) {
  if (dt === undefined) return undefined;
  return parseDate(
    `${`0000${dt.getFullYear()}`.slice(-4)}-${`00${dt.getMonth() + 1}`.slice(
      -2
    )}-${`00${dt.getDate()}`.slice(-2)}`
  );
}

const FormDate = React.forwardRef((props: FormDateProps, ref: any) => {
  const { locale } = useLocale();
  console.log("locale", locale);
  const {
    defaultValue,
    value,
    isDisabled,
    isReadOnly,
    isError,
    errorMessage,
    description,
    label,
    minDate,
    maxDate,
    className,
  } = props;
  const state = useDateFieldState({
    defaultValue: convertDate(defaultValue),
    value: convertDate(value),
    isDisabled,
    isReadOnly,
    errorMessage,
    label,
    minValue: convertDate(minDate),
    maxValue: convertDate(maxDate),
    onChange: (newValue) => {
      if (typeof props.onChange === "function")
        props.onChange(new Date(newValue.toString()));
    },
    locale,
    createCalendar,
  });

  const internalRef = React.useRef(null);
  const { labelProps, fieldProps, errorMessageProps, descriptionProps } =
    useDateField(props, state, ref ?? internalRef);

  useEffect(() => {
    if (state.validationState === "invalid") {
      const minValue = convertDate(minDate);
      if (minValue) {
        if (state.value < minValue) state.setValue(minValue);
      }
      const maxValue = convertDate(maxDate);
      if (maxValue) {
        if (state.value > maxValue) state.setValue(maxValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.validationState, maxDate, minDate]);

  return (
    <div className={`formDate ${className ?? ""}`}>
      {label ? (
        <Typo
          variant="content"
          as="span"
          {...labelProps}
          className="formDate__label"
        >
          {label}
        </Typo>
      ) : null}
      <div
        {...fieldProps}
        ref={ref ?? internalRef}
        className={`formDate__field ${isError ? "error" : ""}`}
      >
        {state.segments.map((segment, i) => (
          <MyDateSegment key={`segment-${i}`} segment={segment} state={state} />
        ))}
      </div>
      {description && !errorMessage ? (
        <Typo
          variant="content"
          as="span"
          {...descriptionProps}
          className="formDate__description"
          size="S"
        >
          {description}
        </Typo>
      ) : null}
      {errorMessage ? (
        <Typo
          variant="content"
          as="span"
          {...errorMessageProps}
          className="formDate__error"
          size="S"
        >
          {errorMessage}
        </Typo>
      ) : null}
    </div>
  );
});

function MyDateSegment({
  segment,
  state,
}: {
  segment: DateSegment;
  state: DateFieldState;
}) {
  const ref = React.useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`formDate__segment ${
        segment.isPlaceholder ? "placeholder" : ""
      }`}
    >
      {segment.text}
    </div>
  );
}

export default FormDate;

function createCalendar(identifier: string) {
  switch (identifier) {
    case "gregory":
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}
