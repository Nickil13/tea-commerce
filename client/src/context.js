import React, { useState, useContext} from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    const [isAlertShowing,setIsAlertShowing] = useState(false);
    const [alertContent,setAlertContent] = useState({});
    const [isDeleteConfirmationShowing, setIsDeleteConfirmationShowing] = useState(false);
    const [deleteConfirmationInfo, setDeleteConfirmationInfo] = useState({});


    const showAlert = (name,alertType,qty) =>{
        setIsAlertShowing(true);
        setAlertContent({name,alertType, qty});
    }
    const closeAlert = () =>{
        setIsAlertShowing(false);
        setAlertContent("");
    }
    const closeSidebar = () =>{
        setIsSidebarOpen(false);
        document.body.style.overflow = "visible";
    }

    const openSidebar = () =>{
        setIsSidebarOpen(true);
        document.body.style.overflow = "hidden";
    }

    const showDeleteConfirmation = (id, name, subject) =>{
        setIsDeleteConfirmationShowing(true);
        setDeleteConfirmationInfo({id,name,subject});
    }
    const closeDeleteConfirmation = () =>{
        setIsDeleteConfirmationShowing(false);
        setDeleteConfirmationInfo("");
    }
    
    return <AppContext.Provider 
    
    value=
    {{
        isSidebarOpen,
        closeSidebar,
        openSidebar,
        isAlertShowing,
        showAlert,
        closeAlert,
        alertContent,
        isDeleteConfirmationShowing,
        showDeleteConfirmation,
        closeDeleteConfirmation,
        deleteConfirmationInfo
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}