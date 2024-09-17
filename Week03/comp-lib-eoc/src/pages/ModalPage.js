import {useState} from 'react'

import Button from '../components/Button'
import Modal from '../components/Modal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Button primary outline className="m-4" onClick={handleClick}>
        Open Modal
      </Button>
      <Button danger outline className="m-4" onClick={handleClose}>
        Close Modal
      </Button>
      {isModalOpen && <Modal onClose={handleClose} />}
    </div>
  )
}
