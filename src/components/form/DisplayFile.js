import React from "react";
import { Button } from "@chakra-ui/react"

function FilePreview({ uploadedFile }) {
  if (!uploadedFile || !uploadedFile.base64) {
    return null;
  }

  const { base64, name, type } = uploadedFile;

  return (
    <div>
      <p style={{ margin: "0 0 15px 0", color: "#555" }}>
        <strong>نام فایل:</strong> {name || "نامشخص"}
      </p>
      {type && type.startsWith("image/") ? (
        <div>
          
        </div>
      ) : (
        <div>
          <a href={base64} download={name || "file"}>
            <Button variant="outline" color="gray.600">
              دانلود
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default FilePreview;