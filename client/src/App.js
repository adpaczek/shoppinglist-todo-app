import ListHeader from './components/ListHeader.js'
import ListItem from './components/ListItem.js'
import Auth from './components/Auth.js'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'

const App = () => {
  const [cookies] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [lists, setLists] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/lists/${userEmail}`)
      const json = await response.json()
      setLists(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  //Sort by date
  const sortedLists = lists?.sort((a,b) => new Date(a.date) - new Date(b.date))

  console.log(lists)
  


  return (
    <div className = "app">
      {!authToken && <Auth/>}
      {authToken && 
        <>
        <ListHeader listName = {'📜 Shopping list'} getData={getData} />
        {sortedLists?.map((list) => <ListItem key={list.id} list={list} getData={getData}/>)}
        </>}
    </div>
  );
}

export default App;
