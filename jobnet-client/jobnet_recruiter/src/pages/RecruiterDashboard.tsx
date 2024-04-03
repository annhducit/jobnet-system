import chart from '../assets/images/data-analycs.png'
import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'
const RecruiterDashboard = () => {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.dashboard'))
  return (
    <div className="flex flex-col items-stretch">
      <div className="rounded-lg bg-slate-700 section-heading">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[63%] max-md:w-full max-md:ml-0">
            <div className="text-white text-4xl leading-[99px] my-auto max-md:max-w-full max-md:mt-10">
              Welcome To Dashboard
              <br />
              <span className="text-5xl font-bold">Double2D</span>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[37%] ml-5 max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2a626f1d7f636da23cfb87ada796662128987f708d13df497dff2ce6b6e627?"
              className="aspect-[1.51] object-contain object-center w-full overflow-hidden grow max-md:mt-10"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-1 mt-4 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch sub-section">
            <div className="flex flex-col items-stretch justify-center grow max-md:mt-4">
              <div className="flex items-stretch justify-between gap-5 px-4 py-6 rounded bg-slate-100">
                <div className="flex flex-col items-stretch">
                  <div className="text-base leading-5 text-zinc-800 whitespace-nowrap">
                    Job Posts
                  </div>
                  <div className="mt-5 text-3xl font-bold leading-7 tracking-wide text-stone-500 whitespace-nowrap">
                    2,456
                  </div>
                  <div className="mt-10 text-xl font-bold leading-7 tracking-tight text-emerald-300 whitespace-nowrap">
                    +2.5%
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c028fc863424eb927b718214fc1de670cb8aab2b36c7b22a2b6fb72b98585470?"
                  className="aspect-[1.07] object-contain object-center w-[98px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch sub-section">
            <div className="flex flex-col items-stretch justify-center grow max-md:mt-4">
              <div className="rounded bg-slate-100 flex items-stretch justify-between gap-3.5 px-4 py-6">
                <div className="flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-base leading-5 text-zinc-800 whitespace-nowrap">
                    Total Application
                  </div>
                  <div className="mt-5 text-3xl font-bold leading-7 tracking-wide text-stone-500">
                    4,561
                  </div>
                  <div className="mt-10 text-xl font-bold leading-7 tracking-tight text-red-600">
                    -4.4%
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c5522af0ef098b3c67c4a459821f0ad6cf7d1c24ad0faad876e9c08058539b6?"
                  className="aspect-[1.02] object-contain object-center w-[94px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch sub-section">
            <div className="flex flex-col items-stretch justify-center grow max-md:mt-4">
              <div className="flex items-stretch justify-between gap-5 px-4 py-6 rounded bg-slate-100">
                <div className="flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-base leading-5 text-zinc-800 whitespace-nowrap">
                    No of Meetings
                  </div>
                  <div className="mt-5 text-3xl font-bold leading-7 tracking-wide text-stone-500">
                    125
                  </div>
                  <div className="text-xl font-bold leading-7 tracking-tight text-orange-300 mt-11 max-md:mt-10">
                    +1.5%
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b1f69b6ef6e28c233920ab1bf0ccf5886daa1a0d1869fb482f999e9da684585?"
                  className="aspect-[1.02] object-contain object-center w-[94px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch sub-section">
            <div className="flex flex-col items-stretch justify-center grow max-md:mt-4">
              <div className="flex items-stretch justify-between gap-5 px-4 py-6 rounded bg-slate-100">
                <div className="flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-base leading-5 text-zinc-800 whitespace-nowrap">
                    No of Hirings
                  </div>
                  <div className="mt-5 text-3xl font-bold leading-7 tracking-wide text-stone-500 whitespace-nowrap">
                    2,456
                  </div>
                  <div className="mt-10 text-xl font-bold leading-7 tracking-tight text-emerald-300">
                    +4.5%
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ecc8d3ac740a79c2aaa88b29874a77f455fd11ae2d457b2e35d96e7ee4a159e?"
                  className="aspect-[1.02] object-contain object-center w-[94px] overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 max-md:max-w-full hidden-section">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[43%]">
            <div className="flex flex-col items-stretch w-full px-4 py-6 rounded bg-slate-100 grow max-md:max-w-full max-md:mt-4">
              <div className="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <div className="text-zinc-800 text-xl font-bold leading-7 tracking-tight w-[241px]">
                  Application Responce
                </div>
                <div className="my-auto text-sm font-semibold leading-5 text-right text-orange-300">
                  Download Report
                </div>
              </div>
              <div className="mx-auto w-[200px] h-[200px] mt-20">
                <img src={chart} className="w-full h-full" alt="" />
              </div>
              <div className="self-center flex w-[392px] max-w-full items-stretch justify-between gap-5 mt-12 px-px max-md:mt-10">
                <div className="flex flex-col items-stretch self-start">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col w-3 h-3 my-auto rounded bg-slate-700 shrink-0" />
                    <div className="self-stretch text-xs text-gray-700 grow whitespace-nowrap">
                      Shortlisted
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-gray-700 whitespace-nowrap">
                    942
                  </div>
                </div>
                <div className="flex flex-col items-stretch self-start">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col w-3 h-3 my-auto bg-orange-300 rounded shrink-0" />
                    <div className="self-stretch text-xs text-gray-700">
                      Hired
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-gray-700 whitespace-nowrap">
                    25
                  </div>
                </div>
                <div className="flex flex-col items-stretch">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col w-3 h-3 my-auto rounded bg-slate-300 shrink-0" />
                    <div className="self-stretch text-xs text-gray-700 grow whitespace-nowrap">
                      Rejected
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-gray-700 whitespace-nowrap">
                    2,452
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch justify-center grow max-md:max-w-full max-md:mt-4">
              <div className="flex flex-col items-stretch px-4 pt-4 pb-6 bg-white rounded max-md:max-w-full">
                <div className="flex items-center justify-between w-full gap-5 px-px max-md:max-w-full max-md:flex-wrap">
                  <div className="my-auto text-xl font-bold leading-7 tracking-tight text-zinc-800">
                    Recent Job Posts
                  </div>
                  <div className="bg-slate-100 self-stretch flex items-stretch justify-between gap-5 pl-8 rounded-[30px] max-md:pl-5">
                    <div className="self-center my-auto text-sm leading-5 text-neutral-400">
                      Monthly
                    </div>
                    <div className="self-center my-auto text-sm leading-5 text-neutral-400">
                      Weekly
                    </div>
                    <div className="text-white text-sm leading-5 whitespace-nowrap bg-slate-700 grow justify-center items-stretch px-7 py-5 rounded-[30px] max-md:px-5">
                      Today
                    </div>
                  </div>
                </div>
                <div className="flex items-stretch justify-between w-full gap-5 px-3 py-4 mt-4 rounded bg-slate-100 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="self-start text-xs font-medium leading-5 text-blue-950">
                    Job Title
                  </div>
                  <div className="flex items-start justify-between gap-5">
                    <div className="text-xs font-medium leading-5 text-blue-950">
                      Category
                    </div>
                    <div className="self-stretch text-xs font-medium leading-5 text-blue-950">
                      Openings
                    </div>
                    <div className="self-stretch text-xs font-medium leading-5 text-blue-950">
                      Applications
                    </div>
                  </div>
                  <div className="self-start text-xs font-medium leading-5 text-blue-950">
                    Status
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 px-3 py-4 rounded-sm bg-slate-200 max-md:max-w-full max-md:flex-wrap">
                  <div className="self-center my-auto text-sm leading-5 text-stone-500 grow whitespace-nowrap">
                    UI UX Designer
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    Full Time
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    12
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    135
                  </div>
                  <div className="items-stretch self-stretch justify-center px-5 py-2 text-sm font-bold leading-5 text-white rounded whitespace-nowrap bg-emerald-300 grow">
                    Active
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 px-3 py-4 rounded-sm bg-slate-200 max-md:max-w-full max-md:flex-wrap">
                  <div className="self-center my-auto text-sm leading-5 text-stone-500 grow whitespace-nowrap">
                    Full Stack Dev
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    Full Time
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    08
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    100
                  </div>
                  <div className="text-white text-sm font-bold leading-5 whitespace-nowrap justify-center items-stretch rounded bg-orange-300 self-stretch grow px-3.5 py-2">
                    Inactive
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 px-3 py-4 rounded-sm bg-slate-200 max-md:max-w-full max-md:flex-wrap">
                  <div className="self-center my-auto text-sm leading-5 text-stone-500 grow whitespace-nowrap">
                    DevOps
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    Internship
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    12
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    05
                  </div>
                  <div className="items-stretch self-stretch justify-center px-5 py-2 text-sm font-bold leading-5 text-white rounded whitespace-nowrap bg-emerald-300 grow">
                    Active
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 px-3 py-4 rounded-sm bg-slate-200 max-md:max-w-full max-md:flex-wrap">
                  <div className="self-center my-auto text-sm leading-5 text-stone-500 grow whitespace-nowrap">
                    Android Dev
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    Full Time
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    04
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    45
                  </div>
                  <div className="items-stretch self-stretch justify-center px-5 py-2 text-sm font-bold leading-5 text-white rounded whitespace-nowrap bg-emerald-300 grow">
                    Active
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 px-3 py-4 rounded-sm bg-slate-200 max-md:max-w-full max-md:flex-wrap">
                  <div className="self-center my-auto text-sm leading-5 text-stone-500 grow whitespace-nowrap">
                    IOS Developer
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    Full Time
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    18
                  </div>
                  <div className="self-center my-auto text-sm leading-5 text-stone-500">
                    96
                  </div>
                  <div className="text-white text-sm font-bold leading-5 whitespace-nowrap justify-center items-stretch rounded bg-orange-300 self-stretch grow px-3.5 py-2">
                    Inactive
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard
