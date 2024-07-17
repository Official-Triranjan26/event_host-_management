import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const showToastMessage = (state,s) => {
    if(state ==='warn'){
      return toast.warn(s, {
        position: "bottom-center"
      });
    }
    else if(state ==='error'){
      return toast.error(s, {
        position: "bottom-center"
      });
    }
    else if(state ==='success'){
      return toast.success(s, {
        position: "bottom-center"
      });
    }
  }

  export default showToastMessage;