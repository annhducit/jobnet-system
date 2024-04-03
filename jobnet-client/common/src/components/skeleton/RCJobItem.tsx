export default function RCJobItemSkeleton(): JSX.Element {
  return (
    <div className="p-4 space-y-4 rounded-lg animate-pulse bg-second-lower">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold truncate cursor-pointer w-96 hover:text-main">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </h2>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
