import { useTranslation } from 'react-i18next'
import vietnamese from '../assets/images/vietnam2.png'
import english from '../assets/images/united-kingdom.png'

import { useState } from 'react'

import { setLanguage } from '../utils/language'

export default function LanguageSelector({init}:{init:string}): React.ReactElement {
  // const { t, i18n } = useTranslation()
  const { i18n } = useTranslation()
  const [check, setCheck] = useState<boolean>(init=='en')
  const changeState = () => {
    setCheck((pre) => {
      return !pre
    })
    handleLanguageChange(check ? 'vi' : 'en')
  }
  const handleLanguageChange = (code: string) => {
    void (async () => {
      await i18n.changeLanguage(code)
      setLanguage(code)
    })()
  }

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="toggleB"
        className="flex items-center cursor-pointer group "
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            name="toggleB"
            className="sr-only"
            onChange={changeState}
          />
          <div className="block h-8 w-16 rounded-2xl bg-[#EBECED]"></div>
          <div
            className={`${
              check
                ? 'bg-[#db1818] translate-x-[135%] bg-lan-us'
                : 'bg-[#030ffc] bg-lan-vi translate-x-[0]'
            } opacity-9 absolute w-6 h-6 transition rounded-full dot left-1 top-1`}
          >
            <img
              src={
                check
                  ? `http://localhost:3014${english}`
                  : `http://localhost:3014${vietnamese}`
              }
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </label>
    </div>
  )
}
