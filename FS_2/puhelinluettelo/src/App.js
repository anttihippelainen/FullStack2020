import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person.js'
import Input from './components/Input.js'
import Button from './components/Button.js'
import Filter from './components/Filter.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchParam, setSearchParam] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value)
  }
  
  const addNumber = (event) => {
    event.preventDefault()
    const Person = {
      name: newName,
      number: newNumber,
    }
    
    let names = persons.map(person =>person.name)
    
    if(names.includes(newName)){
      window.alert(newName + ' is already in the phonebook!')
    } else {
      setPersons(persons.concat(Person))
      setNewName("")
      setNewNumber("")
    }
  }

  const peopleToShow = persons.filter(person => person.name.includes(searchParam))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchParam} onChange={handleSearchChange}/>

      <h2>add a new number</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <Input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <Input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <Button type="submit" text='add' />
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map((person) =>
        <Person key={person.name} person={person}/>
      )}
    </div>
  )

}

export default App