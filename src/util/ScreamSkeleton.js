import React, { Fragment } from 'react';
import NoImg from '../images/NoImg.png';
import PropTypes from 'prop-types';

//mui
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';



const ScreamSkeleton = (props) => {

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className="card" key={index}>
            <CardMedia className="cover" image={NoImg} />
            <CardContent className="content">
                <div className="handle" />
                <div className="date" />
                <div className="full-line" />
                <div className="full-line" />
                <div className="half-line" />
            </CardContent>
        </Card>
    ));

    return <Fragment>{content}</Fragment>;
};

export default ScreamSkeleton;