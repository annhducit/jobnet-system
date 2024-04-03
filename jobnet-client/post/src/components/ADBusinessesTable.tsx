import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Badge } from 'flowbite-react'

import businessService from '../services/businessService'

import type Business from '../types/business'
import PaginationType from '../types/pagination'
import { EBusinessStatus } from '../types/business'
import ColumnsType, { DataField } from '../types/ColumnsType'

import Table from 'Common/table/Table'
import Toggle from 'Common/Toggle'
import Button from 'Common/Button'
import Modal from 'Common/Modal'

import useModal from '../hooks/useModal'
import { setLoad } from 'Common/setLoad'

type BussinessCriteria = {
  email: string
  name: string
  phone: string
  status: string
  sortBy: string[]
}

type DefaultBusinessPage = {
  status?: string
}

function ADBussinessesTable({ ...props }: DefaultBusinessPage) {
  const [dataSource, setDataSource] = useState<PaginationType<Business>>({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await businessService.getBusinesses(props)
      setDataSource(data)
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const [params, setParams] = useState<BussinessCriteria>({
    email: '',
    name: '',
    phone: '',
    status: '',
    sortBy: [],
    ...props,
  })

  const resetParams = () => {
    handleFindBusiness({
      email: '',
      name: '',
      phone: '',
      status: '',
      sortBy: [],
    })
  }

  const handleFindBusiness = (param: BussinessCriteria) => {
    void (async () => {
      const paramMergeWithDefault: BussinessCriteria = { ...param, ...props }
      setParams(paramMergeWithDefault)
      setLoad(true)
      const data = await businessService.getBusinesses(paramMergeWithDefault)
      setLoad(false)
      setDataSource(data)
    })()
  }

  const [businessTarget, setBusinessTarget] = useState<Business>()
  const { modal, openModal, closeModal } = useModal()

  const handleChangeBusinessDelete = (business: Business) => {
    setBusinessTarget(business)
    openModal('delete-account-business-table')
  }
  const deleteBusiness = () => {
    closeModal()
    if (!businessTarget?.id) {
      toast.error('Không có doanh nghiệp nào được chọn')
    } else {
      setLoad(true)
      if (!businessTarget.isDeleted)
        serviceProcess(
          businessService.deleteBusinessById(businessTarget?.id),
          'Đã khóa doanh nghiệp',
          'Không thể khóa doanh nghiệp'
        )
      else
        serviceProcess(
          businessService.openDeleteBusinessById(businessTarget?.id),
          'Đã mở khóa doanh nghiệp',
          'Không thể mở khóa doanh nghiệp'
        )
      setLoad(false)
    }
  }

  const handleBusinessStatusUpdate = (
    businessId: string,
    status: EBusinessStatus
  ) => {
    void (async () => {
      try {
        closeModal()
        await businessService.updateBusinessStatus(businessId, status)
        const paramMergeWithDefault: BussinessCriteria = { ...params, ...props }
        const pagination = await businessService.getBusinesses(
          paramMergeWithDefault
        )
        setDataSource(pagination)
        toast.success('Thực hiện thành công!')
      } catch (e) {
        toast.error('Đã xảy ra lỗi!')
      }
    })()
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
        handleFindBusiness(params)
      })
      .catch(() => {
        setLoad(false)
        toast.error(fail)
      })
  }

  const columns: ColumnsType<Business>[] = [
    {
      title: 'Business',
      dataIndex: new DataField(['name']),
      filterKey: 'name',
      filter: [],
      width: 250,
    },
    {
      title: 'SĐT',
      dataIndex: new DataField(['phone']),
      filterKey: 'phone',
      align: 'center',
      filter: [],
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: new DataField(['email']),
      filterKey: 'email',
      filter: [],
      width: 250,
    },
    {
      title: 'Follows',
      align: 'center',
      dataIndex: new DataField(['totalFollowers']),
      filterKey: 'totalFollowers',
      sort: true,
      width: 150,
    },
    {
      title: 'Status',
      filterKey: 'status',
      width: 100,
      dataIndex: new DataField(['status']),
      align: 'center',
      render: (row) => (
        <>
          {row?.status === 'Pending' && (
            <Badge className="px-4 text-sm" color={'warning'}>
              Pending
            </Badge>
          )}
          {row?.status === 'Approved' && (
            <Badge className="px-4 text-sm" color={'success'}>
              Approved
            </Badge>
          )}
          {row?.status === 'Rejected' && (
            <Badge className="px-4 text-sm" color={'failure'}>
              Rejected
            </Badge>
          )}
        </>
      ),
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
            handleChangeBusinessDelete(row)
          }}
          toggleSize="sm"
          checked={row.isDeleted}
        />
      ),
    },

    {
      title: 'Action',
      dataIndex: new DataField([]),
      align: 'center',
      filterKey: 'action',
      width: 300,
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <div
            onClick={() => window.open(`/admin/businesses/${row.id}`)}
            className="px-2 font-semibold text-white transition-all cursor-pointer rounded-xl bg-button-admin-details"
          >
            Chi tiết
          </div>
          {row.status === 'Pending' && (
            <>
              <div
                onClick={() => handleBusinessStatusUpdate(row.id, 'Approved')}
                className="px-2 font-semibold text-yellow-600 cursor-pointer rounded-xl bg-button-admin-approved"
              >
                Xét duyệt
              </div>
              <div
                onClick={() => handleBusinessStatusUpdate(row.id, 'Rejected')}
                className="px-2 font-semibold text-red-600 transition-all cursor-pointer rounded-xl bg-button-admin-rejected"
              >
                Từ chối
              </div>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <main className="h-screen p-3 py-4 overflow-y-scroll">
      <h2 className="text-[20px] font-semibold mb-5">Danh sách doanh nghiệp</h2>

      <Table
        name="business"
        dataSource={dataSource.data}
        page={dataSource.currentPage}
        totalPage={dataSource.totalPages}
        columns={columns}
        params={params}
        setFilter={handleFindBusiness}
        resetFilter={resetParams}
      ></Table>

      <Modal
        id="delete-account-business-table"
        show={modal === 'delete-account-business-table'}
        size="md"
        popup
        onClose={() => closeModal()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn {businessTarget?.isDeleted ? 'mở khóa' : 'khóa'}{' '}
              doanh nghiệp <b className="text-main">{businessTarget?.name}</b>{' '}
              không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteBusiness}>
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

export default ADBussinessesTable
