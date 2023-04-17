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

export const deleteRecord = createAsyncThunk(
    'deleteRecord',
    async (mockupId) =>
    {
        try {
            const response = await fetch(`https://63d78ffe5c4274b136f6a651.mockapi.io/items/${mockupId}`, {
                method: 'DELETE'
            });
            // console.log('response:', response);
            if (response.status === 200) {
                const data = await response.json();
                return "Успешно удалено";
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const recordsSlice = createSlice({
    name: 'recordsSlice',
    initialState: {
        records: [],
        loading: false,
        delLoading: false,
        delMessage: null,
        delError: null,
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
        // delete
        builder.addCase(deleteRecord.pending, (state, action) =>
        {
            state.delLoading = true;
        })
        builder.addCase(deleteRecord.fulfilled, (state, action) =>
        {
            state.delLoading = false;
            state.delMessage = action.payload
        })
        builder.addCase(deleteRecord.rejected, (state, action) =>
        {
            if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
            else state.delError = action.error
            state.delLoading = false;
        })
    }
})

export default recordsSlice.reducer