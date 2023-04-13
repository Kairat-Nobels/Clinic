import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecords = createAsyncThunk(
    "getRecords",
    async function (info = null, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch("https://63d78ffe5c4274b136f6a651.mockapi.io/items");
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)

export const createRecord = createAsyncThunk(
    "createRecord",
    async function (record = null, { dispatch, rejectWithValue })
    {
        try {
            const res = await fetch('https://63d78ffe5c4274b136f6a651.mockapi.io/items', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                if (record.type === 1) return 'Вы успешно записались'
                else return 'Отзыв успешно добавлен'
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

const recordsSlice = createSlice({
    name: 'recordsSlice',
    initialState: {
        records: [],
        loading: false,
        error: null,
        success: null
    },
    extraReducers: builder =>
    {
        builder.addCase(getRecords.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.records = action.payload;
        })
        builder.addCase(getRecords.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getRecords.pending, (state, action) =>
        {
            state.loading = true;
        })
        // post
        builder.addCase(createRecord.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.success = action.payload;
        })
        builder.addCase(createRecord.rejected, (state, action) =>
        {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createRecord.pending, (state, action) =>
        {
            state.loading = true;
        })
    }
})

export default recordsSlice.reducer