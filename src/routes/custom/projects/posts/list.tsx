import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { PROJECT } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import ProjectService from 'Services/projects';

const List = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectPosts().then(response => {
            setPosts(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des postes projets"}
            />
            <CustomList
                list={posts}
                loading={false}
                itemsFoundText={n => `${n} postes trouvés`}
                onAddClick={() => props.history.push(PROJECT.POST.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun postes trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
