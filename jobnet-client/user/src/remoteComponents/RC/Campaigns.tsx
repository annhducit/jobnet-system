import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Dropdown from 'Common/Dropdown'

import profile from '../../../public/candidate.png'

import resumeService from '../../services/resumeService'

import ResumeType from '../../types/resume'

export default function Campaigns(): JSX.Element {
  const [option, showOption] = useState<boolean>(false)

  const [, setResumes] = useState<ResumeType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await resumeService.getResumesByAuth()
      data && setResumes(data)
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const { t } = useTranslation()

  return (
    <>
      <div className="pt-6 campaign gap-y-3">
        <Dropdown
          type="click"
          position="bottomRight"
          render={
            <div className="relative text-sm font-medium dropdown">
              <div
                onClick={() => showOption(!option)}
                className="flex items-center justify-between w-full p-3 border rounded cursor-pointer border-primary"
              >
                <span className="pointer-events-none">
                  {t('recruiter.campaign.new')}
                </span>
                <span className="pointer-events-none">
                  {option ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
            </div>
          }
        >
          <Dropdown.Header>
            <div className="text-lg font-bold">
              {t('recruiter.campaign.please')}
            </div>
          </Dropdown.Header>
          <Dropdown.Divider />
          {dropdownData.map((item) => (
            <Dropdown.Item key={item.id}>{item.content}</Dropdown.Item>
          ))}
        </Dropdown>
        <div>
          <span>{t('recruiter.campaign.or')}</span>
        </div>
        <div>
          <Link to="#" className="text-blue-500">
            {t('recruiter.campaign.create')}
          </Link>
        </div>
      </div>

      <h3 className="pt-6 font-bold">{t('recruiter.campaign.list')}:</h3>
      <hr />
      <div className="content h-[420px] overflow-y-auto">
        <div className="grid pt-3 layout-resume gap-x-5">
          {[1, 2, 3, 4].map((_resume, key) => (
            <ItemCV key={key} />
          ))}
        </div>
      </div>
    </>
  )
}

function ItemCV(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('resume-details/1')}
      className="w-full p-2 mt-6 transition-all rounded-md cursor-pointer bg-mainLower bg-second-lower hover:bg-mainBorder"
    >
      <div className="flex mt-2 layout-resume_second gap-x-6 layout-resume">
        <img
          className="object-cover rounded-md resume-item"
          src={`http://localhost:3013${profile}`}
          alt=""
          loading="lazy"
        />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-6">
            <p className="inline text-lg font-bold">Anh Duc</p>
            <span className="text-xs">15/2/1999</span>
          </div>

          <p>Fullstack developer</p>
          <div className="flex flex-col pt-3 gap-y-2">
            <p className="text-xs">
              <strong>Kinh nghiệm:</strong> 2 năm
            </p>
            <p className="text-xs">
              <strong>Bằng cấp:</strong> Đại học
            </p>
            <p className="text-xs">
              <strong>Kỹ năng:</strong> Java, VueJs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const dropdownData = [
  {
    id: 1,
    content: 'Chiến dịch một',
  },
  {
    id: 2,
    content: 'Chiến dịch hai',
  },
  {
    id: 3,
    content: 'Chiến dịch ba',
  },
]
