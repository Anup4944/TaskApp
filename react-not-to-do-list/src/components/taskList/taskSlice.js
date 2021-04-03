import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskLists: [],
    notToDoLists: [],
    itemToDelete: [],
    notToDoItemToDelete: [],
    //setItemToDelete:[],
    totalHrs: 0,
    isPending: false,
    status: "",
    message:""
}

const taskSlice= createSlice({
    name : "task",
    initialState,
    reducers: {
    requestPending: (state) =>{
        state.isPending = true;
    },

    addTaskSuccess: (state, {payload}) =>{
        state.isPending = false;
        state.status = payload.status;
        state.message  = payload.message;
    },

    fetchTaskSucess: (state, {payload}) => {
        state.isPending = false;
        console.log(payload)
        state.totalHrs = payload.reduce((subTtl,row) => subTtl + row.hr, 0)
        state.taskLists = payload.filter(row => row.todo);
        
        state.notToDoLists = payload.filter(row => !row.todo);
      
        
    },

    updateTaskSuccess: (state, {payload}) => {
        state.isPending = false;
        state.status = payload.status;
        state.message  = payload.message;

    },

    requestFail: (state, {payload}) => {
        state.isPending = false;
        state.status= "error"
        state.message = payload;
    },

    deleteTaskSuccess: (state, {payload}) => {
        state.isPending = false;
        state.status = payload.status;
        state.message  = payload.message;
        if (payload.status === "success") state.itemToDelete = [];

    },

    setItemToDelete: (state, {payload:{checked, value}}) => {

       
        // add id in the array list
        if(checked){
        state.itemToDelete = [...state.itemToDelete,value];
    }else{
        // remove from array
        const newlist = state.itemToDelete.filter(item=> item != value)
        state.itemToDelete = newlist;
    }

    }   
    //setNotToDeleteItemToDelete: () => {},
    
} 
});

 


const {reducer,actions} = taskSlice;
export const {requestPending, addTaskSuccess, fetchTaskSucess , requestFail, updateTaskSuccess, taskSwitch,setItemToDelete,
    deleteTaskSuccess} = actions;
export default reducer;