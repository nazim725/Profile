import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './PausedProfile.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PausedProfile = () => {
    const [pausedProfiles, setPausedProfiles] = React.useState([])
    const [status, setStatus] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:5000/profiles?status=PAUSED')
            .then(res => res.json())
            .then(data => {
                setPausedProfiles(data)
            });
    }, [])


    const handleDeleteProfile = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/profiles/${id}`;

            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingProfile = pausedProfiles.filter(profile => profile._id !== id);
                        setPausedProfiles(remainingProfile);
                    }
                });
        }
    }


    const handleChangedStatus = id => {
        const url = `http://localhost:5000/profiles/${id}`
        // console.log(id)
        console.log(url)
        fetch(url, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert("Update successful")
                    window.location.reload(false);
                    const remainingProfile = pausedProfiles.filter(profile => profile.status === 'PAUSED');
                    setPausedProfiles(remainingProfile);
                }


            })

    }



    return (
        <div>
            <div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">date of Birth</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Change Status</StyledTableCell>
                                <StyledTableCell align="center">Delete  Profile</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pausedProfiles.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.newDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                                    <StyledTableCell align="center">

                                        <select className="button" onChange={e => setStatus(e.target.value)}>
                                            <option value="Select" disabled selected>Select Status</option>
                                            <option value="PAUSED">PAUSED</option>
                                            <option value="ACTIVE">ACTIVE</option>

                                        </select>
                                        <button className="button" style={{marginLeft:'10px'}} onClick={() => handleChangedStatus(row._id)}>Update Status</button>

                                    </StyledTableCell>
                                    <StyledTableCell align="center"> <button className="button" onClick={() => handleDeleteProfile(row._id)}>Delete Profile</button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>


    );
};

export default PausedProfile;