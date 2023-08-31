import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import UserService from "Services/users";
import BankService from "Services/banks";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const UserDetails = (props) => {

    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

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
        UserService.userKYC(props.match.params.id).then((response: any) => {
            setUser(response);
        }).catch(() => {
            setSubscriptions([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const authenticateUser = () => {
        props.setRequestGlobalAction(true);
        UserService.authenticate(props.match.params.id).then((response: any) => {
            getUser();
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            props.setRequestGlobalAction(false);
            setShowConfirmBox(false);
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des utilisateurs"}
                rightComponent={
                    <>
                        { !user?.authenticate && (
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold"
                                onClick={() => {
                                    setShowConfirmBox(true);
                                }}
                            >
                                Authentifier
                            </Button>
                        )}
                    </>
                }
            />
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
                                            <QRCode size={200} value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: user.userName})} />
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
                                                        {user.userName}
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
            </div>
            <ConfirmBox
                show={showConfirmBox}
                rightButtonOnClick={() => authenticateUser()}
                leftButtonOnClick={() => {
                    setShowConfirmBox(false);
                }}
                message={'Etes vous sure de vouloir marquer comme authentifié ?'}
            />
        </>
    );
}

// map state to props
const mapStateToProps = ({}) => {
    return {}
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(UserDetails));
