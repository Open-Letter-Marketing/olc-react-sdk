import React, { useEffect } from 'react';

// Toastify
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../redux/store';

// Actions
import { closeSnackbar } from '../../../redux/actions/snackbarActions';

// utils
import {MESSAGES} from '../../../utils/message';

// Components
import Typography from '../Typography';

// icon
import Cross from '../../../assets/images/modal-icons/cross'

// styles
import './styles.scss'


const GenericSnackbar:React.FC = () => {
    const open = useSelector(
      (state: RootState) => state.snackbarReducers.snackbar.open
    );

    const heading = useSelector(
      (state: RootState) => state.snackbarReducers.snackbar.heading
    );
    const message = useSelector(
      (state: RootState) => state.snackbarReducers.snackbar.message
    );

    const dispatch: AppDispatch = useDispatch();

    const Element = (
      <div className="toast-content">
        <Typography>{heading || 'Notifications'}</Typography>
        <Typography>{message || MESSAGES.GENERAL_ERROR}</Typography>
      </div>
    );

  const notify = () => toast(Element,{
    toastId: 'myToast'
  });

  useEffect(() =>{
    if(open){
        notify()
        dispatch(closeSnackbar())
    }
    toast.clearWaitingQueue({containerId: 'myToast'});
  }, [open])

  return (
    <ToastContainer
      limit={1}
      className="toast-container"
      toastClassName="basic-toast"
      bodyClassName="toast-body"
      hideProgressBar
      autoClose={3000}
      closeButton={<Cross toast={true} />}
      closeOnClick
    />
  );
}

export default GenericSnackbar;
