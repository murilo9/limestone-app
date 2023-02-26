import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "./api/createUser";
import { deleteUser } from "./api/deleteUser";
import { fetchMe } from "./api/fetchMe";
import { fetchUsers } from "./api/fetchUsers";
import { updateUser } from "./api/updateUser";
import { CreateUserDto } from "./types/dto/CreateUserDto";
import { UpdateUserDto } from "./types/dto/UpdateUserDto";
import { UserEntity } from "./types/User";

interface UsersState {
  entities: { [id: string]: UserEntity };
  currentUser: UserEntity | null;
  showCreateUserModal: boolean;
}

const initialState: UsersState = {
  entities: {},
  currentUser: null,
  showCreateUserModal: false,
};

export const onCreateUser = createAsyncThunk(
  "users/addUser",
  async (createUserForm: CreateUserDto) => {
    const createUserRes = await createUser(createUserForm);
    const createdUser = createUserRes.data;
    return createdUser;
  }
);
export const onFetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const fetchUsersRes = await fetchUsers();
  const users = fetchUsersRes.data;
  return users;
});
export const onUpdateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    userId,
    updateUserForm,
  }: {
    userId: string;
    updateUserForm: UpdateUserDto;
  }) => {
    const updateUserRes = await updateUser(userId, updateUserForm);
    const updatedUser = updateUserRes.data;
    return updatedUser;
  }
);
export const deactivateUser = createAsyncThunk(
  "users/deactivateUser",
  async (userId: string) => {
    await deleteUser(userId);
    return userId;
  }
);
export const onFetchCurrentUserData = createAsyncThunk(
  "users/onFetchCurrentUserData",
  async () => {
    console.log("dispatching");
    const fetchCurrentUserRes = await fetchMe();
    const currentUser = fetchCurrentUserRes.data;
    return currentUser;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersAdded(state, action) {},
    userUpdated(state, action) {},
    clearUsers(state, action) {},
    createUserModalChanged(state, action: PayloadAction<boolean>) {
      const showModal = action.payload;
      state.showCreateUserModal = showModal;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(onCreateUser.fulfilled, (state, action) => {
        const createdUser = action.payload;
        state.entities[createdUser._id] = createdUser;
      })
      .addCase(onFetchUsers.fulfilled, (state, action) => {
        const users = action.payload;
        users.forEach((user) => {
          state.entities[user._id] = user;
        });
      })
      .addCase(onUpdateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.entities[updatedUser._id] = updatedUser;
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        delete state.entities[deletedUserId];
      })
      .addCase(onFetchCurrentUserData.fulfilled, (state, action) => {
        const currentUser = action.payload;
        state.currentUser = currentUser;
      }),
});

export const { createUserModalChanged } = usersSlice.actions;

export default usersSlice.reducer;
