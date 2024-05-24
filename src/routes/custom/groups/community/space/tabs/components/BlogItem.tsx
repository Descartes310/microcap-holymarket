import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { getFilePath, DEFAULT_IMAGE } from 'Helpers/helpers';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const BlogItem = ({ classes = null, blog, openDetails }) => (
    <Card className="rounded mb-30 col-md-3 px-10">
        <CardMedia
            onClick={() => openDetails()}
            className={classes?.media}
            image={blog.image ? getFilePath(blog.image) : DEFAULT_IMAGE}
            title={`${blog.image} profile image`}
        />
        <CardContent onClick={() => openDetails()} className="py-30">
            <h3 className="font-weight-bold" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden", marginBottom: 20 }}>{blog.name}</h3>
            <p>{blog.description}</p>
        </CardContent>
        <CardActions className="d-flex justify-content-between border-top py-0">
            <div style={{ padding: 20, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold"
                    style={{ marginRight: 10 }}
                    onClick={() => openDetails()}
                >
                    Fil d'actualité
                </Button>
            </div>
        </CardActions>
    </Card>
);

export default withStyles(styles)(BlogItem);