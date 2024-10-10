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

  const actionBar = (
    <>
      <Button
        danger
        className="mr-5"
        onClick={() => console.log('clicked the danger button')}
      >
        Delete
      </Button>
      <Button success onClick={handleClose}>
        Accept
      </Button>
    </>
  )

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      This is a very import modal for you to accept or decline.
    </Modal>
  )

  return (
    <div>
      <Button primary outline className="m-4" onClick={handleClick}>
        Open Modal
      </Button>
      <Button danger outline className="m-4" onClick={handleClose}>
        Close Modal
      </Button>
      {isModalOpen && modal}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
        felis ornare, sollicitudin justo eget, placerat arcu. Nullam quis sem
        elementum, placerat libero id, hendrerit tellus. Morbi laoreet eleifend
        varius. Curabitur sagittis cursus odio eu sollicitudin. In lobortis
        consectetur est. Vivamus ac dolor ac nisl mattis sodales. Aenean turpis
        tellus, finibus feugiat purus sit amet, pharetra venenatis libero.
        Nullam quis tempus velit. Etiam ac risus leo. Mauris consequat diam quis
        erat fringilla, quis ultricies ipsum volutpat. Cras et congue erat.
        Donec cursus eleifend nibh. Sed dapibus auctor lorem, at cursus enim
        efficitur scelerisque. Aliquam porttitor libero mi, nec lobortis nibh
        convallis at. Sed mattis auctor condimentum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
    </div>
  )
}
