import './App.css';
import { useEffect, useState } from 'react';

import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [friendsList, setFriendsList] = useState([]);
  const addFriend = () => {
    Axios.post('http://localhost:3001/addFriend',
      {
        name: name,
        age: age
      })
  }
  const deleteFriend = (id) => {
      Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then(resp => {
      setFriendsList(resp.data);
    })
  }, [friendsList])

  const updateFriend = (id) => {
    const newAge = prompt('enter the new age');
    Axios.put('http://localhost:3001/update', { newAge: newAge, id: id });
  }
  return (
    <div className="App">
      <div class="inputs">
        <input type="text"
          placeholder="enter friends name ..."
          onChange={(e) => setName(e.target.value)}
        />
        <input type="number"
          placeholder="enter friends age..."
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={addFriend}>Add friend</button>
      </div>
      <div className="friends-container">
        {friendsList.map(ele => {
          return (
            <div className="friendcontainer">
              <div className="friend">
                <h3>Name:{ele.name}</h3>
                <h3>age:{ele.age}</h3>
              </div>
              <button onClick={() => updateFriend(ele._id)}>update</button>
              <button onClick = {()=>deleteFriend(ele._id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
