import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import clns from 'classnames'

import type { IconType } from 'react-icons'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  render: JSX.Element
  type?: 'click' | 'hover'
  position?: 'bottomLeft' | 'bottomRight'
  children: React.ReactNode
  width?: string
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  to?: string
  icon?: IconType
  disabled?: boolean
  onItemClick?: () => void
}

export default function Dropdown({
  className,
  render,
  type = 'click',
  position = 'bottomLeft',
  children,
  width = 'w-[260px]',
}: DropdownProps): JSX.Element {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isMouseInside = !!(e.target as HTMLDivElement).closest(
        'div[data-name="dropdown"]'
      )
      !isMouseInside && setIsShown(false)
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsShown(true)
  }

  const typeProps =
    type === 'click' ? { onClick: handleShow } : { onMouseEnter: handleShow }

  return (
    <div
      data-name="dropdown"
      className={`relative flex items-center cursor-pointer ${className}`}
      {...typeProps}
    >
      {render}
      {isShown && (
        <div
          className={`absolute ${width} text-sm z-50 bg-white shadow-md border-2 border-mainBorder rounded-lg py-2 ${positions[position]}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

Dropdown.Header = function ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={`px-6 pb-2 ${className}`}>{children}</div>
}

Dropdown.Item = function ({
  className,
  to,
  icon,
  disabled = false,
  children,
  onItemClick,
}: DropdownItemProps): JSX.Element {
  const classUtils = clns(className, 'flex items-center h-10 px-4', {
    'hover:bg-main hover:text-white cursor-pointer': !disabled,
    'opacity-50': disabled,
  })

  const handleClick = () => {
    onItemClick && !disabled && onItemClick()
  }

  const Icon = icon as IconType

  const content = (
    <>
      {icon && <Icon className="w-4 h-4 mr-4" />}
      {children}
    </>
  )

  return to ? (
    <NavLink to={to} className={classUtils}>
      {content}
    </NavLink>
  ) : (
    <div className={classUtils} onClick={handleClick}>
      {content}
    </div>
  )
}

Dropdown.Divider = function Divider(): JSX.Element {
  return <div className=" border-t-[1px] border-mainBorder"></div>
}

const positions = {
  bottomLeft: 'top-full',
  bottomRight: 'top-full right-0',
}
