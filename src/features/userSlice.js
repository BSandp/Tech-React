import { createSlice } from "@reduxjs/toolkit";

const users=[
    {
    
        "_id": "65e7830d03dc9ebe7de1cfaa",
        "id": 98765454321,
        "name": "francisco",
        "lastname": "ASDA",
        "email": "fdasdavis@correo.com",
        "password": "Abcs1325*",
        "avatar": " https://pbs.twimg.com/profile_images/1554204006960009219/XQHn4NJk_400x400.jpg",

        
    }
]

export const userSlice = createSlice({
    name: "users",
    initialState: users,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        }
    }
})
export const{addUser} = userSlice.actions
export default userSlice.reducer

