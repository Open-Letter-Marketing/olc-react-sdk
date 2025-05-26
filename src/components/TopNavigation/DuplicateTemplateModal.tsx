import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

// Actions
import { failure } from "../../redux/actions/snackbarActions";

// Utils
import { MESSAGES } from "../../utils/message";

// Componennts
import CircularProgress from "../GenericUIBlocks/CircularProgress";

// UI Blocks
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";


const buttonStyles: React.CSSProperties = {
    maxWidth: "120px",
    minHeight: "40px",
    backgroundColor: "#fff",
    color: "var(--text-color)",
    border: "0.5px solid var(--border-color)",
    fontSize: "15px",
    fontWeight: "500",
};

const progressStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
    border: '2px solid white',
};

interface DuplicateTemplateModalProps {
    open: boolean;
    value: string;
    onChange: (value: string) => void;
    onCancel: () => void;
    onDuplicateTemplate?: (payload: any) => Promise<any>;
}

const DuplicateTemplateModal: React.FC<DuplicateTemplateModalProps> = ({
    open,
    value,
    onChange,
    onCancel,
    onDuplicateTemplate,
}) => {
    if (!open) return null;

    const [loader, setLoader] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    const duplicateTemplate = async () => {
        try {
            setLoader(true);
            if (onDuplicateTemplate) {
                await onDuplicateTemplate(value);
            }
        } catch (error) {
            dispatch(failure(MESSAGES.CLONE_ERROR))
            return error;
        } finally {
            setLoader(false);
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 8,
                    padding: 24,
                    minWidth: 320,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <Typography style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
                    {MESSAGES.TEMPLATE.DUPLICATE_MODAL.TITLE}
                </Typography>
                <input
                    type="text"
                    placeholder={MESSAGES.TEMPLATE.DUPLICATE_MODAL.NAME_PLACEHOLDER}
                    style={{
                        padding: 8,
                        fontSize: 16,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        marginBottom: 8,
                    }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    <Button
                        style={{
                            ...buttonStyles,
                            minWidth: 80,
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #ccc",
                        }}
                        onClick={onCancel}
                    >
                        {MESSAGES.TEMPLATE.DUPLICATE_MODAL.CANCEL_BUTTON}
                    </Button>
                    <Button
                        style={{
                            ...buttonStyles,
                            minWidth: 80,
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            border: "none",
                        }}
                        onClick={duplicateTemplate}
                        disabled={!value || loader}
                    >
                        {loader ? <CircularProgress style={progressStyles} /> :
                            MESSAGES.TEMPLATE.DUPLICATE_MODAL.SUBMIT_BUTTON}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DuplicateTemplateModal;
