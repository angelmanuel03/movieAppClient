import {Button, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function Register(){
	const {user} = useContext(UserContext);

	const notyf = new Notyf();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');


	const [isActive, setIsActive] = useState(false);


	useEffect(()=> {
		// What logic are we going to add so that we can activate and reactivate the the register button?
		if(email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword){
			setIsActive(true);
		}else{
			setIsActive(false);
		}
		

	}, [email, password, confirmPassword])


	//Create a function that will be triggered when the register button is clicked:

	const registerUser = (event) => {
		// to prevent the page from refreshing during submission
		event.preventDefault();

		console.log("register button is clicked");

		// this will send a request to register a user in our API

		fetch('https://movieapp-api-lms1.onrender.com/users/register', {
			method: 'POST',
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if(data.message === 'Registered Successfully'){

				setEmail('');
				setPassword('');
				setConfirmPassword('');

				notyf.success("Registered Successfully");

			}else if(data.message === "Email Invalid"){
				notyf.error('Email is invalid');
			} else if(data.message === "Password must be atleast 8 characters"){
				notyf.error("Password must be at least 8 characters");
			}else {
				notyf.error("Something went wrong!");
			}
			
		})

	}



	return (
		(user.id !== null) 
		?
		<Navigate to="/" />
		:
		<Form className ="col-6 mx-auto" onSubmit = {event => registerUser(event)}>
			<h1 className = 'my-5 text-center'>Register</h1>


		      <Form.Group className="mb-3" >
		        <Form.Label>Email address:</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value = {email}
		        	onChange = {event => setEmail(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Password (atleast 8 characters)" 
		        	value = {password}
		        	onChange = {event => setPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Confirm Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Confirm your Password" 
		        	value = {confirmPassword}
		        	onChange = {event => setConfirmPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      {
		      	isActive ?
		      		<Button variant="primary" type="submit">
		      		  Register
		      		</Button>
		      	:
		      		<Button className = "mb-5" variant="danger" type="submit" disabled>
		        		Register
		      		</Button>
		      }
		      
		      
		</Form>
		)
}