import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import {useEffect, useState} from 'react'

const App = () => {

  const userEmail = 'ania@test.com'
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

  //Sort by date
  const sortedLists = lists?.sort((a,b) => new Date(a.date) - new Date(b.date))

  useEffect(() => getData, [])

  console.log(lists)


  return (
    <div className = "app">
      <ListHeader listName = {'📜 Shopping list'} />
      {sortedLists?.map((list) => <ListItem key={list.id} list={list} />)}
    </div>
  );
}

export default App;
