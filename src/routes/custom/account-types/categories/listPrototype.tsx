import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        // props.setRequestGlobalAction(true),
        // xxx.getAccountTypeCategories()
        // .then(response => setCategories(categories))
        // .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des profiles"}
            />
            <CustomList
                list={[]}
                loading={false}
                itemsFoundText={n => `${n} xxx trouvés`}
                onAddClick={() => console.log('Ajout')}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun xxx trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Description</th>
                                            <th className='text-right'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.xxx}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.xxx}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right table-action">
                                                    <IconButton
                                                        edge="start"
                                                        //onClick={() => handleEdit(item)}
                                                        className="text-black"
                                                        color="inherit"
                                                        aria-label="menu"
                                                    >
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Categories));
