import {Button} from "reactstrap";
import {injectIntl} from "react-intl";
import React, {useState} from 'react';
import RoleService from 'Services/roles';
import {useTheme} from "@material-ui/core";
import DropFile from "Components/DropFile";
import IntlMessages from "Util/IntlMessages";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from "react-notifications";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const UploadBox = ({show, onClose, setRequestGlobalAction}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [file, setFile] = useState(null);

    const onFileChange = (newFile) => {
        setFile(newFile);
    };

    const onSubmit = () => {
        setRequestGlobalAction(true);
        RoleService.updateFromExcel({file})
            .then(() => {
                NotificationManager.success("Mise a jour effectuée avec succès");
                onClose();
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Un problème est survenu, veuillez re-essayer plus tard.");
                onClose();
            })
            .finally(() => setRequestGlobalAction(false))
    };

    return (
        <Dialog
            open={show}
            onClose={onClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth={'lg'}
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Importer à partir d'excel
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <RctCollapsibleCard>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <DropFile
                                maxFiles={1}
                                maxFileSize={100}
                                multiple={false}
                                onChange={onFileChange}
                                accept={["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <Button
                            color="primary"
                            className="fw-bold btn-submit"
                            onClick={() => onSubmit()}
                        >
                            <i className="fw-bold ti-check mr-2" />
                            <IntlMessages id="button.submit" />
                        </Button>
                    </div>
                </RctCollapsibleCard>
            </DialogContent>
        </Dialog>
    );
};

export default injectIntl(UploadBox);
