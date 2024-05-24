import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateArticleTopic = (props) => {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);
    const [label, setLabel] = useState(props.defaultTitle ? props.defaultTitle : '');

    useEffect(() => {
        getTopics();
    }, []);

    const onSubmit = () => {
        if(!label)
            return;

        var data = {
            title: label,
            personal: props.personal
        }

        if(topic) {
            data.parent_id = topic.id;
        }

        props.setRequestGlobalAction(true);

        SettingService.createBlogTopic(data).then(() => {
            NotificationManager.success('Le thème a été créé avec succès');
            props.onClose();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors de la création du thème');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getTopics = () => {
        props.setRequestGlobalAction(true);
        SettingService.getBlogTopics(true, props.personal).then((response) => {
            setTopics(response);
        }).catch((err) => {
            setTopics([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
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
            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                <InputLabel className="text-left">
                    Thème parent
                </InputLabel>
                <Autocomplete
                    value={topic}
                    options={topics}
                    id="combo-box-demo"
                    onChange={(__, item) => {
                        setTopic(item);
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>
            <FormGroup>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                    className="text-white font-weight-bold"
                >
                    Ajouter
                </Button>
            </FormGroup>
        </Form>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CreateArticleTopic));