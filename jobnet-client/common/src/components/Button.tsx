import type { CustomFlowbiteTheme } from 'flowbite-react'
import {
  Button as ButtonFR,
  ButtonProps as ButtonFRProps,
} from 'flowbite-react'

const customTheme: CustomFlowbiteTheme['button'] = {
  color: {
    main: 'bg-main hover:bg-mainHover text-white rounded-sm',
    cyan: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    rose: 'bg-rose-500 hover:bg-rose-600 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    slate: 'bg-second hover:bg-second-upper text-white',
    white: 'bg-white hover:bg-second-lower text-main',
    empty: 'rounded',
  },
}

export default function Button({
  color = 'main',
  children,
  ...props
}: ButtonFRProps): JSX.Element {
  return (
    <ButtonFR theme={customTheme} color={color} {...props}>
      {children}
    </ButtonFR>
  )
}
