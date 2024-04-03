import { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'

import ColumnsType, { DataField } from '../../types/ColumnsType'

import Select from 'Common/input/Select'
import Table from 'Common/table/Table'
import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'
import Input from 'Common/input/Input'

import categogyService from '../../services/categoryService'
import professionService from '../../services/professionService'

import ProfessionType from '../../types/profession'
import Category from '../../types/category'
import useModal from '../../hooks/useModal'

export default function ProfessionsManagement() {
  // const { professions, categories } = useLoaderData() as ProfessionsLoader
  const [professions, setProfessions] = useState<ProfessionType[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  //target element
  const [professionTarget, setProfessionTarget] = useState<
    ProfessionType | undefined
  >(undefined)
  const [categoryTarget, setCategoryTarget] = useState<string>('')

  //modal
  const { modal, openModal, closeModal } = useModal()

  //update data
  const [updateProfessionData, setUpdateProfessionData] =
    useState<boolean>(true)

  //load data
  useEffect(() => {
    async function loadData(): Promise<void> {
      const categories: Category[] = await categogyService.getCategories()
      setCategories(categories)
    }
    loadData().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [])

  useEffect(() => {
    async function loadData(): Promise<void> {
      const professions: ProfessionType[] =
        await professionService.getProfessions()
      setProfessions(professions)
    }
    loadData().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [updateProfessionData])

  const createProfession = (): void => {
    const name: HTMLElement | null =
      document.getElementById('newProfessionName')
    if (name instanceof HTMLInputElement) {
      serviceProcess(
        professionService.createProfession(name.value, categoryTarget),
        'Tạo ngành nghề thành công',
        'Không thể tạo ngành nghề'
      )
    }
  }

  const updateProfession = (): void => {
    const name: HTMLElement | null = document.getElementById(
      'updateProfessionName'
    )
    if (name instanceof HTMLInputElement) {
      const id: number = parseInt(professionTarget?.id || '-1')
      serviceProcess(
        professionService.updateProfession(id, name.value, categoryTarget),
        'Cập nhật ngành nghề thành công',
        'Cập nhật ngành nghề không thành công'
      )
    }
  }

  const deleteProfession = (): void => {
    const id: number = parseInt(professionTarget?.id || '-1')
    serviceProcess(
      professionService.deleteProfessionById(id),
      'Đã xóa ngành nghề',
      'Không thể xóa ngành nghề'
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
        setUpdateProfessionData(!updateProfessionData)
      })
      .catch(() => {
        setLoad(false)
        toast.error(fail)
        setUpdateProfessionData(!updateProfessionData)
      })
  }

  const columns: ColumnsType<ProfessionType>[] = [
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
      width: 200,
      filterKey: 'action',
      render: (row) => (
        <div className="flex gap-4">
          <div
            className="px-2 font-semibold text-white transition-all cursor-pointer rounded-xl bg-button-admin-details"
            onClick={() => {
              setProfessionTarget(row)
              openModal('update-profession')
            }}
          >
            Chỉnh sửa
          </div>
          <div
            className="px-2 text-[14px] bg-red-500 hover:bg-red-700 text-white rounded cursor-pointerpx-2 font-semibold text-white transition-all bg-red-500 cursor-pointer rounded-xl hover:bg-red-700 "
            onClick={() => {
              setProfessionTarget(row)
              openModal('delete-profession')
            }}
          >
            Xóa
          </div>
        </div>
      ),
    },
  ]

  const [params, setParams] = useState<{ [key: string]: string }>({
    search: '',
  })

  const resetParams = () => {
    handleFindProfession({ search: '' })
  }

  const handleFindProfession = (param: { [key: string]: string }) => {
    void (async () => {
      setParams(params)
      setLoad(true)
      const data = await professionService.getProfessions(param)
      setLoad(false)
      setProfessions(data)
    })()
  }

  return (
    <main className="max-h-screen p-3 py-4 overflow-y-scroll lg:p-6 h-100">
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold mb-5">Quản lí ngành nghề</h2>
        <Button onClick={() => openModal('create-profession')}>Thêm mới</Button>
      </div>
      <Table
        name="professions"
        dataSource={professions}
        columns={columns}
        params={params}
        setFilter={handleFindProfession}
        resetFilter={resetParams}
      ></Table>

      <Modal
        id="create-profession"
        show={modal === 'create-profession'}
        onClose={closeModal}
      >
        <Modal.Header className="text-white bg-main">Thêm mới</Modal.Header>
        <Modal.Body>
          <Input
            label="Tên ngành nghề"
            placeholder="Nhập tên ngành nghề mới"
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="newProfessionName"
          />
          <Select
            label="Lĩnh vực"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategoryTarget(e.target.value)
            }}
          >
            <option value="none">Vui lòng chọn</option>
            {categories?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createProfession}>Tạo mới</Button>
          <Button color="gray" onClick={() => closeModal()}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update modal */}
      <Modal
        id="update-profession"
        show={modal === 'update-profession'}
        onClose={closeModal}
      >
        <Modal.Header className="text-white bg-main">Chỉnh sửa</Modal.Header>
        <Modal.Body>
          <Input
            label="Tên ngành nghề"
            placeholder="Nhập tên ngành nghề mới"
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="updateProfessionName"
            defaultValue={professionTarget?.name}
          />
          <Select
            label="Lĩnh vực"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategoryTarget(e.target.value)
            }}
          >
            <option value="none">Vui lòng chọn</option>
            {categories?.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateProfession}>Lưu</Button>
          <Button color="gray" onClick={closeModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        id="delete-profession"
        show={modal === 'delete-profession'}
        onClose={closeModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn xóa ngành nghề này không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteProfession}>
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
