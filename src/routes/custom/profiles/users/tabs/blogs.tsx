import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { formatDate } from 'Helpers/helpers';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import SettingService from 'Services/settings';
import React, { useState, useEffect } from 'react';
import BlogSetting from '../components/BlogSetting';
import CreateArticleModal from '../components/CreateArticle';

const Blogs = (props) => {

    const [articles, setArticles] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [showSettingBox, setShowSettingBox] = useState(false);

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = () => {
        props.setRequestGlobalAction(true),
        SettingService.getMyArticles()
        .then(response => setArticles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (article) => {
        props.setRequestGlobalAction(true);
        SettingService.updateArticleStatus(article.id)
            .then(() => getArticles())
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={articles}
                loading={false}
                rightComponent={() => (
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => setShowSettingBox(true)}
                    >
                        Configuration
                    </Button>
                )}
                itemsFoundText={n => `${n} articles trouvés`}
                onAddClick={() => setShowAddBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun articles trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Titre</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Auteur</th>
                                            <th className="fw-bold">Date de publication</th>
                                            <th className="fw-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.author}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{formatDate(item.createdAt)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Actif"
                                                        checked={item.status}
                                                        onChange={() => { changeStatus(item) }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
            <CreateArticleModal
                show={showAddBox}
                onClose={() => {
                    setShowAddBox(false);
                    getArticles();
                }}
            />
            <BlogSetting
                show={showSettingBox}
                onClose={() => {
                    setShowSettingBox(false);
                }}
            />
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Blogs));
