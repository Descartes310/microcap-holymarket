import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
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

class Article extends React.Component {
    
    state = {
		dense: false,
        secondary: false,
        age: '',
        name: 'hai',
        title: '',
        text: ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    render() {
        const { dense, secondary } = this.state;
        return (

           <div className="container justify-content-center"> 

                <form autoComplete="off">
                    <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-6 col-xl-6">

                        <div className="form-group">
                            <div className="d-flex">
                                <div>Article parent &nbsp;&nbsp;</div>
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

                        <div className="form-group">
                            <div className="d-flex">
                                <div>Titre &nbsp;&nbsp;</div>
                                <FormControl fullWidth outline>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="d-flex">
                                <div>Texte &nbsp;&nbsp;</div>
                                <FormControl fullWidth>
                                    {/* <InputLabel htmlFor="age-simple"></InputLabel> */}
                                    <Select value={this.state.text} onChange={this.handleChange}
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
            </div>
        )
    }
}

export default Article
