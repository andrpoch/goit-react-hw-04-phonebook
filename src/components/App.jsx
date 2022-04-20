import React, {useState,useEffect} from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from "./ContactList/ContactList";
import Filter from "./FilterSearch/FilterSearch";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    return window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

    const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }
    if (contacts.find((contact) => contact.name === name)) {
      NotificationManager.error(`It's already there "${name}"`, 'Are you blind?', 7000);
      return;
    }
      setContacts((prevContacts) => [newContact, ...prevContacts]);
    NotificationManager.success(`"${name}" Continue...`, `It's beautiful!`, 7000);
    return;
    };
    const changeFilter = ({target}) => {
      setFilter(target.value);
    };
    const showContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
    };
    const onDeleteContact = (contactId) => {
    setContacts(contacts.filter(
        (contact) => contact.id !== contactId))
    };
  return (
    <>
      <h1>Phonebook</h1>

        <ContactForm onSubmit={addContact} />

      <h2>Filter</h2>
        <Filter value={filter} onChange={changeFilter} />
        
        <h2>Contacts</h2>
        <ContactList
          contacts={showContacts()}
          onDeleteContact={onDeleteContact}
        />
          <NotificationContainer/>
      </> 
  )
}
export default App;