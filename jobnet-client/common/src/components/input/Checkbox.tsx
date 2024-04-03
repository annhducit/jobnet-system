import type { CustomFlowbiteTheme } from 'flowbite-react'
import { Checkbox as CheckboxFlowbite } from 'flowbite-react'

enum Color {
  main = 'h-4 w-4 rounded border border-main-lower bg-main-lower focus:ring-2 focus:ring-main text-main-upper',
  default = 'h-4 w-4 rounded border border-dark-300 bg-transparent focus:ring-2 focus:ring-main text-main-upper',
}

const Checkbox = ({
  color = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const base = SelectColor(color)
  const theme: CustomFlowbiteTheme['checkbox'] = {
    root: {
      base: base,
    },
  }

  return <CheckboxFlowbite theme={theme} {...props} />
}
function SelectColor(key: string): Color {
  if (key === 'main') return Color.main
  return Color.default
}

export default Checkbox
