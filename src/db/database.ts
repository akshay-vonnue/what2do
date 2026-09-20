import { ErrorHandler } from '../lib/db_handlers.js'
import { prisma } from '../lib/prisma.js'

export const createUserDB = async (name: string, email: string) => {
    try {
        let response = await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        })

        return response
    } catch (error) {
        ErrorHandler('DB : something went wrong while creating user')
    }
}

export const createTodoDB = async (
    content: string,
    category_id: number,
    createdBy : number
) => {
    
}

export const getTodoDB = async () => {

}

export const updateTodoDB = async () => {

}

export const deleteTodoDB = async () => {

}