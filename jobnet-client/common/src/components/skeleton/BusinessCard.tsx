import Button from "../Button";

export default function BusinessCardSkeleton() {
  return (
    <div className="items-stretch animate-pulse border p-6 border-[color:var(--Gray-100,#E4E5E8)] shadow-sm bg-white flex max-w-[424px] flex-col px-4 rounded-lg border-solid">
      <div className="flex flex-col items-stretch justify-between">
        <div className="flex items-center justify-center w-64 h-40 bg-gray-200 rounded dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-100 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="items-stretch w-full flex grow py-4 basis-[0%] flex-col self-start">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
        <Button
          color="bg-gray-200"
          className="items-center justify-center px-16 py-2 font-semibold leading-6 capitalize bg-gray-200 rounded whitespace-nowrap"
        >{''}
        </Button>

        {/* {!follow ? (
          <Button
            color="none"
            className="items-center justify-center px-16 py-2 mt-5 text-base font-semibold leading-6 text-blue-700 capitalize rounded whitespace-nowrap bg-sky-100"
            onClick={() => handleFollowClick()}
          >
            {t('home.topLeadingBusinesses.button.follow')}
          </Button>
        ) : (
          <Button color={'red'} onClick={() => handleUnFollowClick()}>
            <FaPlusCircle className="w-5 h-5 mr-2" />
            {t('home.topLeadingBusinesses.button.unfollow')}
          </Button>
        )} */}
      </div>
    </div>
  )
}
