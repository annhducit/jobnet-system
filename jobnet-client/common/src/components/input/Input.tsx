import { TextInput, Label } from 'flowbite-react'
import { forwardRef } from 'react'

import type { CustomFlowbiteTheme, TextInputProps } from 'flowbite-react'

export interface InputProps extends TextInputProps {
  label?: string
  labelConfig?: string
  iconConfig?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      labelConfig,
      sizing = 'md',
      color = 'default',
      icon,
      rightIcon,
      id = '',
      label,
      iconConfig = '',
      ...props
    },
    ref // Add ref to get value
  ) => {
    const customTheme: CustomFlowbiteTheme['textInput'] = {
      field: {
        icon: {
          svg: 'h-4 w-4 text-main ' + iconConfig,
        },
        input: {
          colors: {
            default: 'focus:ring-main focus:border-main',
            main: 'border border-mainBorder focus:ring-2 focus:ring-main focus:border-transparent outline-none',
            none: 'border-none outline-none bg-transparent text-black',
          },
        },
      },
    }
    return (
      <div className="w-full">
        {label && (
          <Label
            htmlFor={id}
            value={label}
            className={`block mb-2 font-normal text-[16px] + ${
              labelConfig || ''
            }`}
          />
        )}
        <TextInput
          ref={ref}
          theme={customTheme}
          color={color}
          icon={icon || undefined}
          rightIcon={rightIcon || undefined}
          id={id}
          sizing={sizing}
          {...props}
        />
      </div>
    )
  }
)

export default Input
