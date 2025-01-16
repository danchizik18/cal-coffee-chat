import React, { useEffect } from "react";
import { useState } from "react";
import { db, auth } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { message, Table, Button } from 'antd';
import { useNavigate } from "react-router-dom";

function File() {
  const pastTextsRef = collection(db, 'past-texts');
  const [files, setFiles] = useState([]);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async() => {
      if (!currentUser) {
        message.error("No user is logged in");
        return;
      }

      try {
        const data = await getDocs(pastTextsRef);
        const userFiles = data.docs
          .map((doc) => doc.data())
          .filter((doc) => doc.userId === currentUser.uid);
      
        setFiles(userFiles);

      } catch (err) {
        console.error(err);
        console.message("Error getting documents");
      }
    };
    fetchDocuments();
  }, [currentUser]);

  const handleTranscribe = (file) => {
    console.log("Transcribing file:", file);
    message.success(`Transcribing file: ${file.file}`);
    navigate('/transcribe', { state: { file } });  // Passing file as state to the next page
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'File Name',
      dataIndex: 'file',
      key: 'file',
      render: (fileName, record) => (
        <div>
          {fileName}  {/* Display the file name */}
          <Button 
            onClick={() => handleTranscribe(record)}  // Pass the full file object to the handleTranscribe function
            style={{
              marginLeft: 8,
              padding: '4px 10px',  // Adjust padding to be smaller for a narrower button
              fontSize: '12px',      // Make text smaller
              width: 'auto',         // Allow the button to shrink based on content
              display: 'inline-block',  // Prevent the button from expanding unnecessarily
              minWidth: '80px',      // Set a minimum width if necessary
            }}  
            type="primary"
          >
            <span>Transcribe <i className="fa-solid fa-pen-fancy"></i></span>
          </Button>
        </div>
      ),
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text.seconds * 1000).toLocaleString(),  // Convert Firestore timestamp to readable format
    },
  ];

  return (
    <div>
      <h1>Past Files</h1>
      <Table 
        dataSource={files} 
        columns={columns} 
        rowKey="file"  // Unique key for each row
      />
    </div>
  );
}

export default File;
