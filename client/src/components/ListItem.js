import { useState} from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal.js'
import ProductItem from './ProductItem.js'
import ItemModal from './ItemModal.js'


const ListItem = ({ list, getData, items }) => {

  const [showModal, setShowModal] = useState(false)
  const [showItemModal, setShowItemModal] = useState(false)

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
        <div className="info-button-container">
            <div className="info-container">
              <TickIcon/>
              <p style={{ fontWeight: 'bold', marginRight: '20px' }}>{list.title}</p>
              <p>{list.date}</p>
            </div>

            <div className="button-container">
            <button className="add" onClick={() => setShowItemModal(true)}>ADD ITEM</button>
              <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
              <button className="delete" onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} list={list}/>}
            {showItemModal && <ItemModal mode={'edit'} setShowItemModal={setShowItemModal} getData={getData} list={list} item={items}/>}
          </div>
          
          <div className="product-container">
            {items && items.map((item) => (
            <ProductItem key={item.id} item={item} getData={getData} />
          ))}
      </div>
      </li>
    
    
    
    );
  }
  
  export default ListItem;
  