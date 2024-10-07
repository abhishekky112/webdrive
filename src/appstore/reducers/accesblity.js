import { createSlice } from "@reduxjs/toolkit";

const tools=createSlice({
    name:'tools',
    initialState:{
        mode:'dark',
        isModelopen:true,
        showMode:'grid',
        isSidebaropen:true
    },
    reducers:{
        setMode:function(state,action){
            state.mode=action.payload;
        },
        toggleMode:function(state,action){
            state.mode=state.mode=='dark'?'light':'dark';
        },
        setModel:function(state,action){
            state.isModelopen=action.payload;
        },
        setshowMode:function(state,action){
            state.showMode=action.payload;
        },
        setSideBar:function(state,action){
            state.isSidebaropen=action.payload;
        }
    }

});

export const {setMode,toggleMode,setModel,setshowMode,setSideBar}= tools.actions;
export default tools.reducer;