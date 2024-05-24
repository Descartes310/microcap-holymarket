import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import CreateArticleTheme from 'Components/CreateArticleTheme';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        getTopics();
    }, []);

    const onSubmit = () => {
        if(!label)
            return;

        var data: any = {
            title: label        
        }

        if(topic)
            data.parent_id = topic.id;

        props.setRequestGlobalAction(true);

        SettingService.createBlogTopic(data).then(() => {
            NotificationManager.success('Le thème a été créé avec succès');
            props.history.push(SETTING.ARTICLE.TOPIC.LIST);
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
                title={"Création d'un thème"}
            />
            <RctCollapsibleCard>
                <CreateArticleTheme personal={false} onClose={() => {
                    props.history.push(SETTING.ARTICLE.TOPIC.LIST);
                }} />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));