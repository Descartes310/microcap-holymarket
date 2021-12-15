import { connect } from 'react-redux';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import EmptyResult from "Components/EmptyResult";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import { setRequestGlobalAction, getVouchers } from 'Actions';
import FetchFailedComponent from "Components/FetchFailedComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

class VoucherModal extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        code: [],
        loadingCodes: false,
    };

    onViewVoucher = (user) => {
        this.setState({ loadingCodes: true });
        getVouchers(this.props.communitySpace.data, this.props.type, user.id, user.type)
            .then(data => {
                this.setState({ codes: data });
            })
            .catch(err => {
                this.setState({ codes: null });
            })
            .finally(() => this.setState({ loadingCodes: false }));
    };


    componentDidMount() {
        this.onViewVoucher(this.props.user);
    }

    render() {
        const { codes, loadingCodes } = this.state;
        const { show, close } = this.props;

        return (
            <div className="page-list">

                <Dialog
                    open={show}
                    onClose={() => { this.setState({ codes: [] }); close() }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Codes de recharge actifs
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ codes: [] }); close() }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        {loadingCodes ? (
                            <RctSectionLoader />
                        ) : !codes ? (
                            <FetchFailedComponent />
                        ) : codes.length === 0 ? (
                            <EmptyResult message="Aucun codes trouvés" />
                        ) : (
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Code de recharge</th>
                                        <th>Valeur</th>
                                        <th>Unité</th>
                                        <th>Date de création</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {codes.map((item, key) => (
                                        <tr key={key} className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.price} from={item.currency ? item.currency : 'EUR'} unit={item.unit} /></h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.unit ? item.unit.name : this.props.currencies.filter(c => c.code == item.currency)[0].name}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.updatedAt} /></h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

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

const mapStateToProps = ({ authUser, communitySpace, settings }) => {
    return {
        authUser: authUser.data,
        communitySpace: communitySpace,
        currencies: settings.currencies
    };
};

export default withRouter(connect(mapStateToProps, {
    setRequestGlobalAction,
})(withStyles(useStyles, { withTheme: true })(VoucherModal)));
