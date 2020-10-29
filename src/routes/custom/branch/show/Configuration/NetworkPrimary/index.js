import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {getNetworkProfilePartnership, setNetworkProfileConfigurationState, setRequestGlobalAction} from "Actions";
import {NotificationManager} from "react-notifications";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import QueueAnim from "rc-queue-anim";
import {connect} from "react-redux";
import {NETWORK} from "Url/frontendUrl";
import DeclareMentorship from "Routes/custom/branch/show/Configuration/NetworkPrimary/DeclareMentorship";
import List from "./List";

const NetworkPrimary = props => {
    const { loading, intl, onCancelClick, setRequestGlobalAction, history, authUser } = props;

    const { register, errors, handleSubmit, setValue, watch, control} = useForm({
        defaultValues: {}
    });

    const partnershipTypeWatch = watch('partnershipType');

    // const [loading, setLoading] = useState(false);
    const [canDeclare, setCanDeclare] = useState(false);
    const [showDeclareMentorship, setShowDeclareMentorship] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    const [networkProfilePartnership, setNetworkProfilePartnership] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getNetworkProfilePartnership();
    }, []);

    const _getNetworkProfilePartnership = () => {
        return new Promise((resolve, reject) => {
            setNetworkProfilePartnership({loading: true, data: null});
            getNetworkProfilePartnership(authUser.branch.id)
                .then(result => {
                    setNetworkProfilePartnership({loading: false, data: result});
                    if (result.length > 0) {
                        setCanDeclare(true);
                    }
                    resolve();
                })
                .catch(error => {
                    setNetworkProfilePartnership({loading: false, data: null});
                    NotificationManager.error("An error occur " + error.message);
                    reject();
                });
        });
    };

    const onCloseClick = () => {
        setShowDeclareMentorship(false);
        setShouldFetchData(!shouldFetchData);
    };

    const onDeclareClick = () => {
        if (canDeclare) {
            setShowDeclareMentorship(true)
        } else {
            NotificationManager.warning(intl.formatMessage({id: 'branch.field.partnershipType.empty'}));
        }
    };

    return (
        <RctCollapsibleCard>
            {/*<Form onSubmit={handleSubmit(onSubmit)}>*/}
                <div className="row align-items-end justify-content-center">
                    <CustomAsyncComponent
                        loading={networkProfilePartnership.loading}
                        data={networkProfilePartnership.data}
                        onRetryClick={_getNetworkProfilePartnership}
                        component={data => (
                            <div className="col-md-6 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="partnershipType">
                                        <IntlMessages id="branch.field.partnership"/>
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={'partnershipType'}
                                        defaultValue={data[0] ? data[0].id : undefined}
                                        as={<Select input={<Input name="partnershipType" id="partnershipType" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>}
                                    />
                                </FormControl>
                            </div>
                        )}
                    />

                    <FormGroup className="has-wrapper">
                        <Button
                            // type="submit"
                            color="primary"
                            variant="contained"
                            disabled={networkProfilePartnership.loading}
                            className="text-white font-weight-bold mr-3"
                            onClick={onDeclareClick}
                        >
                            <IntlMessages id="button.declare" />
                        </Button>
                    </FormGroup>
                </div>
            {/*</Form>*/}

            <List key={shouldFetchData} />

            {networkProfilePartnership.data && (
                <DeclareMentorship
                    show={showDeclareMentorship}
                    partnershipSelected={networkProfilePartnership.data.find(i => i.id === Number(partnershipTypeWatch))}
                    onClose={onCloseClick}
                />
            )}
        </RctCollapsibleCard>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {loading: requestGlobalLoader, authUser: authUser.data};
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(NetworkPrimary));
