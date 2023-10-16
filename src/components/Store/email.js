import { createSlice } from "@reduxjs/toolkit";

const initialState={inbox:[],sentMail:[]}
const emailSlice=createSlice({
    name:'Email',
    initialState:initialState,
    reducers:{
        setInbox(state,action){
            state.inbox=action.payload
        },
        setSentMail(state,action){
            // const values=Object.values(action.payload)
            // const keys=Object.keys(action.payload)
            // state.sentMail.push(action.payload);
            state.sentMail=action.payload
        },
        deleteInbox(state,action){
            const newInbox=state.inbox.filter((obj)=>{
                return obj[0] !==action.payload;
            })
            state.inbox=newInbox
        }
    }

})

export const emailActions=emailSlice.actions;
export default emailSlice.reducer;