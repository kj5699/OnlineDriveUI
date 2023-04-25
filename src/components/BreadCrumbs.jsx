import React from 'react'
import styles from '../pages/styles.module.scss';
const BreadCrumbs = ({paths, onItemClick}) => {
  return (
    <>
        {paths.map((pathItem, index) => {
            return ( 
              <>
                <div className={`${styles.breadCrumb}`} 
                      onClick={()=>onItemClick(pathItem)}>{pathItem.name}
                </div>
                {index < paths.length - 1 && <span className="mx-4"> {" / "}  </span>}
              </>
            );
          }
        )}
    </>
  )
}

export default BreadCrumbs