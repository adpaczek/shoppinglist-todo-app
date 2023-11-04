import { useState} from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal.js'


const ListItem = ({ list, getData }) => {

  const [showModal, setShowModal] = useState(false)

  const deleteItem = async() => {
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

    return (
      <li className="list-item">
        
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{list.title}</p>
          <ProgressBar progress={list.progress}/>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} list={list}/>}

      </li>
    );
  }
  
  export default ListItem;
  