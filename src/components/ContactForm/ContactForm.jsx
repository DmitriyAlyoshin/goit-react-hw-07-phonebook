import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

import { useSelector, useDispatch } from 'react-redux';

import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsOperations';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Container,
  Input,
  Label,
  Wrapper,
  ErrorMsg,
  Btn,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Dmytro, Sergiy Dykiy'
    )
    .required(),
  phone: yup.string().required(),
});

const initialValues = {
  id: '',
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      phone: values.phone,
    };

    if (contacts.find(contact => contact.name === newContact.name)) {
      return toast.error(`${newContact.name} is already in contacts`);
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Container>
          <Wrapper>
            <Label htmlFor="name">Name:</Label>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Contact Name"
            />
            <ErrorMsg name="name" component="div" />
          </Wrapper>

          <Wrapper>
            <Label htmlFor="phone">Number:</Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="+38-050-123-45-67"
            />
            <ErrorMsg name="phone" component="div" />
          </Wrapper>

          <Btn type="submit">Add contact</Btn>
        </Container>
      </Formik>
      <ToastContainer />
    </>
  );
};
