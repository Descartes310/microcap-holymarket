import React from 'react';
import Button from "@material-ui/core/Button";

const BoundaryComponent = ({onButtonClick, text, btnText, loading, byType = 'primary'}) => {
    return (
        <div className="text-center pt-50" style={{ height: 'calc(100vh - 180px)'}}>
            <div className="center-hor-ver h-50 row">
                <div className="px-4">
                    <h2 className="font-3x mb-3">
                        {text}
                    </h2>

                    <br />

                    <Button
                        // type="submit"
                        color="primary"
                        disabled={loading}
                        variant="contained"
                        className={`text-white font-weight-bold px-50 font-size-medium bg-${byType}`}
                        onClick={onButtonClick}
                    >
                        {btnText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

BoundaryComponent.propTypes = {

};

export default BoundaryComponent;
