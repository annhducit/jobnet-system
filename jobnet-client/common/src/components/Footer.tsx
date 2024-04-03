import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '../assets/images/logo.png'
import SubFooter from './SubFooter'
import { FaArrowRight } from 'react-icons/fa6'
import Input from './input/Input'
import Button from './Button'

export default function Footer(): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="relative">
      <div className="flex flex-col items-center object-cover bg-cover footer bg-background-footer">
        <div className="w-full mt-12 max-md:max-w-full max-md:mt-6">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
              <span className="flex flex-col items-stretch">
                <span className="flex items-stretch justify-between gap-2">
                  <img src={logo} className="object-cover" />
                </span>
                <span className="flex items-stretch gap-1 mt-6">
                  <div className="text-lg leading-7 text-gray-900">
                    {t('footer.orther.call')}
                  </div>
                  <div className="text-lg font-medium leading-7 text-gray-900">
                    (+84) 361452247
                  </div>
                </span>
                <div className="mt-3 text-sm leading-5 text-gray-700">
                  {t('footer.orther.address')}
                </div>
                <div className="mt-3 text-xl font-medium leading-8 text-gray-900 whitespace-nowrap">
                  {t('footer.orther.letsJobnet')}
                </div>
                <div className="text-sm leading-5 text-gray-700">
                  {t('footer.orther.feature')}
                </div>
                <div className="flex items-center mt-6 gap-x-1">
                  <Input
                    className="font-semibold text-gray-700 bg-white opacity-70"
                    type="text"
                    color="none"
                    placeholder={t('footer.orther.email')}
                  />
                  <Button
                    className="text-white rounded-none bg-main"
                    color="none"
                    type="button"
                  >
                    {t('footer.orther.send')}
                  </Button>
                </div>
              </span>
            </div>
            <div className="flex flex-col items-stretch w-9/12 footer-margin max-md:w-full max-md:ml-0">
              <div className="px-5 grow max-md:max-w-full max-md:mt-5">
                <div className="flex lg:gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
                    <span className="items-start flex grow flex-col pb-1.5 max-md:mt-5">
                      <Link
                        to="."
                        className="text-xl font-medium leading-8 text-gray-900 whitespace-nowrap"
                      >
                        {t('footer.link.title')}
                      </Link>
                      <Link
                        to="."
                        className="mt-6 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.link.title')}
                      </Link>
                      <span className="items-center flex justify-between gap-1.5 mt-2.5 py-1.5">
                        <FaArrowRight />
                        <Link
                          to="."
                          className="text-base font-medium leading-6 text-center text-gray-600"
                        >
                          {t('footer.link.contact')}
                        </Link>
                      </span>
                      <Link
                        to="."
                        className="text-gray-600 text-center text-base leading-6 mt-2.5"
                      >
                        {t('footer.link.pricing')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.link.blog')}
                      </Link>
                    </span>
                  </div>
                  <div className="flex flex-col items-stretch w-3/12 footer-margin max-md:w-full max-md:ml-0">
                    <span className="items-start flex grow flex-col pb-1.5 max-md:mt-5">
                      <Link
                        to="."
                        className="text-xl font-medium leading-8 text-gray-900 whitespace-nowrap"
                      >
                        {t('footer.Candidate.title')}
                      </Link>
                      <Link
                        to="."
                        className="mt-6 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.Candidate.jobs')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.Candidate.employers')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.Candidate.dashboard')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.Candidate.saveJob')}
                      </Link>
                    </span>
                  </div>
                  <div className="flex flex-col items-stretch w-3/12 footer-margin max-md:w-full max-md:ml-0">
                    <span className="items-start flex grow flex-col pb-1.5 max-md:mt-5">
                      <Link
                        to="."
                        className="text-xl font-medium leading-8 text-gray-900 whitespace-nowrap"
                      >
                        {t('footer.employers.title')}
                      </Link>
                      <Link
                        to="."
                        className="mt-6 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.employers.createPost')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.employers.candidate')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.employers.dashboard')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.employers.application')}
                      </Link>
                    </span>
                  </div>
                  <div className="flex flex-col items-stretch w-3/12 footer-margin max-md:w-full max-md:ml-0">
                    <span className="items-start flex flex-col pb-1.5 max-md:mt-5">
                      <Link
                        to="."
                        className="text-xl font-medium leading-8 text-gray-900 whitespace-nowrap"
                      >
                        {t('footer.support.title')}
                      </Link>
                      <Link
                        to="."
                        className="mt-6 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.support.ques')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.support.policy')}
                      </Link>
                      <Link
                        to="."
                        className="mt-4 text-base leading-6 text-center text-gray-600"
                      >
                        {t('footer.support.terms')}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SubFooter />
      </div>
      <div className="absolute w-full h-[1px] line-footer bg-gray-200" />
    </div>
  )
}
