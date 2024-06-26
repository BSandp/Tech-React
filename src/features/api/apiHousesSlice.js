import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const apiHousesSlice = createApi({
    reducerPath: "housesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getHouses: builder.query({
            query: () => '/house',
            providesTags: ['Houses']
        }),
        getHouseById: builder.query({
            query: (id) => '/house/' + id,
            providesTags: ['House']
        }),
        createHouse: builder.mutation({
            query: (newHouse) => ({
                url: '/house',
                method: 'POST',
                body: newHouse
            }),
            invalidatesTags: ["Houses"] // Se ejecuta cuando hay un cambio en la BD
        }),
        deleteHouse: builder.mutation({
            query: (id) => ({
                url: `/house/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Houses"]
        }),
    })
})

export const { useGetHousesQuery, 
    useGetHouseByIdQuery, 
    useCreateHouseMutation, 
    useDeleteHouseMutation,
} = apiHousesSlice