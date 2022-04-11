import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { FormGroup, Button  } from 'reactstrap';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import UpdatePolymorphComponent from 'Components/UpdatePolymorphComponent';

class UpdateItemModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show, title, item, setProjectItemValue } = this.props;

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
                        <UpdatePolymorphComponent
                            isRequired={true}
                            projectItem={item}
                            displayAddButton={false}
                            displayDeleteButton={false}
                            label={item.projectItem.label}
                            componentType={item.projectItem.inputType.toLowerCase()}
                            handleOnChange={(currentItem, data, subItem) => setProjectItemValue(currentItem, data, subItem)}
                        />
                    </div>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onClose()}
                            className="text-white font-weight-bold"
                        >
                            Editer l'ouvrage
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(UpdateItemModal));