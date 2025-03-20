import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


// const AuthCallbackPage = () =>{
//     const navigate = useNavigate();
//     const {user} = useAuth0();
//      const {createUser} = useCreateMyUser();

//      const hashCreatedUser = useRef(false);

//      useEffect(() => {
//         if(user?.sub && user?.email && !hashCreatedUser.current){
//             createUser({auth0Id: user.sub, email: user.email});
//             hashCreatedUser.current = true;
//         }
//         navigate("/");
//      },[createUser, navigate, user]);

//      return <>Loading...</>
// };

// export default AuthCallbackPage;

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
  
    useEffect(() => {
      if (user?.sub && user?.email) {
        // Create or fetch the user in your backend
        createUser({ auth0Id: user.sub, email: user.email });
      }
      // Redirect to home after processing
      navigate("/");
    }, [createUser, navigate, user]);
  
    return <>Loading...</>;
  };

  export default AuthCallbackPage;