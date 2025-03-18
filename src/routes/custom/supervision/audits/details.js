import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getLogActionTypeLabel } from 'Helpers/helpers';
import ReactJson from 'react-json-view'
import DialogComponent from "Components/dialog/DialogComponent";

class LogDetailsModal extends Component {

    state = {}

    constructor(props) {
        super(props);
    }

    parseOldData = (rawData) => {
        if (!rawData || typeof rawData !== "string") {
            return {};
        }
    
        const fixedData = rawData
            .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
            .replace(/'([^']*)'/g, '"$1"')
            .replace(/:\s*([A-Za-z_]\w*)/g, ': "$1"')
            .replace(/:\s*'null'/g, ': null');
    
        try {
            return JSON.parse(fixedData);
        } catch (error) {
            console.error("Error parsing oldData:", error);
            return {};
        }
    }

    render() {

        const { onClose, show, log } = this.props;
        console.log(log?.oldData)

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Détails
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="table-responsive mb-4">
                        <table className="table table-hover table-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="fw-bold">Détails</th>
                                    <th className="fw-bold">Valeur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Utilisateur</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{log?.userName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Référence</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{log?.referralCode}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Action</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{getLogActionTypeLabel(log?.action)}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Objet</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{log?.entityName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Date</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{<TimeFromMoment time={log?.timestamp} showFullDate format='LLL' />}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ReactJson src={this.parseOldData(log?.oldData)} name={log?.entityName} />
                </RctCardContent>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(LogDetailsModal));