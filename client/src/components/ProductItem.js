import { useState} from 'react'
import ItemModal from './ItemModal.js'


const ProductItem = ({ list, item, getData }) => {

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
      <li className="product-item">
        
        <div className="info-container-item">
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.unit}</p>
        </div>

        <div className="button-container-item">

          <button className="edit" onClick={() => setShowItemModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showItemModal && <ItemModal mode={'edit'} setShowItemModal={setShowItemModal} getData={getData} list={list}/>}

      </li>
    );
  }
  
  export default ProductItem;
  