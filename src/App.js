import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const isNewName = contacts.map(({ name }) => name).includes(data.name);

    if (isNewName) {
      alert(`${data.name} is already in contacts `);
    } else {
      const contact = { id: nanoid(), ...data };
      setContacts([contact, ...contacts]);
    }
  };

  const deleteContact = idContact => {
    setContacts(contacts.filter(({ id }) => id !== idContact));
  };

  const changefilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter),
    );
  };

  useEffect(() => {
    window.JSON.stringify(
      localStorage.setItem('contacts', JSON.stringify(contacts)),
    );
  }, [contacts]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} changefilter={changefilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
