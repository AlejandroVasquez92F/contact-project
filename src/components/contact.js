"use client";

import React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Contact() {
    //form state
    const [form, setForm] = useState({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    //error state to keep track of validation errors
    const [error, setError] = useState({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({ //updates form state with new input values
            ...prevForm,
            [name]: value
        }));

        setError((prevError) => ({ //clears any existing error messages for the current input
            ...prevError,
            [name]: ''
        }));
    };

    //regex to validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(String(email).toLowerCase());
    };

    //regex to validate phone number format
    const validatePhoneNumber = (phoneNumber) => {
        const re = /^(\+\d{1,4}\s?)?(\(?\d{3}\)?[-\s.]?)?\d{3}[-\s.]?\d{4}$/;
        return re.test(String(phoneNumber));
    };

    async function handleSubmit(event) {
        event.preventDefault(); //prevents default submission

        let valid = true; //flag to track form validity
        let newError = { ...error }; //creates a copy of the error state

        //loops through form field to check for empty values
        for (let key in form) {
            if (!form[key]) {
                newError[key] = 'This field is required'; //sets an error message if a field is empty
                valid = false;
            } else {
                newError[key] = ''; //clear error message if field is not empty
            }
        }

        //validate email format
        if (form.email && !validateEmail(form.email)) {
            newError.email = 'Invalid email format';
            valid = false;
        }

        //validate phone number format
        if (form.phone && !validatePhoneNumber(form.phone)) {
            newError.phone = 'Invalid phone number';
            valid = false;
        }

        setError(newError); //update error state with validation results

        if (!valid) { //stops form submission if it is not valid
            return;
        }

        /* this code below allows for quick form submission using https://web3forms.com/ */
        const formData = new FormData(event.target);
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); //input your access key here

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        });

        const result = await response.json();
        if (result.success) {
            console.log(result);
            window.location.href = "https://web3forms.com/success"; //redirect to thank you page from web3forms for now
        }
        /* this code above allows for quick form submission using https://web3forms.com/ */
    }

    return (
        <div>
            <Container maxWidth="lg">
                <Box className="flex flex-col md:flex-row my-8 py-8 px-8 bg-gray-50 rounded-md">
                    {/* information section */}
                    <Box className="md:w-1/2 p-4 flex flex-col justify-center items-center text-center">
                        <Typography variant="h4" className="font-bold tracking-tight text-gray-900" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="h6" className="mt-2 tracking-tight text-gray-600" gutterBottom>
                            Please fill out this form and we will reach out to you soon.
                        </Typography>
                        <Typography variant="h6" className="tracking-tight text-gray-600" gutterBottom>
                            We look forward to connecting with you!
                        </Typography>
                        <Typography variant="body1" className="mt-4 tracking-tight text-gray-600" gutterBottom>
                            Hours of operation: <span className="italic">Monday - Friday 7:00 AM - 5:00 PM (PST)</span>
                        </Typography>
                        <Typography variant="body1" className="tracking-tight text-gray-600" gutterBottom>
                            Call us at: <span className="italic">+1 (800) 000-0000</span>
                        </Typography>
                        <Typography variant="body1" className="mt-8 tracking-tight text-gray-600" gutterBottom>
                            Check us out on...
                        </Typography>
                        <div className="text-gray-600">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton
                                    aria-label="Facebook"
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                >
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Instagram"
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                >
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="X"
                                    href="https://x.com/?lang=en"
                                    target="_blank"
                                >
                                    <XIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="LinkedIn"
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                >
                                    <LinkedInIcon />
                                </IconButton>
                            </Stack>
                        </div>
                    </Box>

                    {/* form section */}
                    <Box className="md:w-1/2 p-4">
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                label="Subject"
                                margin="normal"
                                variant="outlined"
                                required
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                error={!!error.subject}
                                helperText={error.subject}
                            />
                            <TextField
                                fullWidth
                                label="Full Name"
                                margin="normal"
                                variant="outlined"
                                required
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={!!error.name}
                                helperText={error.name}
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="normal"
                                variant="outlined"
                                required
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!error.email}
                                helperText={error.email}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                margin="normal"
                                variant="outlined"
                                required
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                error={!!error.phone}
                                helperText={error.phone}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                margin="normal"
                                variant="outlined"
                                required
                                multiline
                                rows={4}
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                error={!!error.message}
                                helperText={error.message}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="mt-4"
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
