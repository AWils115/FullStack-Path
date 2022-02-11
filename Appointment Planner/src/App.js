import React, { useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import { AppointmentsPage } from './containers/appointmentsPage/AppointmentsPage';
import { ContactsPage } from './containers/contactsPage/ContactsPage';

function App() {
	/*
  Define state variables for 
  contacts and appointments 
  */
	const [contacts, setContacts] = useState([]);
	const [appointments, setAppointments] = useState([]);

	const ROUTES = {
		CONTACTS: '/contacts',
		APPOINTMENTS: '/appointments',
	};

	/*
  Implement functions to add data to
  contacts and appointments
  */
	const addContact = (name, phoneNumber, email) => {
		setContacts([
      ...contacts,
      {
        name: name,
        phoneNumber: phoneNumber,
        email: email
      }
    ]);
	};

	const addApointment = (title, contact, date, time) => {
		setAppointments([
      ...appointments,
      {
        title: title,
        contact: contact,
        date: date,
        time: time
      }
    ]);
	};

	return (
		<>
			<nav>
				<NavLink to={ROUTES.CONTACTS} activeClassName='active'>
					Contacts
				</NavLink>
				<NavLink to={ROUTES.APPOINTMENTS} activeClassName='active'>
					Appointments
				</NavLink>
			</nav>
			<main>
				<Switch>
					<Route exact path='/'>
						<Redirect to={ROUTES.CONTACTS} />
					</Route>
					<Route path={ROUTES.CONTACTS}>
						<ContactsPage 
              contacts={contacts}
              addContact={addContact}
            />
					</Route>
					<Route path={ROUTES.APPOINTMENTS}>
						<AppointmentsPage 
              appointments={appointments}
              addApointment={addApointment}
            />
					</Route>
				</Switch>
			</main>
		</>
	);
}

export default App;
