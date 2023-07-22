import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

interface InputProps {
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface DisabledInputProps {
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  value?: string;
}

export function CustomInput(props: InputProps) {
  return (
    <div className="flex flex-col">
      {props.label && (
        <Label htmlFor={props.label} className="mb-2 text-left capitalize">
          {props.label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={props.type ? props.type : 'text'}
          className="pl-11"
          id={props.id}
          disabled={props.disabled}
          {...props.register(props.id, { required: props.required })}
          onChange={props.onChange}
        />
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 pointer-events-none">
          {props.icon ? (
            props.icon
          ) : (
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export function DisabledInput(props: DisabledInputProps) {
  return (
    <div className="flex flex-col">
      {props.label && (
        <Label htmlFor={props.label} className="mb-2 text-left capitalize">
          {props.label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={props.type ? props.type : 'text'}
          className="pl-11"
          id={props.id}
          value={props.value}
          disabled
        />
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 pointer-events-none">
          {props.icon ? (
            props.icon
          ) : (
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

interface TextAreaProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}
export function TextAreaWithLabel(props: TextAreaProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{props.label}</Label>
      <Textarea
        placeholder="Jelaskan kamar disini..."
        id="message"
        {...props.register(props.id, { required: props.required })}
        className="h-24"
      />
    </div>
  );
}

interface DisabledTextAreaProps {
  label: string;
  value: string;
}

export function DisabledTextAreaWithLabel(props: DisabledTextAreaProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{props.label}</Label>
      <Textarea
        placeholder="Jelaskan kamar disini..."
        id="message"
        value={props.value}
        className="h-24"
      />
    </div>
  );
}
