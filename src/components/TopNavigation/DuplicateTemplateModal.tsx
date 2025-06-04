import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';

// Actions
import {failure} from '../../redux/actions/snackbarActions';

// Utils
import {MESSAGES} from '../../utils/message';

// UI Blocks
import Dialog from '../GenericUIBlocks/Dialog';
import Input from '../GenericUIBlocks/Input';

interface DuplicateTemplateModalProps {
  open: boolean;
  value: string;
  setIsDuplication: any;
  onChange: (value: string) => void;
  onCancel: () => void;
  onDuplicateTemplate?: (payload: any) => Promise<any>;
  title: string;
  submitButtonText: string;
  icon: React.ReactNode;
  error: string;
}

const DuplicateTemplateModal: React.FC<DuplicateTemplateModalProps> = ({
  open,
  value,
  setIsDuplication,
  onChange,
  onCancel,
  onDuplicateTemplate,
  title,
  submitButtonText,
  icon,
  error,
}) => {
  if (!open) return null;

  const saveDialogStyles = {
    maxWidth: '480px',
    minHeight: error ? '380px' : '360px',
  };

  const noteStyle = {
    fontSize: '12px',
    color: "#000",
    fontWeight: '400',
    marginTop: '5px',
  }

  const [loader, setLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const duplicateTemplate = async () => {
    try {
      setLoader(true);
      if (onDuplicateTemplate) {
        setIsDuplication(true);
        await onDuplicateTemplate(value);
        onCancel();
      }
    } catch (error) {
      dispatch(failure(MESSAGES.CLONE_ERROR));
      return error;
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog
      icon={icon}
      loading={loader}
      open={open}
      handleClose={onCancel}
      title={title}
      cancelText={MESSAGES.TEMPLATE.SAVE.CANCEL_BUTTON}
      submitText={submitButtonText}
      customStyles={saveDialogStyles}
      onSubmit={duplicateTemplate}
      onCancel={onCancel}
      subHeading={MESSAGES.TEMPLATE.DUPLICATE_MODAL.SUB_HEADING}
      description={MESSAGES.TEMPLATE.DUPLICATE_MODAL.DESCRIPTION}
      children={
        <div style={{width: '100%'}}>
          <Input
            type="text"
            placeholder={MESSAGES.TEMPLATE.DUPLICATE_MODAL.NAME_PLACEHOLDER}
            value={value}
            error={error}
            onChange={(e) => onChange(e.target.value)}
          />
          <div style={noteStyle}>{MESSAGES.TEMPLATE.DUPLICATE_MODAL.NOTE}</div>
        </div>
      }
    />
  );
};

export default DuplicateTemplateModal;
