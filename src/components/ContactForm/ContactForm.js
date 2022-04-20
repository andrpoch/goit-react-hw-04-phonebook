import React, { useState } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

function ContactForm({onSubmit}) {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');
   const handleChange = (e) => {
      const { name, value } = e.currentTarget;
      switch (name) {
         case 'name':
            setName(value);
            break;
         case 'number':
            setNumber(value);
            break;
         default:
            return;
      }
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(name, number);
      reset();
   }
   const reset = () => {
      setName('');
      setNumber('');
   };
      return (
         <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label}>
               Name
            </label>
            <input
               className={s.input}
               type="text"
               name="name"
               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
               required
               value={name}
               onChange={handleChange}
            />
            <label className={s.label}>
               Number
            </label>
            <input
               className={s.input}
               type="tel"
               name="number"
               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
               required
               value={number}
               onChange={handleChange}
            /> 
            <button type="submit" className={s.button}>
               Add contact
            </button>
         </form>
         
      );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;