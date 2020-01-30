import React, {useState} from 'react';
import moment from 'moment';
import { Button, Menu, MenuItem, Popover, FormGroup, InputGroup, Label} from "@blueprintjs/core";
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import {BrowserRouter, Link} from 'react-router-dom';


function User(){

    return(
        <div>
            <FormGroup>
                <Label className="bp3-label">
                    Username
                    <InputGroup className="bp3-input" id="user-input" type="text" placeholder="Username"/>
                </Label>
                
                <Label className="bp3-label">
                    Password
                    <InputGroup className="bp3-input" id="password-input" type="password" placeholder="Password"/>
                </Label>
                
                <Button>Sign In</Button>
                <Button>Register</Button>
            </FormGroup>
        </div>
    )

}

export default User;