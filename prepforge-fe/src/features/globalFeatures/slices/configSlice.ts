import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
    currentItem: string;
    currentMetric: string;
    isDarkTheme: boolean;
}

// Define the initial state with types
const initialState: ConfigState = {
    currentItem: "dashboard",
    currentMetric: "",
    isDarkTheme: false,
};

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setCurrentItem: (state, action: PayloadAction<string>) => {
            state.currentItem = action.payload;
        },
        setCurrentMetric: (state, action: PayloadAction<string>) => {
            state.currentMetric = action.payload;
        },
        toggleCurrentTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
        }
    },
});

// Export actions and reducer
export const {
    setCurrentItem,
    setCurrentMetric,
    toggleCurrentTheme,
} = configSlice.actions;

export default configSlice.reducer;
