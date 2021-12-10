import _ from 'lodash';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { getUserByEmail } from "Actions";
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import InputComponent from "Components/InputComponent";
import { emailValidatorObject } from "Helpers/validator";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import ErrorInputComponent from "Components/ErrorInputComponent";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";

const SecondStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState } = props;

    const [user, setUser] = useState();
    const [email, setEmail] = useState();

    const { register, errors, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    /**
     * On submit
     */
    const onSubmit = (data) => {
        // Send data
        setData(data);
        // Redirect to the next step
        nextStep();
    };

    const findUserByEmail = () => {
        getUserByEmail(email)
            .then((user) => {
                setUser(user);
            }).catch(err => {
                console.log(err);
            });
    }

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>

            <div className="row">
                <FormGroup className="has-wrapper col-md-10 col-sm-12">
                    <InputLabel className="text-left" htmlFor="email">
                        Email du responsable
                    </InputLabel>
                    <InputComponent
                        id="email"
                        type="mail"
                        isRequired
                        name={'email'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={'example@gmail.com'}
                        onChange={(e) => setEmail(e.target.value)}
                        otherValidator={{ pattern: emailValidatorObject.regex }}
                    >
                        {errors.email?.type === 'pattern' && (
                            <ErrorInputComponent text={intl.formatMessage({ id: emailValidatorObject.message })} />
                        )}
                    </InputComponent>
                </FormGroup>
                <FormGroup className="col-md-2 col-sm-12">
                    <InputLabel className="text-left">
                    </InputLabel>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => findUserByEmail()}
                        className="text-white font-weight-bold"
                    >
                        Verifier
                    </Button>
                </FormGroup>
            </div>

            {user && (
                <>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Noms / Raison sociale
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="text"
                            value={user?.name}
                            id="corporateName"
                            name="corporateName"
                            className="input-lg"
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="commercialName">
                            Adresse email
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="text"
                            className="input-lg"
                            id="commercialName"
                            name="commercialName"
                            value={user?.email}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="immatriculationValue">
                            Identification
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="text"
                            className="input-lg"
                            id="immatriculationValue"
                            name="immatriculationValue"
                            value={user?.identification}
                        />
                    </FormGroup>
                </>
            )}

            <FormGroup className="mb-15">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="outlined"
                    className="font-weight-bold mr-2"
                    onClick={onPreviousClicked}
                >
                    <i className="ti-arrow-left font-weight-bold mr-2"></i> <IntlMessages id="button.previous" />
                </Button>

                <Button
                    color="primary"
                    disabled={loading || !user}
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={handleSubmit(onSubmit)}
                >
                    <IntlMessages id="button.next" /> <i className="ti-arrow-right font-weight-bold ml-2"></i>
                </Button>
            </FormGroup>
        </Form>
    );
};

SecondStep.propTypes = {

};

export default injectIntl(SecondStep);
