import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import UploadCVGif from '../components/UploadCVGif'

import useTitlePage from '../hooks/useTitlePage'
type Category = {
  name: string
  total: number
}

type CategoryProps = {
  industry: string
  categories: Category[]
}

type LocationProps = {
  region: string
  city: string[]
}

export default function Categories() {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.categories'))

  return (
    <>
      <div className="pt-20 border-box">
        <div className="flex flex-col-reverse sm:flex-row">
          <div className="p-5 lg:w-3/4 sm:w-2/4 left">
            <h1 className="text-lg">
              <b>Find Jobs by Categories</b>
            </h1>
            <hr className="mt-2 mb-2 border-second border-1" />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-x-6">
              {categoriesData.map((item, index) => {
                return <RenderProfessionItem key={index} data={item} />
              })}
            </div>
          </div>
          <div className="flex flex-col w-full p-4 lg:w-1/4 sm:w-2/4 right gap-y-3">
            <div className="flex flex-col p-6 bg-gray-100 gap-y-3 Type">
              <b className="text-lg">Jobs by Type</b>
              {jobTypes.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between w-full ">
                    <a
                      href="#"
                      className="text-sm font-medium text-stone-600 hover:text-blue-500"
                    >
                      {item.type}
                    </a>
                    <a
                      href="#"
                      className="font-medium text-main hover:text-blue-500"
                    >
                      {item.total}
                    </a>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col p-6 bg-gray-100 gap-y-2 Type">
              <b className="text-lg">Jobs by Location</b>
              {jobLocation.map((item, index) => {
                return <RenderLocationCity key={index} data={item} />
              })}
            </div>
          </div>
        </div>
      </div>
      <UploadCVGif />
    </>
  )
}

const RenderProfessionItem = ({ data }: { data: CategoryProps }) => {
  return (
    <div className="box-border flex flex-col p-6 pl-0">
      <h2 className="text-lg font-bold text-blue-800 industry">
        {data.industry}
      </h2>
      <hr className="mt-2 mb-2 border-blue-400 border-1" />
      <div className="flex flex-col sm:gap-y-4 lg:gap-1 content">
        {data.categories.map((item, index) => (
          <div key={index} className="flex justify-between w-full ">
            <Link
              to="#"
              className="text-sm font-medium break-all text-stone-600 hover:text-blue-500"
            >
              {item.name}
            </Link>
            <Link to="#" className="font-medium text-main hover:text-blue-500">
              {item.total}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const RenderLocationCity = ({ data }: { data: LocationProps }) => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <b>
        {data.region != 'Overseas Jobs'
          ? `Jobs in ${data.region}`
          : data.region}
      </b>
      {data.city.map((item, index) => (
        <Link
          key={index}
          to="#"
          className="ml-2 text-sm font-medium text-stone-600 hover:text-blue-500"
        >
          Job in {item}
        </Link>
      ))}
    </div>
  )
}

// * DATA
const categoriesData = [
  {
    industry: 'SALES / MARKETING JOBS',
    categories: [
      {
        name: 'Marketing',
        total: 2764,
      },
      {
        name: 'Online Marketing',
        total: 556,
      },
      {
        name: 'Retail / Wholesale',
        total: 1.801,
      },
      {
        name: 'Sales / Business Development',
        total: 5.627,
      },
    ],
  },
  {
    industry: 'SERVICES JOBS',
    categories: [
      {
        name: 'Consulting',
        total: 2764,
      },
      {
        name: 'Security',
        total: 556,
      },
      {
        name: 'Law / Legal Services',
        total: 1.801,
      },
      {
        name: 'Customer Service',
        total: 5.627,
      },
      {
        name: 'Unskilled Workers',
        total: 5.627,
      },
      {
        name: 'Telecommunications',
        total: 5.627,
      },
      {
        name: 'Freight / Logistics / Warehouse',
        total: 5.627,
      },
      {
        name: 'NGO / Non-Profit',
        total: 5.627,
      },
    ],
  },
  {
    industry: 'HEALTHCARE JOBS',
    categories: [
      {
        name: 'Medical / Healthcare',
        total: 2764,
      },
      {
        name: 'Pharmacy',
        total: 556,
      },
    ],
  },
  {
    industry: 'MANUFACTURING JOBS',
    categories: [
      {
        name: 'Textiles / Garments / Fashion',
        total: 2764,
      },
      {
        name: 'Quality Control (QA/QC)',
        total: 556,
      },
      {
        name: 'Purchasing / Merchandising',
        total: 2764,
      },
      {
        name: 'HSE',
        total: 556,
      },
      {
        name: 'Manufacturing / Process',
        total: 2764,
      },
      {
        name: 'Import / Export',
        total: 556,
      },
      {
        name: 'Wood',
        total: 2764,
      },
      {
        name: 'Printing / Publishing',
        total: 556,
      },
    ],
  },
  {
    industry: 'ACCOUNTING / FINANCE JOBS',
    categories: [
      {
        name: 'Banking',
        total: 2764,
      },
      {
        name: 'Securities',
        total: 556,
      },
      {
        name: 'nsurance',
        total: 2764,
      },
      {
        name: 'Finance / Investment',
        total: 556,
      },
      {
        name: 'Accounting / Auditing / Tax',
        total: 2764,
      },
    ],
  },
  {
    industry: 'MANUFACTURING JOBS',
    categories: [
      {
        name: 'Textiles / Garments / Fashion',
        total: 2764,
      },
      {
        name: 'Quality Control (QA/QC)',
        total: 556,
      },
      {
        name: 'Purchasing / Merchandising',
        total: 2764,
      },
      {
        name: 'HSE',
        total: 556,
      },
      {
        name: 'Manufacturing / Process',
        total: 2764,
      },
      {
        name: 'Import / Export',
        total: 556,
      },
      {
        name: 'Wood',
        total: 2764,
      },
      {
        name: 'Printing / Publishing',
        total: 556,
      },
    ],
  },
]

const jobTypes = [
  {
    type: '$1000 + jobs',
    total: 439,
  },
  {
    type: 'Entry Level / Internship',
    total: 439,
  },
  {
    type: 'Executive managements',
    total: 439,
  },
  {
    type: 'Contract/ Freelance',
    total: 439,
  },
  {
    type: 'Temporary / Project',
    total: 439,
  },
]

const jobLocation = [
  {
    region: 'Viet Nam',
    city: ['Ho Chi Minh', 'Nha Trang', 'Dong Nai', 'Binh Duong', 'Ha Noi'],
  },
  {
    region: 'Overseas Jobs',
    city: ['Japan', 'Malaysia', 'Singapore', 'Cambodia'],
  },
]
