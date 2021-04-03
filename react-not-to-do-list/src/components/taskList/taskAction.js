
import {requestPending, addTaskSuccess, fetchTaskSucess, requestFail, updateTaskSuccess,deleteTaskSuccess  } from "./taskSlice";
import { createTask, deleteTaskLists, getTaskLists, switchTask} from "../../api/taskApi.js";

export const addTask = frmDt => async dispatch => { // high arrow function
    try {
        // call api to send data
        dispatch(requestPending());
        const result = await createTask(frmDt);
       console.log(result)
        dispatch(addTaskSuccess(result));

        result.status = "success" && dispatch(fetchTaskLists())
       


    } catch (error) {
        dispatch(requestFail(error.message));
        
    }

}

 export const fetchTaskLists = ()=> async dispatch =>{
    try {
        dispatch(requestPending());
        const taskArg = await getTaskLists() || [];

      
        dispatch(fetchTaskSucess(taskArg));
        
    } catch (error) {
        console.log('from action', error)
        dispatch(requestFail(error.message));
        
    }


}

export const taskSwitch = toUdpate => async dispatch => {
    try {
      const result = await switchTask(toUdpate);
      dispatch(updateTaskSuccess(result));
      result.status = "success" && dispatch(fetchTaskLists())
        
    } catch (error) {
        dispatch(requestFail(error.message));
        
    }
}

export const deleteTask= (ids) => async dispatch => {
    try {
       if(window.confirm("are you sure you want to delete the selected items?"))
       {
        dispatch(requestPending());
        
        const result = await deleteTaskLists(ids);
        dispatch(deleteTaskSuccess(result));

        result.status = "success" && dispatch(fetchTaskLists())
       }
        
    
    }catch (error) {
        dispatch(requestFail(error.message));
        
    }
}