import React, { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

const CreateProfile = () => {

    const [date, setDate] = React.useState(new Date());
    const nameRef = useRef();
    const newDate = date.toLocaleDateString()

    const handleCreateProfile = e => {
        const name = nameRef.current.value;
        const status = "ACTIVE"
        const newProfile = { name, status, newDate }


        fetch('http://localhost:5000/profiles', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProfile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully Created Profile')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }
    return (
        <div>

            <form onSubmit={handleCreateProfile}>

                <h2 style={{color:'blue'}}>Add Profile</h2>

                <TextField
                    sx={{ width: '70%', m: 1, input: { color: 'blue' } }}
                    id="outlined-size-small"
                    inputRef={nameRef}
                    label="Name"
                    variant="standard"
                    className='input-field'
                    InputLabelProps={{
                        style: { color: 'blue', paddingLeft: '10px' }
                    }}
                    required
                />
               



                

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Birth date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ width: '70%', m: 1 }} 
                        InputLabelProps={{
                            style: { color: 'blue' }
                        }} {...params} />}
                    />
                </LocalizationProvider>
                <Button sx={{ width: '70%', m: 1 }} type="submit" variant="contained">Create Profile</Button>
            </form>


        </div>
    );
};

export default CreateProfile;