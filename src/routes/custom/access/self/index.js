import React, {useState} from 'react';
import SingleTitleText from "Components/SingleTitleText";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Create from "./Create";

const Index = () => {
    const [showCreateBox, setShowCreateBox] = useState(false);
    return (
        <>
            <Create
                show={showCreateBox}
                onClose={() => setShowCreateBox(false)}
            />
            <SingleTitleText
                component={(
                    <Button
                        // type="submit"
                        color="primary"
                        variant="contained"
                        className="text-white bg-lg font-weight-bold mr-3 bg-blue"
                        onClick={() => setShowCreateBox(true)}
                    >
                        Créer un nouvel accès
                    </Button>
                )}
            />
        </>
    );
};

export default Index;
