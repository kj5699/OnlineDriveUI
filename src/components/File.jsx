import Image from "next/image";
import React from "react";
import ContextMenuWrapper from "./ContextMenuWrapper/contextMenuWrapper";

function File({ file, onRename, onDelete, wrapperClass }) {
  const ext = file.name.split('.')[1];
  return (
    <ContextMenuWrapper id={`${file.id}_file`} item={file} onRename={onRename} onDelete={onDelete} className={'pb-4'}>
      <div className={wrapperClass}>
        <div className="relative mb-3">
          <Image src={"/assets/file.png"} width={96} height={96} alt=""></Image>
          {ext && 
            <div className="absolute top-3/4 left-1/4 bg-main-red text-main-white p-1 rounded text-2xs">
              {`.${ext}`}
            </div>
          }  
        </div>
        <div className="w-full text-center">{file.name}</div>
      </div>
    </ContextMenuWrapper>
  );
}
export default File;
