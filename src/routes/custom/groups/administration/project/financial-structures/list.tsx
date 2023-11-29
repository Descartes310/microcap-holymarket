import { connect } from 'react-redux';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import CreateFundingOption from '../configurations/_components/createFundingOption';

const List = (props) => {    
    
    const [datas, setDatas] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showCreateFundingOption, setShowCreateFundingOption] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFinancialStructures().then(response => {
            setDatas(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Structures financieres"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} données trouvées`}
                // onAddClick={() => props.history.push(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun projets trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Structures</th>
                                            <th className="fw-bold">Campagne</th>
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
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold mr-15"
                                                        onClick={() => {
                                                            setSelectedItem(item);
                                                            setShowCreateFundingOption(true);
                                                        }}
                                                    >
                                                        Structures
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_CREATE, item.reference))
                                                        }}
                                                    >
                                                        Campagne
                                                    </Button>
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
            {selectedItem && showCreateFundingOption && (
                <CreateFundingOption
                    show={showCreateFundingOption}
                    structure={selectedItem}
                    onClose={() => {
                        setShowCreateFundingOption(false);
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

