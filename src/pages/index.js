import Image from "next/image";
import styles from "./styles.module.scss";
import { useState, useCallback } from "react";
import Folder from "@/components/Folder";
import File from "@/components/File";
import ModalForm from "@/components/ModalForm/ModalForm";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NEW_OPTIONS } from "@/constants/constant";

const initialFolder = { id: 1, name: "My Drive" };
const initialFolders = [
  { id: 1, name: "My Drive", parentId: null },
  { id: 2, name: "Folder 1", parentId: 1 },
  { id: 3, name: "Folder 2", parentId: 1 },
  { id: 4, name: "Folder 1", parentId: 2 },
  { id: 5, name: "Folder 5", parentId: 4 },
  { id: 6, name: "Folder 3", parentId: 1 },
  { id: 7, name: "Folder 4", parentId: 1 },
  { id: 8, name: "Folder 5", parentId: 1 },
];
const initialFiles = [
  { id: 1, name: "File 1", parentId: 2 },
  { id: 2, name: "File 2", parentId: 2 },
  { id: 3, name: "File 3", parentId: 3 },
  { id: 4, name: "Pdf File.pdf", parentId: 1 },
];

const OnlineDrive = () => {
  const [currentFolder, setCurrentFolder] = useState(initialFolder);
  const [currentPath, setCurrentPath] = useState([initialFolder]);
  const [folders, setFolders] = useState(initialFolders);
  const [files, setFiles] = useState(initialFiles);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formError, setFormError]=useState(null);
  const [newOption, setNewOption] = useState(NEW_OPTIONS.file);

  const generateContentForCurrentFolder = useCallback(() => {
    const currentFiles = files
      .filter((item) => item.parentId === currentFolder.id)
      .map((item) => ({ ...item, type: NEW_OPTIONS.file }));
    const currentFolders = folders
      .filter((item) => item.parentId === currentFolder.id)
      .map((item) => ({ ...item, type: NEW_OPTIONS.folder }));
    const listOfItems = [...currentFiles, ...currentFolders].sort(
      (a, b) => a.name > b.name
    );
    return listOfItems;
  }, [currentFolder, files, folders]);

  const browseFolder = (folder) => {
    let folderIndex = currentPath.findIndex(item => item.id === folder.id);
    if(folderIndex !== -1){
      setCurrentPath(prev => {
        let result =  [...prev]
        result = result.splice(0, folderIndex+1)
        return result
      })
    }else{
      setCurrentPath(prev => [...prev, folder]);
    }
    setCurrentFolder(folder);
  };

  const createFolder = (name, parentId) => {
    return new Promise((resolve,reject) => {
      const folderNameExist = folders.findIndex(item => (item?.name === name && item.parentId === parentId)) !== -1;
      if(!name || name===''){
        reject({message: 'Folder name cannnot be empty'})
      }else if(!folderNameExist){
        const newFolder = {
          id: folders.length + 1,
          name,
          parentId: parentId || currentFolder?.id,
        };
        setFolders([...folders, newFolder]);
        resolve();

      }else{
        reject({message: 'Folder name already exist.'})
      }
    })
  };

  const createFile = (name, parentId) => {
    return new Promise((resolve,reject) => {
      const fileNameExist = files.findIndex(item => (item?.name === name && item.parentId === parentId)) !== -1 ;
      if(!name || name===''){
        reject({message: 'File name cannnot be empty'});
      }else if(!fileNameExist){
          const newFile = {
            id: files.length + 1,
            name,
            parentId: parentId || currentFolder?.id,
          };
          setFiles([...files, newFile]);
        resolve();
      }else{
        reject({message: 'File name already exist.'})
      }
    })
  };

  const deleteFolder = (id) => {
    return new Promise((resolve, reject)=>{
      setFolders(folders.filter((folder) => folder.id !== id));
      setFiles(files.filter((file) => file.parentId !== id));
      resolve();
    })
  };

  const deleteFile = (id) => {
    return new Promise((resolve, reject)=>{
      setFiles(files.filter((file) => file.id !== id));
      resolve();
    })
  };

  const renameFile = async(id, name) => {
    const fileNameExist = files.findIndex(item => (item?.name === name && id !== item.id && item.parentId === currentFolder.id)) !== -1 ;
    return new Promise((resolve, reject)=>{
      const fileNameExist = files.findIndex(item => (item?.name === name && id !== item.id && item.parentId === currentFolder.id)) !== -1 ;
      if(!name || name===''){
        reject({message: 'File name cannnot be empty'})
      }else if(!fileNameExist){
        setFiles(
          files.map((file) => {
            if (file.id === id) {
              return { ...file, name };
            }
            return file;
          })
        );
        resolve()
      }else{
        reject({message: 'File name already exist.'})
      }
    })
  };

  const renameFolder = (id, name) => {
    return new Promise((resolve, reject)=>{
      const folderNameExist = folders.findIndex(item => { 
        return(item?.name === name && id !== item.id && item.parentId === currentFolder.id)
      }) !== -1;
      if(!name || name===''){
        reject({message: 'Folder name cannnot be empty'})
      }else if(!folderNameExist){
        setFolders(
          folders.map((folder) => {
            if (folder.id === id) {
              return { ...folder, name };
            }
            return folder;
          })
        );
        resolve()
      }else{
        reject({message: 'Folder name already exist.'})
      }
    })
  };
  const goToParentFolder = () => {
    if(currentFolder.parentId){
      let parentFolderIndex = folders.findIndex(item => item.id === currentFolder.parentId)
      if(parentFolderIndex !== -1){
        setCurrentFolder(folders[parentFolderIndex]);
      }
      setCurrentPath(prev => {
        let updatedPath = [...prev];
        updatedPath.splice(-1,1)
        return updatedPath;
      }
      );
    }
  };

  const createNewHandler = (name) => {
    if (newOption === NEW_OPTIONS.file){
      createFile(name, currentFolder.id).then(()=>{
        setCreateModalOpen(false);
      }).catch(err=>{
        setFormError(err.message)
      })
    }else{
      createFolder(name, currentFolder.id).then(()=>{
        setCreateModalOpen(false);
      }).catch(err=>{
        setFormError(err.message)
      })
    }
  };

  return (
    <div className={styles.container}>
      <div id="Header" className={`${styles.header}`}>
        <div className={`${styles.backIcon} mr-6`} onClick={goToParentFolder}>
          <Image src='/assets/arrow_up.png' 
                alt='' width={32} height={32} 
                className=" -rotate-90 hover:w-9 hover:h-9"
          ></Image>
        </div>
        <BreadCrumbs paths={currentPath} onItemClick={browseFolder} />
      </div>
      <div id='DriveContent' className={styles.driveContent}>
        {generateContentForCurrentFolder().map((item,index) => {
          return item.type === NEW_OPTIONS.folder ? (
            <Folder 
                  key={index}
                  folder={item} 
                  onFolderOpen = {browseFolder} 
                  onRename={renameFolder} 
                  onDelete={deleteFolder} 
                  wrapperClass={styles.itemWrapper} 
              />
          ) : (
            <File 
                key={index}
                file={item} 
                onRename={renameFile} 
                onDelete={deleteFile} 
                wrapperClass={styles.itemWrapper}>
           </File>
          );
        })}
        <div className={styles.itemWrapper} onClick={()=> setCreateModalOpen(true)}>
          <Image alt='Add Icon' src={'/assets/add_new_button.png'} width={90} height={90}/> 
        </div>
      </div>

      <ModalWrapper isOpen={createModalOpen} onClose={()=> setCreateModalOpen(false)} label={'Create New'}>
        <>
          <div className={styles.createNewOptions}>
            <div 
              className={`${newOption===NEW_OPTIONS.file? 'bg-main-blue':''} ${styles.newOption}`} 
              onClick={()=> setNewOption(NEW_OPTIONS.file)}
            > File </div>
            <div 
              className={`${newOption===NEW_OPTIONS.folder? 'bg-main-blue':''} ${styles.newOption}`}
              onClick={()=> setNewOption(NEW_OPTIONS.folder)}> Folder </div>
          </div>
          <ModalForm 
            buttonLabel={'Create'} 
            onSubmit={createNewHandler} 
            initialValue={''} error={formError} 
            setFormError={setFormError}
            placeHolder = {newOption===NEW_OPTIONS.folder ?'New Folder Name': 'New File Name'}
          />
        </>
      </ModalWrapper>
    </div>
  );
};

export default OnlineDrive;
