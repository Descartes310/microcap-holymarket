import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getUserVouchers } from 'Actions/independentActions';
import { AbilityContext } from "Permissions/Can";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import CustomList from "Components/CustomList";


class ListVouchers extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        vouchers: []
    }

    getMyVouchers = () => {
        this.setState({ loading: true })
        getUserVouchers().then(data => {
            this.setState({ vouchers: data })
        }).finally(() => this.setState({ loading: false }))
    }

    componentDidMount() {
        this.getMyVouchers();
    }

    render() {

        const { loading, vouchers } = this.state;

        return (

            <div className="page-list">
                <h1 style={{
                    margin: '3%'
                }}>Mes coupons</h1>
                {loading
                    ? (<RctSectionLoader />)
                    : (
                        <CustomList
                            loading={loading}
                            list={vouchers}
                            itemsFoundText={n => `${n} coupon(s) trouvé(s)`}
                            addPermissions={{
                                permissions: [],
                            }}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun coupon trouvé
                                    </h4>
                                        </div>
                                    ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Code du code</th>
                                                            <th>Type</th>
                                                            <th>Valeur</th>
                                                            <th>Unité</th>
                                                            <th>Status</th>
                                                            <th>Date de création</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {vouchers && vouchers.map((item, key) => (
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.type}</h4>
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
                                                                <td style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div className="user-status-pending" style={{ position: 'relative' }}>
                                                                        <div className={`user-status-pending-circle rct-notify`} style={{
                                                                            background: !item.used ? 'green' : 'red'
                                                                        }} />
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
                                            </div>
                                        )}
                                </>
                            )}
                        />
                    )
                }
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

const mapStateToProps = ({ authUser, settings }) => {
    return {
        authUser: authUser.data,
        currencies: settings.currencies
    };
};

export default withRouter(connect(mapStateToProps, {})(withStyles(useStyles, { withTheme: true })(ListVouchers)));
