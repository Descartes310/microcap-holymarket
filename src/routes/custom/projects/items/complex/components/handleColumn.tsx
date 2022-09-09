import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button} from 'reactstrap';

class HandleColumnModal extends Component<any, any> {
  
    state = {
        label: this.props.column?.label
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.column !== prevProps.column) {
          this.setState({ label: this.props.column ? this.props.column.label : '' })
        }
    }

    onSubmit = () => {
        this.props.handleColumn(this.props.column ? this.props.column.id : null, this.state.label, false);
        this.setState({ label: '' });
        this.props.onClose();
    }


    render() {

        const { label } = this.state;
        const { onClose, show, title }: any = this.props;

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
                            Ajouter la colonne
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(HandleColumnModal));