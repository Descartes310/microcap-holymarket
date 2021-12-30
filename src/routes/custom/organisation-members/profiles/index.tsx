import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from "@material-ui/core";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { PROFILES } from 'Url/backendUrl'; 
import useSWR from 'swr';
import AddEditProfileBox from './AddEditProfileBox';


const Profiles = () => {

    const [showCreateBox, setShowCreateBox] = useState(false);
    const [profileToEdit, setProfileToEdit] = useState(null);

    const { data, error, mutate } = useSWR(PROFILES.index);

    const handleEdit = (item) => {
        setProfileToEdit(item);
        setShowCreateBox(true);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des profiles"}
            />
            <CustomList
                list={data}
                loading={!data && !error}
                itemsFoundText={n => `${n} profiles trouvés`}
                onAddClick={() => setShowCreateBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun profil trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Permissions</th>
                                            <th className='text-right'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
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
                                                            <ul>
                                                                {item.permissions.map(p => (
                                                                    <li>{p.label}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right table-action">
                                                    <IconButton
                                                        edge="start"
                                                        onClick={() => handleEdit(item)}
                                                        className="text-black"
                                                        color="inherit"
                                                        aria-label="menu">
                                                        <EditIcon />
                                                    </IconButton>
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

            <AddEditProfileBox
                profile={profileToEdit}
                show={showCreateBox}
                onClose={() => {
                    setShowCreateBox(false);
                    setProfileToEdit(null);
                    mutate();
                }}
            />
        </>
    );
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});


export default withStyles(styles, { withTheme: true }) (
    withRouter(Profiles)
);
