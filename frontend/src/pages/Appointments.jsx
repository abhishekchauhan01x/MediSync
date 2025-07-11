import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
    const { docId } = useParams();
    const { doctors, currenySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index 
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true


                if (isSlotAvailable) {

                    // ADD SLOT TO ARRAY 
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }


                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots((prev) => [...prev, timeSlots])
        }
    };


    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            return toast.error('Please select a time slot')
        }

        try {
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year
            console.log(slotDate);


            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointment')
            } else {

                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);

    return (
        docInfo && (
            <div className="px-4 sm:px-6 md:px-10 lg:px-16">
                {/* Doctor Details */}
                <div className="flex flex-col sm:flex-row gap-4 ">
                    <div>
                        <img
                            className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image}
                            alt={`${docInfo.name} profile`}
                        />
                    </div>

                    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px]  sm:mt-0">
                        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                            {docInfo.name}
                            <img className="w-5" src={assets.verified_icon} alt="Verified" />
                        </p>
                        <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                            <p>
                                {docInfo.degree} - {docInfo.speciality}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">
                                {docInfo.experience}
                            </button>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                About <img className="w-4 sm:w-5" src={assets.info_icon} alt="Info" />
                            </p>
                            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                                {docInfo.about}
                            </p>
                        </div>
                        <p className="text-gray-500 font-medium mt-4">
                            Appointment fee: <span className="text-gray-600">{currenySymbol}{docInfo.fees}</span>
                        </p>
                    </div>
                </div>

                {/* Booking Slots */}
                <div className="mt-4 sm:ml-72 sm:pl-4 font-medium text-gray-700">
                    <p className="text-sm sm:text-base">Booking Slots</p>
                    <div className="flex gap-4 items-center w-full overflow-x-auto mt-4">
                        {docSlots.length > 0 && docSlots.map((item, index) => {
                            const slotDate = new Date();
                            slotDate.setDate(slotDate.getDate() + index);
                            const isToday = index === 0;
                            if (item.length > 0) {
                                return (
                                    <div
                                        onClick={() => setSlotIndex(index)}
                                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}
                                        `}
                                        key={index}
                                    >
                                        <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                                        <p>{item[0].datetime.getDate()}</p>
                                    </div>
                                );
                            } else if (isToday) {
                                return (
                                    <div
                                        onClick={() => setSlotIndex(index)}
                                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}
                                        `}
                                        key={index}
                                    >
                                        <p>{daysOfWeek[slotDate.getDay()]}</p>
                                        <p>{slotDate.getDate()}</p>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>

                    <div className="flex items-center gap-4 w-full overflow-x-auto mt-4">
                        {docSlots.length && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ?
                            docSlots[slotIndex].map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border transition
                                        ${item.time === slotTime
                                            ? 'bg-primary text-white border-primary'
                                            : 'text-gray-600 border-gray-300 hover:bg-blue-50'
                                        }`}
                                    key={index}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))
                            : slotIndex === 0 && (
                                <p className="w-full text-start py-4 text-red-500 text-base font-semibold">NO SLOTS AVAILABLE TODAY</p>
                            )
                        }
                    </div>
                    <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full  my-6 cursor-pointer">
                        Book an Appointment
                    </button>
                </div>

                {/* Listing Related Doctors */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointments;