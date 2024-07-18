import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext( { loaded: false } );
function UploadImage ( { uwConfig, setPublicId } )
{
  const [ loaded, setLoaded ] = useState( false );

  useEffect( () =>
  {
    // Check if the script is already loaded
    if ( !loaded )
    {
      const uwScript = document.getElementById( "uw" );
      if ( !uwScript )
      {
        // If not loaded, create and load the script
        const script = document.createElement( "script" );
        script.setAttribute( "async", "" );
        script.setAttribute( "id", "uw" );
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener( "load", () => setLoaded( true ) );
        document.body.appendChild( script );
      } else
      {
        // If already loaded, update the state
        setLoaded( true );
      }
    }
  }, [ loaded ] );

  const initializeCloudinaryWidget = () =>
  {
    if ( loaded )
    {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        ( error, result ) =>
        {
          if ( !error && result && result.event === "success" )
          {
            console.log( "Done! Here is the image info: ", result.info );
            setPublicId( result.info.public_id );
          }
        }
      );

      document.getElementById( "upload_widget" ).addEventListener(
        "click",
        function ()
        {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className=" bg-secondary h-20 rounded-2xl px-2 text-white placeholder:pt-2 overflow-y-scroll flex justify-center items-center"
        onClick={initializeCloudinaryWidget}
      >
        <UploadIcon />
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadImage;
export { CloudinaryScriptContext };
function UploadIcon ( props )
{
  return (
    <svg {...props} width="50%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14V8.5C12 7.67157 12.6716 7 13.5 7C14.3284 7 15 7.67157 15 8.5V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10M8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}