import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {Tooltip} from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import {getFilePath} from "Helpers/helpers";
import {Form, FormGroup, Label} from "reactstrap";
import React, {useEffect, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {getUserClientExp} from "Actions/independentActions";
import InputCheckbox from "Components/Inputs/InputCheckbox";
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const DocumentsToProvide = ({show, onSelectedChange, authUser}) => {
    const { control, register, errors, handleSubmit, watch, getValues } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [docs, setDocs] = useState({
        data: null,
        error: null,
        loading: true
    });

    const checkForChanges = () => {
        const data = watch();
        // parse data since they are in {"id": Boolean} ie {"1": true, "43": false}
        onSelectedChange(Object.entries(data).filter(d => d[1]).map(d => Number(d[0])));
    };

    const loadData = () => {
        getUserClientExp(authUser.user.branch.id)
            .then(data => {
                setDocs({ data, error: null, loading: false });
                setPhotoIndex(0);
            })
            .catch(error => {
                setDocs({ error, data: null, loading: false });
            });
    };

    useEffect(() => {
        loadData();
        // checkForChanges();
    }, []);

    const onImageClick = (e, index) => {
        e.preventDefault();
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const onSubmit = data => {
    };

    if (!show) {
        return null;
    }

    if (docs.loading) {
        return (<RctSectionLoader />)
    }

    if (docs.error) {
        return (<FetchFailedComponent _onRetryClick={loadData} />)
    }

    const images = docs.data.map(d => getFilePath(d.file));

    checkForChanges();

    return (
        <RctCollapsibleCard>
            <Form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="ml-0">
                            Veuillez selectionner les documents qui seront requis
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {docs.data.map((doc, index) => (
                        <div className="col-sm-12" key={doc.id}>
                            <div className="center-ver">
                                <FormControl>
                                    <div className="d-flex center-ver">
                                        <InputCheckbox
                                            errors={errors}
                                            text={doc.name}
                                            control={control}
                                            name={`${doc.id}`}
                                            register={register}
                                            textClassName="ml-2"
                                            className="mt-0 ml-0 position-relative"
                                        />
                                    </div>
                                </FormControl>
                                <a href="#" className="ml-2" onClick={(e) => onImageClick(e, index)}>
                                    <Tooltip title={"Aperçu"}>
                                        <i className="mt-1 font-size-20px zmdi zmdi-zoom-out" />
                                    </Tooltip>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    />
                )}

                {/*<FormGroup className="mb-15">
                    <Button
                        // type="submit"
                        color="primary"
                        // disabled={loading}
                        variant="contained"
                        className="text-white font-weight-bold mr-3"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Ajouter
                    </Button>
                    <Button
                        // type="submit"
                        color="primary"
                        // disabled={loading}
                        variant="contained"
                        className="text-white font-weight-bold btn-danger"
                        onClick={() => onCancel()}
                    >
                        Annuler
                    </Button>
                </FormGroup>*/}
            </Form>
        </RctCollapsibleCard>
    );
};

DocumentsToProvide.propTypes = {

};

export default connect(({authUser}) => ({authUser: authUser.data}), {})(DocumentsToProvide);
