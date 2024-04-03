interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function DateInput({
  id,
  label,
  ...props
}: DateInputProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="border rounded-lg border-main-lower focus:ring-main focus:border-transparent focus:ring-2"
        type="date"
        {...props}
      />
    </div>
  )
}
