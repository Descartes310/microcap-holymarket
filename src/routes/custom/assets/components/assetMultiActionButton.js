import { connect } from 'react-redux';
import React, { useState } from 'react';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import { NotificationManager } from 'react-notifications';
import CreateAssetItemModal from './createAssetItemModal';
import ComposeAssetItemModal from './composeAssetItemModal';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AssetMultiActionButton = ({ position, asset, setRequestGlobalAction }) => {

    const [showAddBox, setShowAddBox] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showComposeBox, setShowComposeBox] = useState(false);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const onSubmit = (data) => {
        data = {...data, asset_reference: asset.reference}
        setRequestGlobalAction(true);
        AssetService.createItem(data)
        .then(() => {
            NotificationManager.success("La création est terminée");
            setShowAddBox(false);
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => {
            setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <ButtonDropdown isOpen={dropdownOpen[position]} toggle={() => onToggleButton(position)} className="mr-3">
                <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                    Actions
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem style={{ color: 'black' }}
                        onClick={() => {
                            setShowAddBox(true);
                        }}
                    >
                        Démembrer
                    </DropdownItem>
                    <DropdownItem style={{ color: 'black' }} onClick={() => {

                    }}>
                        Solder
                    </DropdownItem>
                    <DropdownItem style={{ color: 'black' }} onClick={() => {
                        setShowComposeBox(true);
                    }}>
                        Composer
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>

            {(showAddBox) && (
                <CreateAssetItemModal
                    show={showAddBox}
                    asset={asset}
                    title={'Créer un démembrement'}
                    onClose={() => {
                        setShowAddBox(false);
                    }}
                    onSubmit={onSubmit}
                />
            )}

            {(showComposeBox) && (
                <ComposeAssetItemModal
                    show={showComposeBox}
                    asset={asset}
                    title={'Composer un actif'}
                    onClose={() => {
                        setShowComposeBox(false);
                    }}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AssetMultiActionButton));