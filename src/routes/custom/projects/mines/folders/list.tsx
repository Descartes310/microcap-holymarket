import { connect } from 'react-redux';
import UserService from 'Services/users';
import { setSession } from 'Helpers/tokens';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useState, useEffect } from 'react';
import { translateProjectTypes } from 'Helpers/datas';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { joinUrlWithParamsId, PROJECT } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {    
    
    const [projects, setProjects] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const getProjects = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjects().then(response => {
            setProjects(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const enterInCommunitySpace = (reference: string) => {
        UserService.changeUserAccessFromCommunity(reference)        
        .then(response => {
            setSession(response);
            window.location.reload();
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Mes projets"}
            />
            <CustomList
                list={projects}
                loading={false}
                itemsFoundText={n => `${n} projets trouvés`}
                onAddClick={() => props.history.push(PROJECT.MINE.FOLDER.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun projets trouvés
                                </h4>
                            </div>
                        ) : (
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type de projet</th>
                                            <th className="fw-bold">Besoin estimé</th>
                                            <th className="fw-bold">Actions</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{translateProjectTypes(item.type)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.budget, item.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3" positionFixed={true}>
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu  container={'body'}>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    enterInCommunitySpace(item.groupReference);
                                                                }}
                                                            >
                                                                Communauté projet
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.SHOW, item.id))
                                                                }}
                                                            >
                                                                Fiche projet
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                    props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.ACTIVITY.LIST, item.id))
                                                                }}
                                                            >
                                                                Activités
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.GALLERY, item.id))
                                                            }}>
                                                                Gallérie
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                props.history.push(joinUrlWithParamsId(PROJECT.MINE.FOLDER.UPDATE, item.id))
                                                            }}>
                                                                Editer
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        )}
                    </>
                )}
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
