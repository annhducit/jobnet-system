import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import useModal from '../../hooks/useModal'

import categogyService from '../../services/categoryService'

import Table from 'Common/table/Table'
import Button from 'Common/Button'
import Input from 'Common/input/Input'
import { setLoad } from 'Common/setLoad'

import ColumnsType, { DataField } from '../../types/ColumnsType'
import Category from '../../types/category'

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])

  const { modal, openModal, closeModal } = useModal()
  const [categoryTarget, setCategoryTarget] = useState<Category | undefined>(
    undefined
  )
  const [updateData, setUpdateData] = useState<boolean>(true)

  const [params, setParams] = useState<{ [key: string]: string }>({
    search: '',
  })

  useEffect(() => {
    async function loadData(): Promise<void> {
      const categories: Category[] = await categogyService.getCategories()
      setCategories(categories)
    }
    loadData().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [updateData])

  const createCategory = (): void => {
    const name: HTMLElement | null = document.getElementById('newCategoryName')
    if (name instanceof HTMLInputElement) {
      serviceProcess(
        categogyService.createCategory(name.value),
        'Tạo lĩnh vực thành công',
        'Tạo lĩnh vực không thành công'
      )
    }
  }
  const updateCategory = (): void => {
    const name: HTMLElement | null =
      document.getElementById('updateCategoryName')
    if (name instanceof HTMLInputElement) {
      const id = categoryTarget?.id
      id &&
        serviceProcess(
          categogyService.updateCategory(id, name.value),
          'Cập nhật lĩnh vực thành công',
          'Cập nhật lĩnh vực không thành công'
        )
    }
  }
  const deleteCategory = (): void => {
    const id: string = categoryTarget?.id.toString() || ''
    serviceProcess(
      categogyService.deleteCategoryById(id),
      'Xóa lĩnh vực thành công',
      'Xóa lĩnh vực không thành công'
    )
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
        setUpdateData(!updateData)
      })
      .catch(() => {
        setLoad(false)
        toast.error(fail)
        setUpdateData(!updateData)
      })
  }

  const resetParams = () => {
    handleFindCate({ search: '' })
  }
  const handleFindCate = (param: { [key: string]: string }) => {
    void (async () => {
      setParams(param)
      setLoad(true)
      const data = await categogyService.getCategories(param)
      setLoad(false)
      setCategories(data)
    })()
  }

  const columns: ColumnsType<Category>[] = [
    {
      title: 'Tên',
      dataIndex: new DataField(['name']),
      filterKey: 'search',
      filter: [],
      width: 1500,
    },
    {
      title: 'Action',
      dataIndex: new DataField([]),
      filterKey: 'action',
      width: 200,
      render: (row) => (
        <div className="flex gap-4">
          <div
            className="px-2 font-semibold text-white transition-all cursor-pointer rounded-xl bg-button-admin-details"
            onClick={() => {
              setCategoryTarget(row)
              openModal('update-category')
            }}
          >
            Chỉnh sửa
          </div>
          <div
            className="px-2 font-semibold text-white transition-all bg-red-500 cursor-pointer rounded-xl hover:bg-red-700 "
            onClick={() => {
              setCategoryTarget(row)
              openModal('delete-category')
            }}
          >
            Xóa
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="max-h-screen p-3 py-4 overflow-y-scroll lg:p-6 h-100">
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold mb-5">
          Quản lí lĩnh vực công việc
        </h2>
        <Button
          onClick={() => {
            openModal('create-category')
          }}
        >
          Thêm mới
        </Button>
      </div>
      <Table
        name="categories"
        dataSource={categories}
        columns={columns}
        params={params}
        setFilter={handleFindCate}
        resetFilter={resetParams}
      />

      <Modal
        id="create-category"
        show={modal === 'create-category'}
        onClose={closeModal}
      >
        <Modal.Header className="text-white bg-main">Thêm mới</Modal.Header>
        <Modal.Body>
          <Input
            label="Tên lĩnh vực"
            placeholder="Nhập tên lĩnh vực mới  "
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="newCategoryName"
            defaultValue={''}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createCategory}>Tạo mới</Button>
          <Button color="gray" onClick={closeModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        id="update-category"
        show={modal === 'update-category'}
        onClose={closeModal}
      >
        <Modal.Header className="text-white bg-main">Chỉnh sửa</Modal.Header>
        <Modal.Body>
          <Input
            label="Tên lĩnh vực"
            placeholder="Nhập tên lĩnh vực mới  "
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="updateCategoryName"
            defaultValue={categoryTarget?.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateCategory}>Lưu</Button>
          <Button color="gray" onClick={closeModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        id="delete-category"
        show={modal === 'delete-category'}
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn xóa lĩnh vực này không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteCategory}>
                Tôi chắc chắn
              </Button>
              <Button color="gray" onClick={closeModal}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  )
}
