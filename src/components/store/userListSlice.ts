import { createSlice } from "@reduxjs/toolkit";

interface UserListState {
  userList: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: string[];
  };
  isLoading: boolean;
}

const initialState: UserListState = {
  userList: {
    page: 1,
    per_page: 5,
    total: 0,
    total_pages: 0,
    data: [],
  },
  isLoading: false,
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setUserList, setLoading } = userListSlice.actions;
export default userListSlice.reducer;
