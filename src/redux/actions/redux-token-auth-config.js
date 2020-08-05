import { generateAuthActions } from 'redux-token-auth';
import { APP_SETTINGS } from '../../config';


const config = {

    authUrl: `${APP_SETTINGS.API.URL}/auth`,
    userAttributes: {
        user_name: '',
        email: null,
        data: null
    },
    userRegistrationAttributes: {
        user_name: '',
    }
}

const {
    registerUser,
    signInUser,
    signOutUser,
    verifyCredentials,
} = generateAuthActions(config)

export {
    registerUser,
    signInUser,
    signOutUser,
    verifyCredentials,
}