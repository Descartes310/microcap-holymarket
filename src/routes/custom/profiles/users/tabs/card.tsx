import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import UserService from "Services/users";
import BankService from "Services/banks";
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';

const Card = (props) => {

    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        getMineSubscriptions();
        getUser();
    }, []);

    const getMineSubscriptions = () => {
        props.setRequestGlobalAction(true);
        BankService.getMineSubscriptions().then((response: any) => {
            setSubscriptions(response);
        }).catch(() => {
            setSubscriptions([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const getUser = () => {
        props.setRequestGlobalAction(true);
        UserService.kyc().then((response: any) => {
            setUser(response);
        }).catch(() => {
            setSubscriptions([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <div style={{ padding: '3%' }}>
            <h1 className=''>Référence MicroCap</h1>
            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Numéro de référence
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            {user?.reference}
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Numéro d'adhésion
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            {user?.membership}
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <h1 style={{ marginTop: '5%' }}>Informations personnelles</h1>
            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Noms et prénoms
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            {user?.fullname}
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Date de naissance
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            {user?.birthdate}
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Localisation
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            {user?.localisation}
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                            Situation proféssionnelle
                                        </h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">
                                        </h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <h1 style={{ marginTop: '5%' }}>Informations bancaires</h1>

            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">QR code</th>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        { subscriptions.map(subscription => (
                            <>
                                <tr className="cursor-pointer">
                                    <td rowSpan={2} className="text-center">
                                        <QRCode size={200} value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: props.authUser.userName})} />
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    Proprietaire du compte
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    {props.authUser.userName}
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    IBAN du compte
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    {subscription.iban}
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* {
                subscriptions.map(subscription => (
                    <div className="mt-30">
                        <QRCode value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: props.userName})} />
                        <div>
                            
                        </div>
                    </div>
                ))
            } */}
            
        </div>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Card));
