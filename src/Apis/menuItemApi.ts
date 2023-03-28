import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmangoapi20230227.azurewebsites.net/api/",
        // baseUrl: "https://localhost:7215/api/",
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url: "MenuItem",
                method: "GET",
                params: {},
            }),
            providesTags: ["MenuItems"],
        }),
        getMenuItemById: builder.query({
            query: (id) => ({
                url: `MenuItem/${id}`,
                method: "GET",
                params: {},
            }),
            providesTags: ["MenuItems"],
        }),       
    }),
});

export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery } = menuItemApi