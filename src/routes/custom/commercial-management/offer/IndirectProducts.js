import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ObjectSwitcher from "Components/ObjectSwitcher";
import DialogComponent from "Components/DialogComponent";
import DocumentsToProvide from "Routes/custom/commercial-management/offer/DocumentsToProvide";

const PROCESS = [
    { label: 'Demande de pièce', id: 1 },
    // { label: "Demande d'accord de vente", id: 'SELL_APPROBATION' },
    // { label: "Demande d'accord d'achat", id: 'BUY_APPROBATION' }
];

const IndirectProducts = ({showProcess, onDocsChange}) => {
    const [chosenProcess, setChosenProcess] = useState([]);
    const [showDocsBox, setShowDocsBox] = useState(false);
    const [onRemoveSelected, setRemoveSelected] = useState(null);


    useEffect(() => {
        if (chosenProcess.find(p => p.id === 1)) {
            setShowDocsBox(true);
            // setRemoveSelected()
        } else {
            onDocsChange([]);
            setShowDocsBox(false);
        }
    }, [chosenProcess]);

    return (
        <div>
            {showProcess && (
                <ObjectSwitcher
                    loading={false}
                    data={PROCESS}
                    onRetryClick={() => null}
                    label={"Processus de vente préalable"}
                    onRemoveSelected={onRemoveSelected}
                    onItemsChanged={items => setChosenProcess(items)}
                />
            )}
            <DocumentsToProvide
                show={showDocsBox}
                onSelectedChange={items => onDocsChange(items)}
            />
        </div>
    );
};

IndirectProducts.propTypes = {

};

export default IndirectProducts;
