import Doc from 'Helpers/DocService';
import { connect } from "react-redux";
import styled from 'styled-components';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getActivePass, getPrevisionDetails } from "Actions";

const P = styled.p`
font-size: 16px !important;
`;

const Span = styled.span`
font-weight: bold;
display: inline-block;
width: 20% !important;
`;

class Goals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            end: null,
            start: null,
            pass: null,
            prevision: null,
            print: false
        }
        this.bodyRef = React.createRef();
    }

    componentDidMount() {
        this.getPass();
    }


    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    createPdfTest = () => {
        this.setState({ print: true }, () => {
            Doc.printPdf(this.bodyRef.current, () => { this.setState({ print: false }) });
        })
    };

    getPass = () => {
        this.props.setRequestGlobalAction(true);
        getActivePass().then(pass => {
            this.getDetails();
            this.setState({ pass });
        }).finally(() => this.props.setRequestGlobalAction(false))
    }

    getDetails = () => {
        getPrevisionDetails().then(prevision => {
            this.setState({ prevision })
        })
    }

    render() {

        return (
            <CustomList
                list={this.state.prevision ? this.state.prevision.goals : []}
                loading={false}
                titleList={"Mes objectfis"}
                itemsFoundText={n => n + " objectfis(s) trouvée(s)"}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun objectfis trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Label</th>
                                            <th>Date d'échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr
                                                key={key}
                                                className="cursor-pointer"
                                            >
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.goal.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.deadline}</h4>
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
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        user: authUser.data,
        requestGlobalLoader
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Goals))));
