import {
  Label,
  Radio as FRadio,
  CustomFlowbiteTheme,
  RadioProps as FRadioProps,
} from 'flowbite-react'

interface RadioProps extends FRadioProps {
  label?: string
}

const theme: CustomFlowbiteTheme['radio'] = {
  root: {
    base: 'h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-main dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-main-upper dark:focus:ring-main-upper text-main-upper',
  },
}

export default function Radio({
  id,
  label,
  ...props
}: RadioProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      <FRadio id={id} theme={theme} {...props} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  )
}
