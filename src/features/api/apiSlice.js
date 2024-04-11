import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {  useSelector } from 'react-redux';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://nodejs-tan-xi.vercel.app/',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }), // Hace las veces de Axios
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/user',
            providesTags: ['Users'],// ME PERMITE EJECUTAR UN LLAMADO
            transformResponse: response => response.sort((a, b) =>
                (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
                    (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0)
        }),
        getUserById: builder.query({
            query: (_id) => `/user/${_id}`,
            providesTags: ['User'],// ME PERMITE EJECUTAR UN LLAMAD
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']//SE EJECUTA CUANDO HAY CAMBIOOS EN LA BD
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/user/${user._id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['Users', "User"]
        }),
        deleteUser: builder.mutation({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        }),
        uploadAvatar: builder.mutation({
            query: (body) => ({
                url: `/upload/${body._id}/user`,
                method: 'POST',
                body: body.file
            }),
            invalidatesTags: ['Users']
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body: body
            })
        })
    })
})



export const { useGetUsersQuery,
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUploadAvatarMutation,
    useLoginMutation } = apiSlice