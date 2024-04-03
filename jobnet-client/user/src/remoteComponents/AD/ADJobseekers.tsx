import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import useModal from '../../hooks/useModal'

import jobseekersService from '../../services/jobSeekerService'

import PaginationType from '../../types/pagination'
import type Jobseeker from '../../types/jobSeeker'
import ColumnsType, { DataField } from '../../types/ColumnsType'

import Table from 'Common/table/Table'
import Select from 'Common/input/Select'
import Toggle from 'Common/Toggle'
import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'

type JobSeekerCriteria = {
  email: string
  name: string
  phone: string
  verificationStatus: string
  accountType: string
  sortBy: string[]
}

function ADJobseekers() {
  const [dataSource, setDataSource] = useState<PaginationType<Jobseeker>>({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await jobseekersService.getJobSeekers()
      setDataSource(data)
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const [params, setParams] = useState<JobSeekerCriteria>({
    email: '',
    name: '',
    phone: '',
    verificationStatus: '',
    accountType: '',
    sortBy: [],
  })

  const resetParams = () => {
    handleFindJobSeeker({
      email: '',
      name: '',
      phone: '',
      verificationStatus: '',
      accountType: '',
      sortBy: [],
    })
  }

  const handleFindJobSeeker = (param: JobSeekerCriteria) => {
    void (async () => {
      setParams(params)
      setLoad(true)
      const data = await jobseekersService.getJobSeekers(param)
      setLoad(false)
      setDataSource(data)
    })()
  }

  const [jobSeekerTarget, setJobseekerTarget] = useState<Jobseeker>()
  const { modal, openModal, closeModal } = useModal()

  const handleChangeJobSeekerDelete = (jobSeeker: Jobseeker) => {
    setJobseekerTarget(jobSeeker)
    openModal('delete-account-jobseeker-table')
  }
  const deleteJobseeker = (): void => {
    closeModal()
    if (!jobSeekerTarget?.id) {
      toast.error('Không có người dùng nào được chọn')
    } else {
      setLoad(true)
      if (!jobSeekerTarget.locked)
        serviceProcess(
          jobseekersService.deleteJobSeekerById(jobSeekerTarget?.id),
          'Đã khóa người dùng',
          'Không thể khóa người dùng'
        )
      else
        serviceProcess(
          jobseekersService.openDeleteJobSeekerById(jobSeekerTarget?.id),
          'Đã mở khóa người dùng',
          'Không thể mở khóa người dùng'
        )
    }
  }

  function serviceProcess(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prom: Promise<any>,
    success: string,
    fail: string
  ): void {
    closeModal()
    setLoad(true)
    prom
      .then(() => {
        setLoad(false)
        toast.success(success)
        handleFindJobSeeker(params)
      })
      .catch(() => {
        setLoad(false)
        toast.error(fail)
      })
  }

  const columns: ColumnsType<Jobseeker>[] = [
    {
      title: 'Tên',
      dataIndex: new DataField(['name']),
      filterKey: 'name',
      filter: [],
      width: 250,
    },
    {
      title: 'Email',
      dataIndex: new DataField(['email']),
      filterKey: 'email',
      filter: [],
      width: 250,
    },
    {
      title: 'Trạng thái',
      dataIndex: new DataField(['verificationStatus']),
      filterKey: 'verificationStatus',
      width: 170,
      align: 'center',
      filter: [
        {
          text: 'Verified',
          value: 'Verified',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Not Verified',
          value: 'NotVerified',
        },
        {
          text: 'Failed Verification',
          value: 'FailedVerification',
        },
        {
          text: 'Expired',
          value: 'Expired',
        },
      ],
      render: (row) => (
        <Select defaultValue={row.verificationStatus}>
          <option value={'Verified'}>{'Verified'}</option>
          <option value={'Pending'}>{'Pending'}</option>
          <option value={'NotVerified'}>{'Not Verified'}</option>
          <option value={'FailedVerification'}>{'Failed Verification'}</option>
          <option value={'Expired'}>{'Expired'}</option>
        </Select>
      ),
    },
    {
      title: 'Loại',
      filterKey: 'accountType',
      align: 'center',
      width: 200,
      dataIndex: new DataField(['accountType']),
      filter: [
        {
          text: 'Free',
          value: 'Free',
        },
        {
          text: 'Premium',
          value: 'Premium',
        },
        {
          text: 'Trial',
          value: 'Trial',
        },
      ],
    },
    {
      title: 'isDeleted',
      filterKey: 'Deleted',
      width: 100,
      dataIndex: new DataField(['isDeleted']),
      align: 'center',
      render: (row) => (
        <Toggle
          onChange={() => {
            handleChangeJobSeekerDelete(row)
          }}
          toggleSize="sm"
          checked={row.locked}
        />
      ),
    },
    {
      title: 'Action',
      filterKey: 'action',
      dataIndex: new DataField([]),
      width: 120,
      render: (row) => (
        <div
          className="flex justify-center gap-4"
          onClick={() => window.open(`../jobseekers/${row.id}`)}
        >
          <div className="px-2 font-semibold text-white transition-all cursor-pointer rounded-xl bg-button-admin-details">
            Chi tiết
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="h-full p-3 py-4 overflow-y-auto">
      <h2 className="text-[20px] font-semibold mb-5">Danh sách Jobseeker</h2>
      <Table
        name="jobseekers"
        dataSource={dataSource.data}
        page={dataSource.currentPage}
        totalPage={dataSource.totalPages}
        columns={columns}
        params={params}
        setFilter={handleFindJobSeeker}
        resetFilter={resetParams}
      ></Table>

      <Modal
        id="delete-account-jobseeker-table"
        show={modal === 'delete-account-jobseeker-table'}
        size="md"
        popup
        onClose={() => closeModal()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn {jobSeekerTarget?.locked ? 'mở khóa' : 'khóa'}{' '}
              tài khoản {jobSeekerTarget?.name} không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteJobseeker}>
                Tôi chắc chắn
              </Button>
              <Button color="gray" onClick={() => closeModal()}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  )
}
export default ADJobseekers
