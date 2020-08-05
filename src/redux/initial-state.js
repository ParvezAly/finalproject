const initialState = {
    reduxTokenAuth: {
        currentUser: {
            isLoading: false,
            isSignedIn: false,
            attribute: {
                user_name: null,
                email: null,
            },
        },
    },
}


export default initialState