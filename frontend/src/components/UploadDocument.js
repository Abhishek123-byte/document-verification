import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocument } from "../redux/documentSlice";

const DocumentUpload = () => {
    const dispatch = useDispatch();
    const { document, loading, error } = useSelector((state) => state.document);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return alert("Please select a file");
        
        const formData = new FormData();
        formData.append("document", file);

        dispatch(uploadDocument(formData));
    };

    return (
        <div className="upload-container">
            <h2>Upload Document for Verification</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>

            {error && <p className="error">{error}</p>}

            {document && (
                <div className="document-preview">
                    <h3>Extracted Text:</h3>
                    <p>{document.extractedText}</p>
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;
