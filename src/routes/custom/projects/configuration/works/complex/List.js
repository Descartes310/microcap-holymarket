import { connect } from "react-redux";
import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PROJECTS } from "Url/frontendUrl";
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import CancelIcon from '@material-ui/icons/Cancel';
import ComplexTable from "Components/ComplexTable";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Select from "@material-ui/core/Select/Select";
import IconButton from "@material-ui/core/IconButton";
import TimeFromMoment from "Components/TimeFromMoment";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { setRequestGlobalAction, getProjectWorks, changeBookStatus, getComplexBookDetails } from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    baseUrl = PROJECTS.CONFIGURATION.WORKS;
    state = {
        details: { in: [], out: [] },
        showTable: false,
        bookToEdit: null,
        showEditModal: false
    }

    componentDidMount() {
        this.getComplexBooks();
    }

    getComplexBooks = () => {
        this.props.getItems(this.props.authUser.branchId, 'COMPLEX');
    }

    editBook = (book) => {
        this.getBookDetails(book);
    }

    getBookDetails = (book) => {
        this.props.setRequestGlobalAction(true);
        getComplexBookDetails(book.id).then(details => {
            this.setState({ details, bookToEdit: book, showEditModal: true });
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    changeStatus = (id) => {
        this.props.setRequestGlobalAction(true);
        changeBookStatus(id).then(response => {
            this.getComplexBooks();
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {
        const { list, loading, error, intl } = this.props;
        const { showTable, showEditModal, bookToEdit, details } = this.state;

        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    itemsFoundText={n => intl.formatMessage({ id: "projects.configuration.works.found" }, { count: n })}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.configuration.works.found" values={{ count: 0 }} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Date de création</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr
                                                    key={key}
                                                    className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <TimeFromMoment time={item.createdAt} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            className={"text-white font-weight-bold mr-3 bg-yellow"}
                                                            onClick={() => this.changeStatus(item.id)}
                                                        >
                                                            {item.active ? 'Désactiver' : 'Activer'}
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            className={"text-white font-weight-bold mr-3 bg-blue"}
                                                            onClick={() => this.setState({ showTable: true })}
                                                        >
                                                            Voir les détails
                                                        </Button>
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
                <Dialog
                    open={showTable}
                    onClose={() => this.setState({ showTable: false })}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Plan de financement
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => this.setState({ showTable: false })}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <ComplexTable />
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, projectWorks, authUser }) => {
    const list = projectWorks;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, { getItems: getProjectWorks, setRequestGlobalAction })(withRouter(injectIntl(List)));
