import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import FlagCountry from "Components/FlagCountry";
import Countries from '../../../../../data/countriesSpec.json';

//const steps = [1, 2];

const SimpleAdressDisplay = props => {
    
    const { user } = props;

   const countries = Countries.data;

   const nationalityFlag = countries.find(countryFlag => countryFlag.alpha3Code === user.user.nationality );
   const nationalityHostCountry = countries.find(countryFlag => countryFlag.alpha3Code === user.user.hostCountry );
   

        //const { loading, history } = this.props;
        return (
            <>
                <div className={"center-holder"}>
                   
                    {user.user.nationality ? (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3><IntlMessages id="common.nationality"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>
                                <FlagCountry flag={nationalityFlag.flag} label={nationalityFlag.name} />
                            </span>
                        </div>
                    </div>): null }

                    {user.user.hostCountry ? (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3> <IntlMessages id="common.residenceCountry"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>
                                <FlagCountry flag={nationalityHostCountry.flag} label={nationalityHostCountry.name} />
                            </span>
                        </div>
                    </div>): null}

                    {user.user.city ? (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3> <IntlMessages id="components.city"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.user.city}</span>
                        </div>
                    </div>): null}
                    {user.user.userType === "PERSON" ? (
                        user.identificationType ?(<div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> <IntlMessages id="common.identificationType"/> : </h3> 
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.identificationType}</span>
                            </div>
                        </div>): null
                        ): (
                        
                        user.identificationType ?(<div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> <IntlMessages id="common.registrationType" /> : </h3> 
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.identificationType}</span>
                            </div>
                        </div>) : null
                    )}


                    {user.user.userType === "PERSON" ? ( user.identificationNumber ? (
                       <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> Numero d'identification : </h3> 
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.identificationNumber}</span>
                            </div>
                        </div>
                   ) : null ) : ( user.immatriculationValue ? (
                    <div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3> Numero d'immatriculation : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.immatriculationValue}</span>
                        </div>
                    </div>) : null 

                        )}

                    {user.beginingPieceValidity? (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3><IntlMessages id="date.validity.start"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.beginingPieceValidity}</span>
                        </div>
                    </div>) : null}

                    {user.endPieceValidity ?(<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3><IntlMessages id="date.validity.end"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.endPieceValidity}</span>
                        </div>
                    </div>): null}

                    {user.dateBirth ? (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3><IntlMessages id="date.birth"/> : </h3> 
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.dateBirth}</span>
                        </div>
                    </div>) : null }

                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            </>
        );
    
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default  withRouter(connect(mapStateToProps, {})(injectIntl(SimpleAdressDisplay)));
