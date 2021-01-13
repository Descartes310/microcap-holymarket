import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

class Illustration extends React.Component {
    
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

           <div className="container justify-content-center"> 

                <form autoComplete="off">
                    <div className="row">
                    <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                        <FormControl fullWidth>
                            <span>Filtre</span>
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
                </form>

                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography type="title"> Poste projet 1 </Typography>
                        <div>
                            <List dense={dense}>
                                {generate(
                                    <ListItem button>
                                        <ListItemText primary="Ryan Keher" secondary={secondary ? 'Secondary text' : null} />
                                    </ListItem>
                                    , )}
                            </List>
                        </div>

                        <Typography type="title"> Poste projet 2 </Typography>
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
                </Grid>
            </div>
        )
    }
}

export default Illustration
