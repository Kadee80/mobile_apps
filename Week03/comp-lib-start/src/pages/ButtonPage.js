import {FaAngry} from 'react-icons/fa'

import Button from '../components/Button'

export default function ButtonPage(props) {
  const valueForCondition = true

  return (
    <div>
      {valueForCondition && <Button primary />}
      <div>
        <Button
          primary
          rounded
          onClick={() => console.log('click')}
          className="mb-8"
        >
          Click Me!
        </Button>
      </div>
      <div>
        <Button secondary>
          <FaAngry />
          Click Me!
        </Button>
      </div>
      <div>
        <Button success rounded>
          Click Me!
        </Button>
      </div>
      <div>
        <Button warning outline>
          Click Me!
        </Button>
      </div>
      <div>
        <Button danger outline rounded>
          Click Me!
        </Button>
      </div>
    </div>
  )
}
