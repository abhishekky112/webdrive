import classNames from 'classnames';
import React,{useState} from 'react'

const Links = ({data,deleteLink,view}) => {
  const [showdesc,setshowdesc]=useState(false);
  const d=new Date(data.createdAt.seconds*1000);

  return (
    <div className={classNames(' bg-black overflow-auto m-2 p-2 rounded-md ',{'max-w-96':view=="grid"})}>
      <div className='flex flex-wrap justify-between gap-4'>
          <a className='w-fit hover:text-blue-500 underline decoration-blue-700 ' href={data.url}>{data.title}</a>
          <article className='w-full sm:w-fit justify-center text-[0.8rem] font-light gap-2 flex'>
          <button onClick={()=>deleteLink("notpath",data.id)} className="text-red-500 material-symbols-outlined">Delete</button>
          <span className=''>{ d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear() }</span>
              <span>{d.getHours()+":"+d.getMinutes()}</span>
              <button className=' float-right bg-primary2 text-black h-fit px-2 rounded-md active:bg-white' onClick={()=>setshowdesc(!showdesc)}>show</button>
          </article>
          
      </div>
      <div className='bg-white text-black'>
        {showdesc && <p>{data.description}</p>}
      </div>
    </div>
  )
}

export default Links