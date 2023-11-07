import { useState } from 'react'
import {useCookies} from 'react-cookie'

const Modal = ( { mode, setShowModal, getData, list}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? list.user_email : cookies.Email,
    title: editMode ? list.title : null,
    date: editMode ? list.date : null,
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/lists', {
        method: "POST",
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log(response)
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }


  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/lists/${list.id}`, {
        method: 'PUT',
        headers:  { 'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.log(err)
    }

  }


  const handleChange = (e) => {
    console.log('changing', e)
    const {name, value} = e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))

    console.log(data)

  }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your list:</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>

          <form>
            <input 
              required
              maxLength={30}
              placeholder="Your list name goes here"
              name="title"
              value={data.title}
              onChange={handleChange}/>
            <br/>
            <input 
              required
              maxLength={300}
              placeholder="Write planning date of purchase"
              name="date"
              value={data.date}
              onChange={handleChange}/>
            
            <br/>
            <input className={mode} type="submit" onClick={editMode ? editData : postData} />
          </form>
        </div>
      </div>
    );
  }
  
  export default Modal;
  