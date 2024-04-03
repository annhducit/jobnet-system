import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from 'flowbite-react'
import { useParams } from 'react-router-dom'

import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'

import PostType from '../../types/post'
import postService from '../../services/postService'
import ErrorType from '../../types/error'

import { PostDetailsInfo } from '../../components/PostDetails'
import useModal from '../../hooks/useModal'

export default function AdminPostDetail(): JSX.Element {
  const id = useParams().id || ''

  const { modal, openModal, closeModal } = useModal()

  const [post, setPost] = useState<PostType | undefined>(undefined)

  const [updateData, setUpdateData] = useState<boolean>(true)

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const data = await postService.getPostById(id)
      setPost(data)
    }

    void loadData()
  }, [id, updateData])

  async function deletePost(): Promise<void> {
    closeModal()
    setLoad(true)
    try {
      await postService.updatePostStatus(id, 'Blocked')
      toast.success('Đã khóa bài đăng')
      setLoad(false)
      setUpdateData(!updateData)
    } catch (err) {
      toast.error((err as ErrorType).message)
      setLoad(false)
    }
  }

  const approvalPost = (status: boolean): void => {
    closeModal()
    setLoad(true)
    postService
      .updatePostStatus(id, status ? 'Opening' : 'Rejected')
      .then(() => {
        setLoad(false)
        toast.success('Đã cập nhật bài đăng')
      })
      .catch(() => {
        setLoad(false)
        toast.error('Không thể cập nhật bài đăng')
      })
  }

  return (
    <div className="max-h-screen py-6 pr-2 overflow-y-scroll">
      <span className="block mb-4 text-lg font-semibold opacity-80">
        Chi tiết bài đăng
      </span>
      {post && (
        <PostDetailsInfo type="Admin" post={post} openModal={openModal} />
      )}
      <Modal
        show={modal === 'lock-post-modal'}
        size="md"
        popup
        id="lock-post-modal"
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn khóa bài đăng này này không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => void deletePost()}>
                Tôi chắc chắn
              </Button>
              <Button color="gray" onClick={closeModal}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="approval-post"
        show={modal === 'approval-post'}
        size="xl"
        popup
        onClose={() => closeModal()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn duyệt nhanh bài đăng này?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  approvalPost(true)
                }}
              >
                Duyệt bài
              </Button>
              <Button
                color="failure"
                onClick={() => {
                  approvalPost(false)
                }}
              >
                Không chấp nhận
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
    </div>
  )
}
