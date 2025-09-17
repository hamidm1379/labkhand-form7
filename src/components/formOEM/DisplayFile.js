import React from "react";
import { Button } from "@chakra-ui/react"

function FilePreview({ uploadedFile }) {
 

  const { base64, name } = uploadedFile;

  return (
    <div>
      <p style={{ margin: "0 0 15px 0", color: "#555" }}>
        <strong>نام فایل:</strong> {name || "نامشخص"}
      </p>
      <div>
        <a href={base64} download={name || "file"}>
          <Button variant="outline" color="gray.600">
            دانلود
          </Button>
        </a>
      </div>
    </div>
  );
}

export default FilePreview;