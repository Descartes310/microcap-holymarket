import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button} from 'reactstrap';

class HandleRowModal extends Component<any, any> {
  
    state = {
        label: this.props.row?.label,
        //column: this.props.row?.column
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.row !== prevProps.row) {
          this.setState({ 
              label: this.props.row ? this.props.row.label : '',  
              //column: this.props.row ? this.props.row.column : null,  
            })
        }
    }

    onSubmit = () => {
        // if(!this.state.column) {
        //     alert('Sélectionnez une colonne');
        //     return;
        // }
        this.props.handleRow(this.props.row ? this.props.row.id : null, this.state.label, false);
        this.setState({ label: ''});
        this.props.onClose();
    }

    render() {

        const { label } = this.state;
        const { onClose, show, title, columns }: any = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Label
                            </InputLabel>
                            <InputStrap
                                required
                                id="label"
                                type="text"
                                name='label'
                                className="input-lg"
                                value={label}
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Ajouter la ligne
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(HandleRowModal));