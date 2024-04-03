import {ReactNode} from 'react'
import clns from 'classnames'
type TypeShowItem = 'normal' | 'list'
export default function ItemPostHeading({
  icon,
  title,
  content,
  type = 'normal',
  size,
}: {
  icon: ReactNode
  title: string
  content: React.ReactNode
  type?: TypeShowItem
  size?: string
}) {
  return (
    <div
      className={clns('flex gap-x-4', {
        'items-start': type === 'list',
        'items-center': type !== 'list',
      })}
    >
      <span
        className={clns('text-white rounded-full bg-main', {
          'p-4': size === 'large',
          'p-3': size !== 'large',
        })}
      >
        {icon}
      </span>
      <div
        className={clns('flex flex-col translate-y-0', {
          'translate-y-2': type === 'list',
        })}
      >
        <p className="font-semibold">{title}</p>
        <p
          className={clns('font-normal', {
            'pt-2 -translate-x-2': type === 'list',
          })}
        >
          {content}
        </p>
      </div>
    </div>
  )
}