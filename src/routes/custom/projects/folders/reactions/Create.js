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
    const { authUser, history, intl, currentCommunity, setRequestGlobalAction, communitySpace } = props;

    const [type, setType] = useState('ARGUMENT');
    const [work, setWork] = useState(currentCommunity.data ? currentCommunity.data.project ? currentCommunity.data.project.works[0].id : null : null);

    const [file, setFile] = useState(null);

    const { register, errors, handleSubmit } = useForm();

    const onTypeChange = (newValue) => {
        if (newValue !== type) {
            setType(newValue);
        }
    };

    const onWorkChange = (newValue) => {
        if (newValue !== work) {
            setWork(newValue);
        }
    };

    useEffect(() => {
        console.log(currentCommunity);
    }, [])

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const _data = {
            ...data,
            file,
            userId: authUser.user.id,
            type: type,
            workId: work,
            groupId: communitySpace.data
        };
        createProjectReaction(_data, { fileData: ['file'], multipart: true })
            .then(() => {
                NotificationManager.success("Activité crée avec succès");
                history.push(PROJECTS.FOLDERS.REACTIONS.LIST);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false));
    };

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
                                <MenuItem value={'ARGUMENT'} className="center-hor-ver">
                                    Argument
                                </MenuItem>
                                <MenuItem value={'OBJECTION'} className="center-hor-ver">
                                    Objection
                                </MenuItem>
                                <MenuItem value={'ILLUSTRATION'} className="center-hor-ver">
                                    Illustration
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 mb-20">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="type">
                                Ouvrages du projet
                            </InputLabel>
                            <Select
                                value={work}
                                onChange={event => onWorkChange(event.target.value)}
                                input={<Input name="type" id="type" />}>
                                {
                                    currentCommunity.data ? currentCommunity.data.community.projectFolder ? currentCommunity.data.community.projectFolder.works.map(w => (
                                        <MenuItem value={w.id} className="center-hor-ver">
                                            {w.book.title}
                                        </MenuItem>
                                    )) : null : null}
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
                {
                    type == 'ILLUSTRATION' ?
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <FormGroup fullWidth>
                                    <InputLabel className="text-left" htmlFor="file">
                                        Document du projet
                                    </InputLabel>
                                    <Input
                                        id="File"
                                        type="file"
                                        name="file"
                                        onChange={event => setFile(event.target.files[0])}
                                    />
                                </FormGroup>
                            </div>
                        </div> : null
                }

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

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace, currentCommunity }) => {
    return {
        authUser: authUser.data,
        loading: requestGlobalLoader,
        communitySpace,
        currentCommunity
    };
};

export default connect(mapStateToProps, { getInitialisationOptions, setRequestGlobalAction })(injectIntl(Create));
