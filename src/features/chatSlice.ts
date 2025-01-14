import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const CONVERSATION_ENDPOINT = `${
  import.meta.env.VITE_BASE_URL_API
}/conversation` as string;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],
};

// get conversation
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token: any, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "get",
        url: `${CONVERSATION_ENDPOINT}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

// open and create conversation
export const openCreateConversation = createAsyncThunk(
  "conversation/openCreate",
  async (values: any, { rejectWithValue }) => {
    const { token, receiverId } = values;
    try {
      const res = await axios({
        method: "post",
        url: `${CONVERSATION_ENDPOINT}`,
        data: { receiverId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

// get conversation messages
export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values: any, { rejectWithValue }) => {
    const { token, conversationId } = values;
    try {
      const res = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/message/${conversationId}`,
        data: { convoId: conversationId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

// send messages
export const sendMessage = createAsyncThunk(
  "message/send",
  async (values: any, { rejectWithValue }) => {
    const { token, message, convoId, files } = values;
    try {
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL_API}/message`,
        data: { message, convoId, files },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessages: (state, action) => {
      const message: [never] = [
        ...(state.messages as never),
        action.payload.message,
      ];

      const result: any = state.conversations.find((item: any) => {
        return item._id === action.payload.message.conversation._id;
      });

      if (!result) return;

      let conversation = {
        ...action.payload.conversation,
        latest_message: action.payload.message,
      };

      let newConvos: any = state.conversations.filter(
        (c: any) => c._id !== (action.payload.conversation._id as any)
      );

      newConvos.unshift(conversation);
      state.conversations = newConvos;

      const convo: any = state.activeConversation;
      if (action.payload.message.conversation._id !== convo._id) return;
      state.messages = message as never;
    },
  },
  // get conversation
  extraReducers(builder) {
    builder.addCase(getConversations.pending, (state, _action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.conversations = action.payload;
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      state.status = "loading";
      state.error = action.payload as string;
    });
    // open create conversation
    builder.addCase(openCreateConversation.pending, (state, _action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(openCreateConversation.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.activeConversation = action.payload;
    });
    builder.addCase(openCreateConversation.rejected, (state, action) => {
      state.status = "loading";
      state.error = action.payload as string;
    });
    // get conversation message
    builder.addCase(getConversationMessages.pending, (state, _action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(getConversationMessages.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
    });
    builder.addCase(getConversationMessages.rejected, (state, action) => {
      state.status = "loading";
      state.error = action.payload as string;
    });
    // send message
    builder.addCase(sendMessage.pending, (state, _action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const value: never[] = [...state.messages as never, action.payload as never];
      state.status = "succeeded";
      state.messages = value;
      let conversation = {
        ...action.payload.conversation,
        latest_message: action.payload,
      };

      let newConvos: any = state.conversations.filter(
        (c: any) => c._id !== (conversation._id as any)
      );

      newConvos.unshift(conversation);
      state.conversations = newConvos;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.status = "loading";
      state.error = action.payload as string;
    });
  },
});

export const { updateMessages, setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
