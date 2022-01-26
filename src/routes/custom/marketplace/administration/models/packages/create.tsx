import React, { useState } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = () => {

    const [label, setLabel] = useState('');

    const onSubmit = () => {
        console.log('Press');
    }

    return (
        <>
            <PageTitleBar
                title={"Création de catégorie"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default Create;