import React from 'react'

import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';


class ChangeRoleProjectDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oldRole: "",
            newRole: "",

            userIdentifier: "",
            role: ""
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    handleSubmit = () => {
        console.log(this.state);
    }

    render() {
        const {open, handleCloseChangeRole} = this.props

        return (

                <Dialog open={open} onClose={handleCloseChangeRole} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Changer de role projet</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>

                    <form onSubmit={this.handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="old-role">Ancien Role</InputLabel>
                            <Select value={this.state.oldRole} onChange={this.handleChange}
                            inputProps={{ name: 'oldRole', id: 'old-role', }}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel htmlFor="new-role">Nouveau Role</InputLabel>
                            <Select value={this.state.newRole} onChange={this.handleChange}
                            inputProps={{ name: 'newRole', id: 'new-role', }}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="Identifiant-3">Identifiant de l'utilisateur</Label>
                            <Input type="text" name="userIdentifier" id="Identifiant-3" placeholder="Identifiant de l'utilisateur" onChange={this.handleChange}
                            value={this.state.userIdentifier} />
                        </FormGroup>

                        <FormControl fullWidth>
                            <InputLabel htmlFor="role">Role Projet</InputLabel>
                            <Select value={this.state.role} onChange={this.handleChange}
                            inputProps={{ name: 'role', id: 'role', }}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.handleSubmit} className="btn-info text-white">
                        Modifier
                        </Button>
                    <Button variant="contained" className="btn-warning text-white"  onClick={handleCloseChangeRole}>
                        Annuler
                        </Button>
                </DialogActions>
                </Dialog>
        )
    }
    
}

export default ChangeRoleProjectDialog
