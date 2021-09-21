import './App.css';
import allContacts from './contacts.json';
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5))
  const contactLists = contacts.map(contact => {
      return (
      <tr key={contact.id}>
        <td><img src={contact.pictureUrl} alt={contact.name} width="120px"/></td>
        <td>{contact.name}</td>
        <td>{contact.popularity}</td>
        {contact.wonOscar && <td>🏆</td>}
        {contact.wonEmmy && <td>🏆</td>}
      </tr>
      )})

  const addContact = () => {
    let randomContact = allContacts[Math.floor(Math.random() * (allContacts.length - 5) + 5)]
    const randomId = randomContact.id
    let isInList = false;
      for (let contact of contacts) {
        if (randomId === contact.id) {
           isInList = true
        }
      }
    if (!isInList) {
      setContacts(contacts => [randomContact, ...contacts])
    } 
  }

  const sortByPopularity = () => {
    const sortedContacts = contacts.sort((a,b) => b.popularity - a.popularity)
    setContacts(contacts => [...sortedContacts])
  }

  const sortByName = () => {
    const sortedName = contacts.sort((a,b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    console.log(sortedName);
    setContacts(contacts => [...sortedName])
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="buttons">
        <button onClick={addContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
        <button onClick={sortByName}>Sort by name</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
            <td>Won<br/>Oscar</td>
            <td>Won<br/>Emmy</td>
          </tr>
        </thead>
        <tbody>
          {contactLists}
        </tbody>
      </table>
    </div>
  );
}

export default App;
