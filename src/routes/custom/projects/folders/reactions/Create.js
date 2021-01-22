import { projects } from "Data";
import { connect } from "react-redux";
import { createProjectReaction } from "Actions/independentActions";
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import { PROJECTS } from "Url/frontendUrl";
import { ERROR_500 } from "Constants/errors";
import { Form, FormGroup } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import { NotificationManager } from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import SingleTitleText from "Components/SingleTitleText";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { getInitialisationOptions, setRequestGlobalAction } from "Actions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const Create = props => {
    const { authUser, history, intl, getInitialisationOptions, setRequestGlobalAction, communitySpace } = props;

    const [type, setType] = useState('POSITIVE');
    const [initializationId, setInitializationId] = useState('');

    const [initialisationData, setInitialisationData] = useState({
        data: null,
        error: null,
        loading: true
    });

    const { register, errors, handleSubmit } = useForm();

    const onTypeChange = (newValue) => {
        if (newValue !== type) {
            setType(newValue);
        }
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const _data = {
            ...data,
            userId: authUser.user.id,
            type: type,
            groupId: communitySpace.data
        };
        createProjectReaction(_data)
            .then(() => {
                NotificationManager.success("Activité crée avec succès");
                history.push(PROJECTS.FOLDERS.REACTIONS.LIST);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const getWorks = () => {
        if (initialisationData.data) {
            const item = initialisationData.data.find(i => i.id === initializationId);
            return item ? item.works : null;
        }

        return null;
    };

    const works = getWorks();

    return (
        <>
            <PageTitleBar
                title={"Création d'une activité projet"}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="title">
                                Titre
                            </InputLabel>
                            <InputComponent
                                isRequired
                                id="title"
                                name={'title'}
                                errors={errors}
                                register={register}
                                className="input-lg"
                            />
                            <span className="has-icon"><i className="ti-pencil" /></span>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 mb-20">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="type">
                                Type
                            </InputLabel>
                            <Select
                                value={type}
                                onChange={event => onTypeChange(event.target.value)}
                                input={<Input name="type" id="type" />}>
                                <MenuItem value={'POSITIVE'} className="center-hor-ver">
                                    Approbation
                                </MenuItem>
                                <MenuItem value={'NEGATIVE'} className="center-hor-ver">
                                    Objection
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="description">
                                Contenu
                            </InputLabel>
                            <InputComponent
                                isRequired
                                errors={errors}
                                id="description"
                                register={register}
                                name={'description'}
                                className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                            />
                            <span className="has-icon"><i className="ti-pencil" /></span>
                        </FormGroup>
                    </div>
                </div>

                <FormGroup className="mb-15">
                    <Button
                        // type="submit"
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold mr-3"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <IntlMessages id="button.submit" />
                    </Button>
                </FormGroup>
            </Form>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        loading: requestGlobalLoader,
        communitySpace
    };
};

export default connect(mapStateToProps, { getInitialisationOptions, setRequestGlobalAction })(injectIntl(Create));
