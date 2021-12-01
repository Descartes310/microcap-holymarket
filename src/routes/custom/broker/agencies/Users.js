import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { getFilePath } from "Helpers/helpers";
import CustomList from "Components/CustomList";
import UserAvatar from "Components/UserAvatar";
import { withStyles } from "@material-ui/core";
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import AddMemberByAdhesion from "Components/AddMemberByAdhesion";
import { setRequestGlobalAction, getOrganisationMembers } from "Actions";

const ROLES = [
    {
        value: 'BROKER_AGENCY',
        label: "Chef d'agence"
    }
    // {
    //     value: 'BROKER_COUNTER',
    //     label: 'Chef de guichet'
    // },
    // {
    //     value: 'BROKER_CASHDESK',
    //     label: 'Cassier'
    // }
]
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            members: []
        }
    }

    componentDidMount() {
        this.getMembers();
    }

    getMembers = () => {
        this.props.setRequestGlobalAction(true);
        getOrganisationMembers().then(members => {
            this.setState({ members })
        }).catch(err => {
            this.setState({ members: [] })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    render() {

        const { members } = this.state;

        return (
            <>
                <PageTitleBar
                    title={"Liste des utilisateurs"}
                />
                <CustomList
                    loading={false}
                    list={members}
                    onAddClick={() => this.setState({ show: true })}
                    itemsFoundText={n => `${n} utilisateurs trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun utilisateurs trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Avatar</th>
                                                <th>Nom</th>
                                                <th>Adresse email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="avatar-wrap w-10 align-self-center d-sm-r-none">
                                                            <UserAvatar
                                                                avatar={getFilePath(item.avatar)}
                                                                name={item.name}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-left media-middle mr-15">
                                                            </div>
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.user.email}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                            }
                        </>
                    )}
                />
                <AddMemberByAdhesion
                    roles={ROLES}
                    show={this.state.show}
                    onClose={() => {
                        this.setState({ show: false });
                        this.getMembers();
                    }}
                />
            </>
        );
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

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UserList))));
