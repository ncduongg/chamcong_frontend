import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Filepage from 'features/File/pages/Filepage';
File.propTypes = {
    
};

function File(props) {
    const match = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route path={match.path} component={Filepage} />
            </Switch>
        </div>
    );
}

export default File;