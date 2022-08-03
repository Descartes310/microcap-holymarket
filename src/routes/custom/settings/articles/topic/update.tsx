import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [label, setLabel] = useState('');
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        getTopics();
        getTopic();
    }, []);

    const getTopic = () => {
        props.setRequestGlobalAction(true);

        SettingService.findBlogTopic(props.match.params.id).then((response) => {
            setTopic(response);
            setLabel(response.title);
            setSelectedTopic(response.parent);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Thème non trouvé');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if(!label)
            return;

        var data: any = {
            title: label        
        }

        if(selectedTopic)
            data.parent_id = selectedTopic.id;

        props.setRequestGlobalAction(true);

        SettingService.updateBlogTopic(props.match.params.id, data).then(() => {
            NotificationManager.success('Le thème a été édité avec succès');
            props.history.push(SETTING.ARTICLE.TOPIC.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors de la mise a jour du thème');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getTopics = () => {
        props.setRequestGlobalAction(true);
        SettingService.getBlogTopics(true).then((response) => {
            setTopics(response);
        }).catch((err) => {
            setTopics([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition d'un thème"}
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Thème parent
                        </InputLabel>
                        <Autocomplete
                            value={selectedTopic}
                            options={topics}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setSelectedTopic(item);
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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));