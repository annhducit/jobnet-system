import type { CustomFlowbiteTheme } from 'flowbite-react'

import { Select as SelectFlowbite, Label } from 'flowbite-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  color?: string
  label?: string
  labelConfig?: string
}

const Select = ({
  color = 'default',
  children,
  id = '',
  label,
  labelConfig = '',
  ...props
}: SelectProps) => {
  const customTheme: CustomFlowbiteTheme['select'] = {
    field: {
      select: {
        colors: {
          default:
            'border border-dark focus:ring-main focus:border-main rounded text-white outline-none bg-transparent text-black',
          main:
            'border border-main-lower focus:ring-main focus:border-main rounded text-white outline-none bg-main-50 text-black',
        },
      },
    },
  }
  return (
    <div>
      {label && (
        <Label
          htmlFor={id}
          value={label}
          className={'block mb-2 font-normal text-[16px] ' + labelConfig}
        />
      )}
      <SelectFlowbite color={color} id={id} theme={customTheme} {...props}>
        {children}
      </SelectFlowbite>
    </div>
  )
}

export default Select
