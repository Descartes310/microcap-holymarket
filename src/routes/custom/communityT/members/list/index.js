import React, {Fragment} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// intl messages
import IntlMessages from 'Util/IntlMessages';



// Function for interactive List
function generate(element) {
	return [0, 1, 2].map(value =>
		React.cloneElement(element, {
			key: value,
		}),
	);
}

class ListMembers extends React.Component {
    
    state = {
		dense: false,
        secondary: false,
        age: '',
        name: 'hai',
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    render() {
        const { dense, secondary } = this.state;
        return (

           <div className="container" style={{ padding: "20px" }}> 

                <form autoComplete="off mt-4">
                    <div className="row">
                    <div className="col-sm-6 col-md-6 col-xl-3">

                        <div className="form-group">
                            <div className="d-flex">
                                <div>Filtre &nbsp;&nbsp;</div>
                                <FormControl fullWidth>
                                    {/* <InputLabel htmlFor="age-simple"></InputLabel> */}
                                    <Select value={this.state.age} onChange={this.handleChange}
                                    inputProps={{ name: 'age', id: 'age-simple', }}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    </div>
                </form>

                <div className="table-responsive">
						<Table>
							<TableHead>
								<TableRow hover>
									<TableCell>Post projets</TableCell>
									<TableCell>Membres</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<Fragment>
                                <TableRow hover>
                                <TableCell>Poste projet 1</TableCell>
									<TableCell>
                                    <List dense={dense}>
                                        {generate(
                                            <ListItem button>
                                                <ListItemText primary="Ryan Keher" secondary={secondary ? 'Secondary text' : null} />
                                            </ListItem>
                                            , )}
                                    </List>
                                    </TableCell>
								</TableRow>
                                <TableRow hover>
                                <TableCell>Poste projet 2</TableCell>
									<TableCell>
                                    <List dense={dense}>
                                        {generate(
                                            <ListItem button>
                                                <ListItemText primary="Ryan Keher" secondary={secondary ? 'Secondary text' : null} />
                                            </ListItem>
                                            , )}
                                    </List>
                                    </TableCell>
								</TableRow>
								</Fragment>
							</TableBody>
						</Table>
					</div>

                {/* <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography type="title"> <strong>Poste projet 1</strong> </Typography>
                        <div>
                            <List dense={dense}>
                                {generate(
                                    <ListItem button>
                                        <ListItemText primary="Ryan Keher" secondary={secondary ? 'Secondary text' : null} />
                                    </ListItem>
                                    , )}
                            </List>
                        </div>

                        <Typography type="title"> <strong>Poste projet 2</strong> </Typography>
                        <div>
                            <List dense={dense}>
                                {generate(
                                    <ListItem button>
                                        <ListItemText primary="Ryan Keher" secondary={secondary ? 'Secondary text' : null} />
                                    </ListItem>
                                    , )}
                            </List>
                        </div>
                    </Grid>
                </Grid> */}
            </div>
        )
    }
}

export default ListMembers
