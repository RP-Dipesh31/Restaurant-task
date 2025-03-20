import React from "react";
import { AppState, useAuth0, User } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";



type Props = {
    children : React.ReactNode
}

const Auth0ProviderWithNavigate = ({children}:Props) => {
    const navigate = useNavigate();
  //  const {getAccessTokenSilently} = useAuth0();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    console.log("Auth0 Environment Variables:", { domain, clientId, redirectUri });

    if(!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialise auth");
    }

    const onRedirectCallback = async(AppState? : AppState, user? : User) => {
       // console.log("USER", user);
       navigate("/auth-callback");
    };

    return(
        <Auth0Provider 
            domain={domain} 
            clientId={clientId} 
            authorizationParams={{
                redirect_uri:window.location.origin,
                audience,
                scope: "openid profile email",
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
        
    )
};

export default Auth0ProviderWithNavigate;