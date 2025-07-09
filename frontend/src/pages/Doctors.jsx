import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showfilter, setShowfilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
      <p className="text-gray-600 ">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showfilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowfilter(prev => !prev)}>Filters</button>
        <div className={` flex flex-col gap-4 text-sm text-gray-600 ${showfilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() => speciality === 'General Physician'
              ? navigate('/doctors')
              : navigate('/doctors/General Physician')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality === 'General Physician' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === 'Gynecologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gynecologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === 'Dermatologist'
                ? navigate('/doctors')
                : navigate('/doctors/Dermatologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === 'Pediatricians'
                ? navigate('/doctors')
                : navigate('/doctors/Pediatricians')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === 'Neurologist'
                ? navigate('/doctors')
                : navigate('/doctors/Neurologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  duration-300 ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === 'Gastroenterologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gastroenterologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  duration-300 ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 gap-y-6 min-w-0">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer sform duration-300"
              key={index}
            >
              <div className="relative w-full aspect-[4/3] bg-blue-50 hover:bg-primary">
                <img
                  className="w-full h-full object-contain"
                  src={item.image}
                  alt={`${item.name} profile`}
                  onError={(e) => {
                    e.target.src = '/path/to/fallback-image.jpg'; // Add a fallback image
                  }}
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-gray-900 text-base sm:text-lg font-medium mt-2">{item.name}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;