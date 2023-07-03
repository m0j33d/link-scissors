const NotFound = () => {
  return (
    <>   
     <div className='text-9xl text-center flex flex-col h-screen py-12 font-extrabold'> 
        <span> 404 </span>
        <a className="text-base font-light underline hover:text-blue-500 my-6" href='/'> &#8592; go back to LinkScissor </a>
     </div>
    </>
  );
};

export default NotFound;