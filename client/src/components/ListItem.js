import {useEffect, useState} from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal.js'
import ProductItem from './ProductItem.js'
import ModalProduct from './ModalProduct.js'
import {useCookies} from 'react-cookie'


const ListItem = ({ list, item, getData}) => {

  const [cookies] = useCookies(null)
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [products, setProducts] = useState(null)
  const authToken = cookies.AuthToken


  const getDataProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}/items`)
      const json = await response.json()
      setProducts(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getDataProduct()
    }
  }, [])

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
              <button className="add" onClick={() => setShowModal2(true)}>ADD ITEM</button>
              <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
              <button className="delete" onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} list={list}/>}
            {showModal2 && <ModalProduct mode={'add'} setShowModal={setShowModal2} getData={getDataProduct} item={item} list={list}/>}
          </div>
            
          <div className="product-container">
            <p>{products?.map((product) => <ProductItem key={product.id} item={product} list={list} getData={getDataProduct}/>)}</p>
          </div>
      </li>
  
    
    
    );
  }
  
  export default ListItem;
  