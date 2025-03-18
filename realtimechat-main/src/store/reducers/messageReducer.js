// Initial state
const initialState = {
    messages: [],
    loading: false,
    error: null,
    newMessages: [],
    unreadCount: 0
};

export const DELETE_ALL_MESSAGES = 'DELETE_ALL_MESSAGES'; // New action type

// Action Creator
export const deleteAllMessages = (selectedUserId) => ({
    type: DELETE_ALL_MESSAGES,
    payload: selectedUserId,
});

// Reducer
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ALL_MESSAGES:
            return {
                ...state,
                messages: state.messages.filter(
                    message => message.senderId !== action.payload && message.receiverId !== action.payload
                ),
            };
        // other cases...
        default:
            return state;
    }
};

export default messageReducer; // Ensure the reducer is exported
