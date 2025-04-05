import React, { useState } from 'react'
import authServices from '../services/authServices';

const ForgotPassword = () => {

    const [mailId,setMailId] = useState('');
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
          const response = await authServices.forgot_password({ mailId });

          if (response.status === 200) {
              alert(response.data.message);


              // setTimeout(() => {
              //     navigate('/login');
              // }, 500);
          }
      } catch (error) {
          alert(error.response.data.message);
      }
       
    }
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className='text-3xl font-bold'>Forgot Password</h1>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input name="email" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" value={mailId} onChange={(e)=>setMailId(e.target.value)} />
            </div>
            

            
          </div>

          <div className="!mt-12">
            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handleSubmit}>
              Send Email
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
