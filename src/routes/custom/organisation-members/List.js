import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { getFilePath } from "Helpers/helpers";
import CustomList from "Components/CustomList";
import UserAvatar from "Components/UserAvatar";
import { withStyles } from "@material-ui/core";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import AddMemberByAdhesion from "Components/AddMemberByAdhesion";
import { setRequestGlobalAction, getOrganisationMembers } from "Actions";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: [],
            showCreateBox: false
        }
    }

    componentDidMount() {
        this.loadMembers();
    }

    loadMembers() {
        this.props.setRequestGlobalAction(true);
        getOrganisationMembers().then(members => {
            this.setState({ members });
        }).catch(error => {
            console.log(error);
            this.setState({ members: [] });
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {

        const { members, showCreateBox } = this.state;

        return (
            <>
                <PageTitleBar
                    title={"Liste des utilisateurs"}
                />
                <CustomList
                    list={members}
                    loading={false}
                    itemsFoundText={n => `${n} utilisateurs trouvés`}
                    onAddClick={() => this.setState({ showCreateBox: true })}
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
                                                <th>Nom</th>
                                                <th>Type de membre</th>
                                                <th>Identification</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((member, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-left media-middle mr-15">
                                                                <UserAvatar
                                                                    avatar={getFilePath(member.user.avatar)}
                                                                    name={member.user.name}
                                                                />
                                                            </div>
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{member.user.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{member.user.type}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{member.user.identification}</h4>
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
                    show={showCreateBox}
                    onClose={() => {
                        this.setState({ showCreateBox: false });
                        this.loadMembers()
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));
