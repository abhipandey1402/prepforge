import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface LoginPayload {
    email: string;
    password: string;
}

interface RegistrationPayload {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

interface UserData {
    id: string;
    fullName: string;
    email: string;
    username: string;
    accessToken: string;
}

interface AuthState {
    userData: UserData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const performLogin = createAsyncThunk<UserData, LoginPayload>(
    'auth/performLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/users/login`, { email, password });

            if (response.data?.statusCode > 300) {
                return rejectWithValue(response.data);
            }
            return response.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const performRegistration = createAsyncThunk<UserData, RegistrationPayload>(
    'auth/performRegistration',
    async ({ fullName, email, username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/users/register`, {
                fullName,
                email,
                username,
                password,
            });

            if (response.data?.statusCode > 300) {
                return rejectWithValue(response.data);
            }
            return response.data?.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState: AuthState = {
    userData: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userData = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(performLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(performLogin.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.userData = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(performLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(performRegistration.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(performRegistration.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.userData = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(performRegistration.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
