import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { CATALOG } from "Url/frontendUrl";
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import { getOneCatalog, getCatalogProducts, setRequestGlobalAction } from "Actions";

class ProductCatalog extends Component {

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
        getOneCatalog(this.catalogId)
            .then(result => this.setState({ catalog: result }))
            .catch()
    }

    handleOnGoBack = () => {
        this.props.history.push(CATALOG.PRODUCT.LIST);
    };

    render() {
        const { catalogProducts, requestGlobalLoader, classes } = this.props;

        return (
            <div>
                {requestGlobalLoader
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

                            <CustomList
                                loading={false}
                                list={catalogProducts.data}
                                itemsFoundText={n => `${n} produits trouvé.s`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun produits trouvés
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Nom du produit</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((product, key) => (
                                                            <tr key={key} onClick={() => this.handleOnRowClick(product.id)} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={product.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{product.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{product.description}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </>
                    )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, catalogProducts, authUser }) => {
    return { requestGlobalLoader, catalogProducts, authUser: authUser.data }
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

export default connect(mapStateToProps, { getCatalogProducts, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(injectIntl(ProductCatalog)));
