enum Size {
  sm = 'w-9 h-5',
  md = 'w-11 h-6',
  lg = 'w-14 h-7',
}

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  toggleSize?: string
  label?: string
  color?: string
}

const Toggle = ({ toggleSize = 'md', label, ...props }: ToggleProps) => {
  const sizeToggle: string =
    toggleSize === 'sm' ? Size.sm : toggleSize === 'lg' ? Size.lg : Size.md

  return (
    <label className={`relative inline-flex items-center cursor-pointer`}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        defaultChecked={props.defaultChecked}
        {...props}
      />
      <div
        className={`${sizeToggle} bg-gray-200 peer peer-focus:outline-none
        peer-checked:after:translate-x-full after:content-[''] rounded-full peer 
        after:absolute after:top-[2px] after:left-[2px] after:bg-white 
        after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500`}
      ></div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  )
}

export default Toggle
