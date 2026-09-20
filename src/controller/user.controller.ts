import type { Request, Response } from "express";
import { createUserDB } from "../db/database";

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body.name)
    const response = await createUserDB(req.body.name, req.body.email);

    if (response) {
        return res.status(200).json({
            status: 'success',
            data:response
        })
    } else {
        return res.status(400).json({
            status:'something went wrong while creating user'
        })
    }
}