import { HashLoader } from 'react-spinners'

import { useAppSelector } from '../app/hooks'

import Modal from 'Common/Modal'

export default function ModalLoader() {
  const loading = useAppSelector((state) => state.loading)

  return (
    <Modal show={loading}>
      <Modal.Body className="flex flex-col items-center gap-6 py-10">
        <HashLoader
          className="-translate-x-4"
          color="#36d7b7"
          size={40}
          speedMultiplier={1.2}
        />
        <div className="font-semibold">Vui lòng chờ trong giây lát...</div>
      </Modal.Body>
    </Modal>
  )
}
