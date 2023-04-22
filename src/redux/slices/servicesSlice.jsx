import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getService = createAsyncThunk(
    "getService",
    async function (info = null, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch("https://63d78ffe5c4274b136f6a651.mockapi.io/service");
            if (response.status === 200) {
                const service = await response.json();
                return service;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const servicesSlice = createSlice({
    name: 'servicesSlice',
    initialState: {
        services: [],
        doctors: [],
        loading: false,
        error: null
    },
    extraReducers: builder =>
    {
        builder.addCase(getService.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.services = action.payload[0];
            state.doctors = action.payload[1];
        })
        builder.addCase(getService.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getService.pending, (state, action) =>
        {
            state.loading = true;
        })
    }
})

export default servicesSlice.reducer