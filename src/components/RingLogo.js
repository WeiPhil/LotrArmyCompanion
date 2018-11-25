import React from 'react';
import { withStyles } from '@material-ui/core/styles';



import logo from './../images/lotrRing.jpg';

const styles = {
    float: 'left',
    marginRight: 10,
    width : 32,
    height: 32,
}

function RingLogo(props) {
    return (
        <img src={logo} style={styles} alt="logo" />
    );
}


export default withStyles(styles)(RingLogo);