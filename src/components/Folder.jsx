import Image from "next/image";
import React from "react";
import ContextMenuWrapper from "./ContextMenuWrapper/contextMenuWrapper";

function Folder({ folder, onFolderOpen, onRename, onDelete, wrapperClass }) {
  const onDoubleClick = (event, folder) => {
    if(event.detail === 2 ){
      onFolderOpen(folder)
    }
  }

  return (
    <>
    <ContextMenuWrapper id={`${folder.id}_folder`} item={folder} onRename={onRename} onDelete={onDelete}>
      <div className={wrapperClass}
        onClick={(event) => onDoubleClick(event, folder)} >
        <div className="mb-3">
          <Image src={"/assets/folder.png"} width={96} height={96} alt=''></Image>
        </div>
        <div className="w-full text-center">{folder.name}</div>
      </div>
    </ContextMenuWrapper>

    </>
  );
}

export default Folder;
