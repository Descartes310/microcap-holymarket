import React, {Component} from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

class DropFile extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *
     * @param fileWithMeta Current file or last file uploaded
     * @param status The status of the upload of the current file
     * @param filesWithMeta All file present into the drop zone
     */
    handleChangeStatus = (fileWithMeta, status, filesWithMeta) => {
        if (status === 'done') {
            this.props.onChange(fileWithMeta.file);
        }
    };

    render() {
        const _props = {...this.props};
        const maxFileSize = _props.maxFileSize * (1024 * 1024);

        delete _props.maxFileSize;

        const accept = _props.accept;
        if (_props.pdf) accept.push('application/pdf');
        if (_props.audio) accept.push('audio/*');
        if (_props.video) accept.push('video/*');
        if (_props.image) accept.push('image/*');

        return (
            <Dropzone
                {..._props}
                autoUpload={false}
                accept={accept.join(',')}
                maxSizeBytes={maxFileSize}
                onChangeStatus={this.handleChangeStatus}
                styles={{ dropzone: { minHeight: this.props.minHeight ? this.props.minHeight : 200, maxHeight: this.props.maxHeight ? this.props.maxHeight : 250, overflow: 'hidden' } }}
            />
        )
    }
}

DropFile.defaultProps = {
    accept: []
};

export default DropFile;
