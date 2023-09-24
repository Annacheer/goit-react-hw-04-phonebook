import React, { useState, useCallback } from 'react';
import { ButtonStyle, Form, Label } from './ContactForm.styled';

const ContactForm = ({ contacts, onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const { name, number } = formData;

  const handleChange = useCallback(event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (contacts.find(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);
        return;
      }

      onAddContact(name, number);
      setFormData({ name: '', number: '' });
    },
    [contacts, name, number, onAddContact]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </Label>
      <ButtonStyle type="submit">Add contact</ButtonStyle>
    </Form>
  );
};

export default ContactForm;
