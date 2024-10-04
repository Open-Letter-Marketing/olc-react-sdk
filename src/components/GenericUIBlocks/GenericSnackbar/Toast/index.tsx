import React, {useEffect, useState} from 'react';

// Action
import {CLEAR_SNACKBAR} from '../../../../redux/actions/action-types';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../redux/store';

// utils
import {MESSAGES} from '../../../../utils/message';

// icon
import Cross from '../../../../assets/images/modal-icons/cross';

// styles
import './styles.scss';

const GenericSnackbar = () => {
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

  const snackbar = useSelector((state: any) => state.snackbarReducers.snackbar); // Adjust this based on your root reducer

  const Toast: React.FC<{
    snackMessage: string;
    snackHeading: string;
    type: 'success' | 'error';
    onClose: () => void;
    onPauseHover: boolean;
  }> = ({snackMessage, snackHeading, type, onClose, onPauseHover}) => {
    const [animateOut, setAnimateOut] = useState(false); // Control when to start exit animation

    useEffect(() => {
      // Automatically trigger exit after 3 seconds
      const autoCloseTimer = setTimeout(() => {
        setAnimateOut(true); // Start exit animation
        dispatch({type: CLEAR_SNACKBAR});
      }, 3000);

      // Fully remove the toast after exit animation finishes
      const removeTimer = setTimeout(() => {
        onClose();
      }, 3500); // 3.5s allows the exit animation to complete

      return () => {
        clearTimeout(autoCloseTimer);
        clearTimeout(removeTimer);
      };
    }, [open, onClose]);

    return (
      <div className={`toast ${type} ${animateOut ? 'slideOut' : 'slideIn'}`}>
        <div className="toastContent">
          <span>{snackHeading || 'Notifications'}</span>
          <p>{snackMessage || MESSAGES.GENERAL_ERROR}</p>
        </div>
        <button className="closeIcon" onClick={onClose}>
          <Cross toast={true} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={`toast-container ${!open && 'noToast'}`}>
        {open && (
          <Toast
            snackMessage={message}
            snackHeading={heading}
            type={snackbar.status}
            onClose={() => dispatch({type: CLEAR_SNACKBAR})}
            onPauseHover={true}
          />
        )}
      </div>
    </>
  );
};

export default GenericSnackbar;
