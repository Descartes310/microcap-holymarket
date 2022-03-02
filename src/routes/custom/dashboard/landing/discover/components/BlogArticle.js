 import React from 'react';
 import moment from 'moment';
 import Card from '@material-ui/core/Card';
 import CardMedia from '@material-ui/core/CardMedia';
 import { withStyles } from '@material-ui/core/styles';
 import CardContent from '@material-ui/core/CardContent';
 import { getFilePath, formatDate } from 'Helpers/helpers';
 
 const styles = {
     media: {
         height: 250,
         paddingTop: '56.25%', // 16:9
     },
 };
 
 const BlogArticle = ({ classes, article }) => (
    <Card className="rounded mb-30">
        <CardMedia
            className={classes.media}
            image={getFilePath(article.cover)}
            title="Contemplative Reptile"
        />
        <CardContent className="py-30">
            <h3 className="font-weight-bold">{article.title}</h3>
            <span className="text-muted fs-12 mb-10 d-inline-block">{article.author}, {moment(formatDate(article.createdAt), "YYYY-MM-DD").fromNow()}</span>
            <p className="mb-0">
                {article.description}
            </p>
        </CardContent>
    </Card>
 );
 
 export default withStyles(styles)(BlogArticle);