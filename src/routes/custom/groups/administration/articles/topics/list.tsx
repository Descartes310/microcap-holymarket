import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';

const List = (props) => {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics();
    }, []);

    const getTopics = () => {
        props.setRequestGlobalAction(true);
        GroupService.getBlogTopics().then((response) => {
            setTopics(response);
        }).catch((err) => {
            setTopics([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <CustomList
            list={topics}
            loading={false}
            itemsFoundText={n => `${n} thèmes trouvés`}
            onAddClick={() => props.history.push(GROUP.ADMINISTRATION.ARTICLE.TOPIC.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun thèmes trouvés
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Parent</th>
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
                                                        <h4 className="m-0 fw-bold text-dark">{item?.parent?.title}</h4>
                                                    </div>
                                                </div>
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
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));