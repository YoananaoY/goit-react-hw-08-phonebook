import React, { useState, useEffect } from 'react';
import css from './ContactsPage.module.css';

export const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      contact => contact.name === name || contact.phone === phone
    );

    if (isDuplicate && editing === null) {
      alert('Contact with the same name or phone number already exists');
      return;
    }

    const newContacts =
      editing !== null
        ? contacts.map((contact, index) =>
            index === editing ? { name, phone } : contact
          )
        : [...contacts, { name, phone }];

    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setName('');
    setPhone('');
    setEditing(null);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const newContacts =
  //     editing !== null
  //       ? contacts.map((contact, index) =>
  //           index === editing ? { name, phone } : contact
  //         )
  //       : [...contacts, { name, phone }];
  //   setContacts(newContacts);
  //   localStorage.setItem('contacts', JSON.stringify(newContacts));
  //   setName('');
  //   setPhone('');
  //   setEditing(null);
  // };

  const handleEdit = index => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditing(index);
  };

  const handleDelete = index => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  return (
    <div className={css.contactsPage}>
      <h2>{editing !== null ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit} className="contacts-form">
        <div className={css.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className={css.formGroup}>
          <label>Phone</label>
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </div>
        <button type="submit" className={css.submitButton}>
          {editing !== null ? 'Update' : 'Add'}
        </button>
      </form>
      <h2>Contacts</h2>
      <ul className={css.contactsList}>
        {contacts.map((contact, index) => (
          <li key={index} className={css.contactsItem}>
            {contact.name}: {contact.phone}{' '}
            <button
              onClick={() => handleEdit(index)}
              className={css.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className={css.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
