export default function JobItemSkeleton() {
  return (
    <div className="items-stretch animate-pulse  hover:border-main transition-all hover:bg-slate-50 cursor-pointer border border-[color:var(--Gray-100,#E4E5E8)] shadow-sm bg-white flex max-w-[600px] flex-col p-6 rounded-lg border-solid">
      <div className="w-full text-lg font-medium leading-7 truncate hover:underline hover:text-main text-zinc-900 w-96 whitespace-nowrap">
        <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div>
      <span className="items-stretch flex justify-between gap-2 mt-1.5">
        <span className="items-stretch justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase bg-gray-100 rounded">
          {/* {data.workingFormat || 'Internship'} */}
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </span>
        <div className="text-sm leading-5 text-gray-500 grow shrink basis-auto">
          {/* {data.minSalary} - {data.maxSalary} */}
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
      </span>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="flex flex-col items-center self-stretch justify-center w-12 h-12 px-3 bg-gray-100 rounded aspect-square"></div>
        <span className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </span>
      </div>
    </div>
  )
}
