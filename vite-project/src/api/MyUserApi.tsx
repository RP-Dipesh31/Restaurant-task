import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUSer = () => {
    const {getAccessTokenSilently} = useAuth0();
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently({
            audience,
            scope: "openid profile email",
        }as any);

        console.log("Access Token:", accessToken);
       // const accessToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXNqN3RrYXVib3piejNjaC51cy5hdXRoMC5jb20vIn0..WwEVlS0yu_jn5CvJ.wOLGHD3wOJj69qpna-jOddlLuaiN2OdLPyhij_ldyyh_Oxl0sbA-bjTxip3cCfp6zq0ZaSOkpTzGGAUeCnO4tkpEleTDbWiGLS-NOIYhLXlqxRIVtxPECpkxvYd1hskEGzxzrp8GXmoPE6SVMkCgO4RQgeKUg3b65XkU1EIMJ2f90Z329YBYZd--YDP_-d3LK-VgYeHayoiXLnQpkGvgJozNo0-dEPJ95y31orPiY_G7zU68qO7R50pvvjpammUtjE6BDCLEZnYqvjaZhtNiLfmemVbQQAPFC-Iu7_JbvQVVyypei4tQVv-HRiC9ANwxNA.maoXrkBNn5tcn4rQ8cfpxQ";
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"GET",
            headers : {
                "Authorization": `Bearer ${accessToken}`,
                "Content-type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error("Failed to fetch user");
        }

        return response.json();
    };


    const {
        data: currentUser, 
        isLoading, 
        error,
    } = useQuery("fetchCurrentUser", getMyUserRequest);

    if(error){
        toast.error(error.toString());
    }

    return { currentUser, isLoading};
};

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently({
            audience,
            scope: "openid profile email",
        } as any);

        console.log("Access Token:", accessToken);
      // const accessToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXNqN3RrYXVib3piejNjaC51cy5hdXRoMC5jb20vIn0..WwEVlS0yu_jn5CvJ.wOLGHD3wOJj69qpna-jOddlLuaiN2OdLPyhij_ldyyh_Oxl0sbA-bjTxip3cCfp6zq0ZaSOkpTzGGAUeCnO4tkpEleTDbWiGLS-NOIYhLXlqxRIVtxPECpkxvYd1hskEGzxzrp8GXmoPE6SVMkCgO4RQgeKUg3b65XkU1EIMJ2f90Z329YBYZd--YDP_-d3LK-VgYeHayoiXLnQpkGvgJozNo0-dEPJ95y31orPiY_G7zU68qO7R50pvvjpammUtjE6BDCLEZnYqvjaZhtNiLfmemVbQQAPFC-Iu7_JbvQVVyypei4tQVv-HRiC9ANwxNA.maoXrkBNn5tcn4rQ8cfpxQ";
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-type": "application/json",
            },
            body:JSON.stringify(user),
        });

        if(!response.ok){
            throw new Error("Failed to create user");
        }

        return response.json();
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createMyUserRequest);

    return{
        createUser,
        isLoading,
        isError,
        isSuccess,
    };
};

type UpdateMyUSerRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const updateMyUSerRequest = async (formData:UpdateMyUSerRequest) => {
        const accessToken = await getAccessTokenSilently({
            audience,
            scope: "openid profile email",
        } as any);

        console.log("Access Token:", accessToken);
       // const accessToken = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXNqN3RrYXVib3piejNjaC51cy5hdXRoMC5jb20vIn0..WwEVlS0yu_jn5CvJ.wOLGHD3wOJj69qpna-jOddlLuaiN2OdLPyhij_ldyyh_Oxl0sbA-bjTxip3cCfp6zq0ZaSOkpTzGGAUeCnO4tkpEleTDbWiGLS-NOIYhLXlqxRIVtxPECpkxvYd1hskEGzxzrp8GXmoPE6SVMkCgO4RQgeKUg3b65XkU1EIMJ2f90Z329YBYZd--YDP_-d3LK-VgYeHayoiXLnQpkGvgJozNo0-dEPJ95y31orPiY_G7zU68qO7R50pvvjpammUtjE6BDCLEZnYqvjaZhtNiLfmemVbQQAPFC-Iu7_JbvQVVyypei4tQVv-HRiC9ANwxNA.maoXrkBNn5tcn4rQ8cfpxQ";
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`, 
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(!response.ok){
            throw new Error("failed to update user");
        }

        return response.json();
    };


    const {
        mutateAsync: updateUser, 
        isLoading, 
        isSuccess, 
         error, 
         reset,
    } = useMutation(updateMyUSerRequest);


    if(isSuccess){
        toast.success("User profile updated!");
    }

    if(error){
        toast.error(error.toString());
        reset();
    }

    return{updateUser, isLoading};
};

