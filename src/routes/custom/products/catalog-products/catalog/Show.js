/**
 * Employ Payroll
 */
import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

// intl messages
import { connect } from "react-redux";
import { getOneCatalog, getCatalogProducts, getBranchProducts, setRequestGlobalAction, addProductsToOneCatalog } from "Actions";
import { injectIntl } from "react-intl";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { withStyles } from "@material-ui/core";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CATALOG } from "Url/frontendUrl";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { NotificationManager } from "react-notifications";
import { removeProductsToOneCatalog } from "Actions/independentActions";

const getAvailableProducts = (totalProducts, occupiedProducts) => {
    if (totalProducts && occupiedProducts) {
        let result = [];
        totalProducts.forEach(p => {
            let datas = occupiedProducts.filter(o => o.id == p.id && o.type == p.type);
            if (datas.length <= 0)
                result.push(p)
        })
        return result;
    }
    else return null;
};

class CatalogShow extends Component {
    constructor(props) {
        super(props);

        this.catalogId = this.props.match.params.id;

        this.state = {
            leftValuesSelected: [],
            rightValuesSelected: [],
            catalog: null,
        }
    }

    componentDidMount() {
        this.props.getCatalogProducts(this.catalogId);
        this.props.getBranchProducts(this.props.authUser.user.branch.id);
        getOneCatalog(this.catalogId)
            .then(result => this.setState({ catalog: result }))
            .catch()
    }

    handleOnGoBack = () => {
        this.props.history.push(CATALOG.PRODUCT.LIST);
    };

    handleSelect = (position, event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        this.setState({ [position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected']: values });
    };

    handleOnSwitchPressed = position => {
        let dataToSend = this.state[position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected'];

        if (dataToSend.length === 0) {
            NotificationManager.warning("Vous devrier d'abord selectionner un éléments dans la liste");
            return;
        }

        dataToSend = JSON.stringify(dataToSend.map(i => {
            let data = this.props.branchProducts.data.filter(p => p.id == i.split('-')[0] && p.type == i.split('-')[1])[0];
            return { id: data.id, type: data.type }
        }));

        const func = position === 'left' ? addProductsToOneCatalog : removeProductsToOneCatalog;

        // Display loader
        this.props.setRequestGlobalAction(true);

        // Make request
        func(dataToSend, this.catalogId, this.props.authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Products added successfully");

                // Reset the state
                this.setState({ leftValuesSelected: [], rightValuesSelected: [] });

                // Fetch data again
                Promise.all([
                    this.props.getCatalogProducts(this.catalogId),
                    this.props.getBranchProducts(this.props.authUser.user.branch.id)
                ]).finally(() => this.props.setRequestGlobalAction(false));
            })
            .catch(error => {
                NotificationManager.error(this.props.intl.formatMessage({ id: 'error.500' }));
                this.props.setRequestGlobalAction(false);
            })
    };

    render() {
        const { catalogProducts, branchProducts, requestGlobalLoader, error, classes } = this.props;

        const isNotLoaded = branchProducts.data === null || catalogProducts.data === null;

        const availableProducts = getAvailableProducts(branchProducts.data, catalogProducts.data);

        // console.log("orderedItems => ", orderedItems);
        return (
            <div className="mx-4">
                {requestGlobalLoader || isNotLoaded
                    ? (<RctSectionLoader />)
                    : (
                        <>
                            <AppBar position="static" className="bg-white px-0 mx-0">
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton + ' text-black'}
                                        color="inherit"
                                        onClick={() => this.handleOnGoBack()}
                                        aria-label="menu">
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography type="title" color="inherit" className={classes.flex + ' text-black'}>
                                        {this.state.catalog && this.state.catalog.name}
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <RctCollapsibleCard>
                                <Form>
                                    <div className="row">
                                        <div className="col-md-5 col-sm-5">
                                            <Input
                                                type="select"
                                                name="selectMulti"
                                                id="SelectMulti"
                                                onChange={event => this.handleSelect('left', event)}
                                                multiple>
                                                {availableProducts.map(p => (
                                                    <option key={p.id} value={p.id + '-' + p.type}>{p.name}</option>
                                                ))}
                                            </Input>
                                        </div>

                                        <div className="col-1">
                                            <IconButton
                                                edge="start"
                                                className={classes.menuButton + ' text-black mr-2'}
                                                color="inherit"
                                                onClick={() => this.handleOnSwitchPressed('left')}
                                                aria-label="menu">
                                                <ArrowForwardIcon />
                                            </IconButton>

                                            <IconButton
                                                edge="start"
                                                className={classes.menuButton + ' text-black'}
                                                color="inherit"
                                                onClick={() => this.handleOnSwitchPressed('right')}
                                                aria-label="menu">
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </div>

                                        <div className="col-md-5 col-sm-5">
                                            <Input
                                                type="select"
                                                name="selectMultiRight"
                                                id="SelectMultiRight"
                                                onChange={event => this.handleSelect('right', event)}
                                                multiple>
                                                {catalogProducts.data.map(p => (
                                                    <option key={p.id} value={p.id + '-' + p.type}>{p.name}</option>
                                                ))}
                                            </Input>
                                        </div>
                                    </div>
                                </Form>
                            </RctCollapsibleCard>
                        </>
                    )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, catalogProducts, branchProducts, authUser }) => {
    return { requestGlobalLoader, catalogProducts, branchProducts, authUser: authUser.data }
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    /*menuButton: {
        marginRight: theme.spacing(2),
    },*/
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

export default connect(mapStateToProps, { getCatalogProducts, getBranchProducts, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(injectIntl(CatalogShow)));
