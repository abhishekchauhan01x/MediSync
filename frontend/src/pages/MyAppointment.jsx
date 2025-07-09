import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../assets/assets';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])
  const [payAtVisitClicked, setPayAtVisitClicked] = useState({})
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const handlePayAtVisit = (appointmentId) => {
    toast.success('Fee will be paid at the time of visit')
    setPayAtVisitClicked(prev => ({ ...prev, [appointmentId]: true }))
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()

    }
  }, [token])


  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b ">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt={`${item.docData.name} profile`}
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold ">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs ">{item.docData.address.line1}</p>
              <p className="text-xs ">{item.docData.address.line2}</p>
              <p className="text-xs mt-1 "><span className="text-sm  text-neutral-700 font-medium">Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 justify-end">
              {item.isCompleted ? (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 cursor-default'>
                  Completed
                </button>
              ) : item.cancelled ? (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 cursor-default'>
                  Appointment Cancelled
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => handlePayAtVisit(item._id)}
                    className={`text-sm text-center sm:min-w-48 py-2 border rounded transition-all duration-300 ${
                      payAtVisitClicked[item._id] 
                        ? 'border-blue-500 text-blue-500 cursor-default' 
                        : 'text-stone-500 hover:bg-primary hover:text-white'
                    }`}
                    disabled={payAtVisitClicked[item._id]}
                  >
                    {payAtVisitClicked[item._id] ? 'Fee will be paid at the time of visit' : 'Pay at the time of visit'}
                  </button>
                  <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;