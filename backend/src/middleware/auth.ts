
import { auth } from "express-oauth2-jwt-bearer";
import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import User from "../models/user";

declare global{
    namespace Express {
        interface Request{
            userId: string;
            auth0Id: string;
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUth0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'

});


export const jwtParse = async (
    req:Request,
    res:Response, 
    next: NextFunction
): Promise<void> => {
    const{authorization} = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) { 
       // return res.sendStatus(401);
       res.sendStatus(401);
        return;
    }

    const token = authorization.split(" ")[1];
    console.log("Token:", token);

    try{
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        // const auth0Id = decoded.sub;
        const auth0Id = decoded?.sub;

        if (!auth0Id) {
            res.sendStatus(401);
            return;
        }

        const user = await User.findOne({auth0Id});

        if(!user){
            // return res.sendStatus(401);
            res.sendStatus(401);
            return;
        }

        if (!user._id) {
            res.sendStatus(401);
            return;
        }
        // req.auth0Id = auth0Id as string;
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next(); 
    } catch(error) {
        // return res.sendStatus(401);
        res.sendStatus(401);
    }
};

