/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import clns from 'classnames'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

interface OptionType {
  id: string
  name?: string
}

export interface SelectChangeEvent {
  target: {
    name: string
    value: string
  }
}

interface SelectionProps<T>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: Array<T>
  onSelectChange?: (e: SelectChangeEvent) => void
}
// eslint-disable-next-line react-hooks/rules-of-hooks

export default function Selection<T>({
  id,
  className,
  label,
  name,
  placeholder = useTranslation().t('recentApplications.filter.sort.default'),
  options = [],
  value,
  onSelectChange = () => undefined,
}: SelectionProps<T>) {
  const [select, setSelect] = useState({
    options: [{ id: '', name: placeholder }, ...options] as Array<OptionType>,
    selectedIndex: 0,
    isFocus: false,
  })
  const selectedOption = select.options[select.selectedIndex]

  useEffect(() => {
    JSON.stringify(options) !== JSON.stringify(select.options.slice(1)) &&
      setSelect((prev) => ({
        ...prev,
        options: [
          { id: '', name: placeholder },
          ...options,
        ] as Array<OptionType>,
        selectedIndex: 0,
      }))
  }, [options, select.options, placeholder])

  useEffect(() => {
    value !== undefined &&
      setSelect((prev) => ({
        ...prev,
        selectedIndex: prev.options.findIndex((o) => o.id === value),
      }))
  }, [value])

  useEffect(() => {
    const disableFocus = (e: MouseEvent) => {
      !(e.target as HTMLElement).closest(`[data-id=${id}]`) &&
        setSelect((prev) => ({
          ...prev,
          isFocus: false,
        }))
    }
    window.addEventListener('click', disableFocus)

    return () => window.removeEventListener('click', disableFocus)
  }, [id])

  const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    !(e.target as HTMLDivElement).closest(`[data-options=${id}]`) &&
      setSelect((prev) => ({
        ...prev,
        isFocus: true,
      }))
  }

  const handleOptionClick = (i: number) => {
    setSelect((prev) => ({
      ...prev,
      selectedIndex: i,
      isFocus: false,
    }))
    onSelectChange({
      target: {
        name: name as string,
        value: select.options[i].id,
      },
    })
  }

  const Icon = (select.isFocus ? FaChevronUp : FaChevronDown) as IconType
  const optionElms = select.options.map((option, i) => (
    <div
      key={option.id}
      className={clns('p-2 hover:bg-main cursor-pointer hover:text-white', {
        'bg-main text-white': option.id === selectedOption?.id,
      })}
      onClick={() => handleOptionClick(i)}
    >
      {option.name || option.id}
    </div>
  ))

  return (
    <div className={clns(className, 'flex flex-col gap-2 rounded-lg')}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        data-id={id}
        className={clns(
          'relative flex flex-wrap min-h-[41.6px] items-center p-2.5 border border-mainBorder rounded-lg',
          {
            'ring-2 ring-main border-transparent': select.isFocus,
          }
        )}
        onClick={handleSelectClick}
      >
        <div className="text-sm select-none">{selectedOption?.name}</div>
        <Icon className="w-3.5 h-3.5 absolute right-2.5" />
        {select.isFocus && (
          <div
            data-options={id}
            className="absolute left-0 z-50 w-full py-2 overflow-y-scroll text-sm bg-white border-2 rounded-lg shadow-md max-h-48 top-full border-mainBorder"
          >
            {optionElms}
          </div>
        )}
      </div>
      <input type="hidden" name={name} value={selectedOption?.id} />
    </div>
  )
}
