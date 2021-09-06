import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class Chat extends Component {
    static contextType = AbilityContext;

    state = {
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="d-flex justify-content-center align-items-center" >
                        <img src={require("Assets/img/chat.png")} width="50%" />
                    </div>
                    <div className="content px-20">
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <h1 className="pr-10 mb-0 mt-20">Messagerie bientôt disponible</h1>
                        </div>
                    </div>
                </div>
            </RctCollapsibleCard >
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

export default connect(mapStateToProps, {})
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(Chat))));
