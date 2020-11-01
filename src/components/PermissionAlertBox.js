import React, {Component} from 'react';
import {connect} from "react-redux";
import {setPermissionAlertBox} from "Actions";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";

class PermissionAlertBox extends Component {
    state = {
        permissionAlertBox: this.props.permissionAlertBox,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.permissionAlertBox !== state.permissionAlertBox) {
            props.setPermissionAlertBox(props.permissionAlertBox);

            return {
                permissionAlertBox: props.permissionAlertBox
            }
        }
        return null;
    }

    handleOnClose = () => {
        this.props.setPermissionAlertBox(true);
    };

    render() {
        return (
            <>
                <SweetAlert
                    type="danger"
                    show={!this.state.permissionAlertBox}
                    showCancel
                    showConfirm
                    title="Restriction d'accèss"
                    customButtons={(
                        <>
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold"
                                onClick={this.handleOnClose}
                            >
                                Ok
                            </Button>
                        </>
                    )}
                    onConfirm={this.handleOnClose}
                >
                    Vous n'avez pas la permission pour effectuer cette action
                </SweetAlert>
            </>
        );
    }
}

const mapStateToProps = ({permissionAlertBox}) => ({permissionAlertBox});

export default connect(mapStateToProps, {setPermissionAlertBox})(PermissionAlertBox);
