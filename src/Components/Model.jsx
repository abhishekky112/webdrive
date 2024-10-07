import react, { useEffect } from 'react'
export const Model=({children,close})=>{

    return(
        <>  
            <div className='fixed max-w-screen max-h-screen h-full w-full overflow-hidden
             bg-black left-0 bg-opacity-75 top-0 flex flex-col items-center justify-center'>
                
                <div style={{animation:'zoomout', animationDuration:'.3s'}} className='md:max-h-[95%] overflow-hidden h-full w-full flex-1  md:max-w-[95%] text-white  '>
                    <span onClick={()=>{close(false);}} className='  relative top-3 right-3 float-right   '><button className="active:scale-100 scale-125 transition-all material-symbols-outlined bg-[#005e94] rounded-full">cancel</button></span>
                  
                    {children}
                </div>                
            </div>
           
        </>
    );
}