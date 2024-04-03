import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Modal } from 'flowbite-react'

import useModal from '../../hooks/useModal.ts'

import recruiterService from '../../services/recruiterService.ts'

import PaginationType from '../../types/pagination.ts'
import Recruiter from '../../types/recruiter.ts'
import ColumnsType, { DataField } from '../../types/ColumnsType.tsx'

import Table from 'Common/table/Table'
import Toggle from 'Common/Toggle'
import { setLoad } from 'Common/setLoad'
import Button from 'Common/Button'

type RecruiterCriteria = {
  email: string
  name: string
  phone: string
  business: string
  sortBy: string[]
}

function ADRecruiters() {
  const [dataSource, setDataSource] = useState<PaginationType<Recruiter>>({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const data = await recruiterService.getRecruiters()
      setDataSource(data)
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const [params, setParams] = useState<RecruiterCriteria>({
    email: '',
    name: '',
    phone: '',
    business: '',
    sortBy: [],
  })

  const resetParams = () => {
    handleFindRecruiter({
      email: '',
      name: '',
      phone: '',
      business: '',
      sortBy: [],
    })
  }

  const handleFindRecruiter = (param: RecruiterCriteria) => {
    void (async () => {
      setParams(param)
      setLoad(true)
      const data = await recruiterService.getRecruiters(param)
      setLoad(false)
      setDataSource(data)
    })()
  }

  const [recruiterTarget, setRecruiterTarget] = useState<Recruiter>()
  const { modal, openModal, closeModal } = useModal()

  const handleChangeRecruiterDelete = (recruiter: Recruiter) => {
    setRecruiterTarget(recruiter)
    openModal('delete-account-recruiter-table')
  }
  const deleteRecruiter = (): void => {
    closeModal()
    if (!recruiterTarget?.id) {
      toast.error('Không có người dùng nào được chọn')
    } else {
      setLoad(true)
      if (!recruiterTarget.locked)
        serviceProcess(
          recruiterService.deleteRecruiterById(recruiterTarget?.id),
          'Đã khóa người dùng',
          'Không thể khóa người dùng'
        )
      else
        serviceProcess(
          recruiterService.openDeleteRecruiterById(recruiterTarget?.id),
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
        handleFindRecruiter(params)
      })
      .catch(() => {
        setLoad(false)
        toast.error(fail)
      })
  }

  const columns: ColumnsType<Recruiter>[] = [
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
      title: 'SĐT',
      dataIndex: new DataField(['phone']),
      filterKey: 'phone',
      filter: [],
      width: 100,
    },
    {
      title: 'Công ty',
      dataIndex: new DataField(['business', 'name']),
      filterKey: 'business',
      filter: [],
      width: 250,
    },
    {
      title: 'Trạng thái',
      filterKey: 'locked',
      width: 120,
      dataIndex: new DataField(['locked']),
      align: 'center',
      render: (row) => (
        <Toggle
          onChange={() => {
            handleChangeRecruiterDelete(row)
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
      align: 'center',
      width: 200,
      render: (row) => (
        <div
          className="flex justify-center gap-4"
          onClick={() => {
            window.open(`/admin/recruiters/${row.id}`)
          }}
        >
          <div className="px-2 font-semibold text-white transition-all cursor-pointer rounded-xl bg-button-admin-details">
            Chi tiết
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="p-4 py-4 h-[620px]">
      <h2 className="text-[20px] font-semibold mb-5">
        Danh sách nhà tuyển dụng
      </h2>
      <div className="overflow-auto">
        <Table
          name="recruiters"
          dataSource={dataSource.data}
          page={dataSource.currentPage}
          totalPage={dataSource.totalPages}
          columns={columns}
          params={params}
          setFilter={handleFindRecruiter}
          resetFilter={resetParams}
        ></Table>
      </div>

      <Modal
        id="delete-account-recruiter-table"
        show={modal === 'delete-account-recruiter-table'}
        size="md"
        popup
        onClose={() => closeModal()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn {recruiterTarget?.locked ? 'mở khóa' : 'khóa'}{' '}
              tài khoản {recruiterTarget?.name} không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteRecruiter}>
                Tôi chắc chắn
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  closeModal()
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  )
}

export default ADRecruiters
