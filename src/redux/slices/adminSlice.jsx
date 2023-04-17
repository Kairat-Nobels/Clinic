import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        valid: false,
    },
    reducers: {
        cameAdmin: (state) =>
        {
            state.valid = true;
        },
        outAdmin: (state) =>
        {
            state.valid = false;
        }

    }
})

export const { cameAdmin, outAdmin } = adminSlice.actions
export default adminSlice.reducer

