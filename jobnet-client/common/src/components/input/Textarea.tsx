import { Textarea as FRTextarea } from 'flowbite-react'

import type {
  CustomFlowbiteTheme,
  TextareaProps as FRTextareaProps,
} from 'flowbite-react'

interface TextareaProps extends FRTextareaProps {
  label?: string
}

const theme: CustomFlowbiteTheme['textarea'] = {
  base: 'block w-full rounded-lg border border-main-lower disabled:cursor-not-allowed disabled:opacity-50 text-sm p-2',
  colors: {
    green: 'focus:ring-main focus:border-main',
  },
}

export default function Textarea({
  id,
  label,
  color = 'green',
  ...props
}: TextareaProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <FRTextarea theme={theme} id={id} color={color} {...props} />
    </div>
  )
}
