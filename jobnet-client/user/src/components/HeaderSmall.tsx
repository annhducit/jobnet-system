import { useState } from 'react'
import { MenuItem } from '../types/headerSmall'
import UserType from '../types/user'
import { useNavigate } from 'react-router-dom'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

function HeaderItemSmall({
  data,
}: {
  data: MenuItem[]
  auth?: UserType | undefined
}) {
  const [isShowItem, setIsShowItem] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleOpenSubMenu = (id: number) => {
    setIsShowItem((prevItem) => (prevItem === id ? null : id))
  }

  return (
    <div className="flex flex-col gap-y-2">
      {data
        ?.filter((item) => !item.hidden)
        .map((item) => (
          <div key={item.id}>
            <div
              className="flex items-center justify-between p-3 text-sm font-semibold bg-white rounded cursor-pointer text-main"
              onClick={() => {
                handleOpenSubMenu(item.id)
                !item.subItem && navigate(item.navigate ? item.navigate : '')
              }}
            >
              {item.item}

              {item.subItem && (
                <span>
                  {isShowItem === item.id ? <FaCaretUp /> : <FaCaretDown />}
                </span>
              )}
            </div>

            {isShowItem === item.id && item.subItem && (
              <div className="flex flex-col p-2 bg-white rounded-b gap-y-2">
                {item.subItem?.map((item) => (
                  <div
                    onClick={() => {
                      !item.onClick &&
                        navigate(item.navigate ? item.navigate : ''),
                        item.onClick && item.onClick()
                    }}
                    key={item.id}
                    className={` ${
                      isShowItem === item.id
                        ? 'transition-all delay-200 ease-in-out'
                        : ''
                    } w-full px-4 py-3 cursor-pointer bg-primaryLower rounded-lg transition-all text-sm top-10`}
                  >
                    <div className="flex items-center gap-x-4">
                      <div> {item.icon}</div>
                      <div> {item.item}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default HeaderItemSmall
