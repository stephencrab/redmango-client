import { createSlice } from "@reduxjs/toolkit";

const initialStete = {
    menuItem: [],
};

export const menuItemSlice = createSlice({
    name: "MenuItem",
    initialState: initialStete,
    reducers: {
        setMenuItem: (state, action) => {
            state.menuItem = action.payload;
        },
    },
});

export const { setMenuItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;