import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { motion as Motion } from "framer-motion";
import EventDetailsBg from "../assets/RegBg-img.png";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import playClickSound from "../utils/ClickSound.js";

const EventDetails = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, login } = useAuth();

  const handleRegister = () => {
    if (!isAuthenticated) {
      login();
    } else if (event_id) {
      navigate(`/registration/${event_id}`);
    } else {
      console.error("Error: eventID is not available yet!");
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          "https://imeetserver2k25.onrender.com/eventDetails",
          {
            params: { event_id: event_id },
          }
        );
        if (response.data.data.length > 0) {
          setEvent(response.data.data[0]);
        } else {
          console.error("No event found for this event_id");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error invoking event details function", error);
      }
    };
    fetchEventDetails();
  }, [event_id]);

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="relative text-white min-h-screen flex items-center justify-center p-4 pt-20 overflow-hidden">
      {/* Animated background */}
      <Motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${EventDetailsBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        animate={{
          backgroundPosition: [
            "0% 0%",
            "50% 50%",
            "100% 100%",
            "50% 50%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 40, // slow & premium feel
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative max-w-5xl z-10 mx-auto bg-gradient-to-bl from-black/40 to-purple-800/40 rounded-lg p-6 mt-6 shadow-lg animate-fade-in flex flex-col">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 animate-slide-in-left">
            {/* EVENT IMAGE */}
            <img
              src={event.event_img_url}
              className="rounded-lg shadow-lg h-auto"
              alt={event.name}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-6">
            {/* Event Details */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFFDFD] to-[#DA7AFF] bg-clip-text text-amber-300 mb-4 animate-fade-in-out pb-2">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4 pb-2">
              <div className="flex items-center bg-gradient-to-br from-[#8B49A9] to-[#DA7AFF] text-white font-medium rounded-full px-3 py-3 ">
                <SlCalender size={30} />{" "}
                <span className="ml-2">{event.date}</span>
              </div>
              <div className="flex items-center bg-gradient-to-br from-[#8B49A9] to-[#DA7AFF] text-white font-medium rounded-full px-3 py-3 ">
                <MdOutlineWatchLater size={30} />{" "}
                <span className="ml-2">{event.start_time}</span>
              </div>
              <div className="flex items-center bg-gradient-to-br from-[#8B49A9] to-[#DA7AFF] text-white font-medium rounded-full px-3 py-3 ">
                <IoLocationSharp size={30} />{" "}
                <span className="ml-2">{event.venue}</span>
              </div>
            </div>

            <p className="mb-3">
              <span className="font-semibold text-xl text-amber-200">
                Description :{" "}
              </span>
              {event.details}
            </p>

            {/* <p className="mb-3">
              <span className="font-semibold text-xl text-amber-200">
                Coordinators:{" "}
              </span>
              {event.coordinator_names.length > 0
                ? event.coordinator_names.join(", ")
                : "N/A"}
            </p>

            <p className="mb-6">
              <span className="font-semibold text-xl text-amber-200">
                Contacts:{" "}
              </span>
              {event.contact_no.length > 0
                ? event.contact_no.join(", ")
                : "N/A"}
            </p> */}


            <p className="mb-3">
  <span className="font-semibold text-xl text-amber-200">
    Coordinators:{" "}
  </span>
  {event.coordinators ? event.coordinators : "N/A"}
</p>

<p className="mb-6">
  <span className="font-semibold text-xl text-amber-200">
    Contacts:{" "}
  </span>
  {event.contacts ? event.contacts : "N/A"}
</p>

            <div className="bg-gradient-to-tr from-black to-purple-900 p-4 rounded-lg text-sm text-white">
              <p className="font-semibold">Rules:</p>
              <ul className="list-disc ml-5 mt-2">
                {event.rules.split(/\d+\.\s?/).map((rule, index) =>
                  rule.trim() ? (
                    <li key={index} className="mb-2">
                      {rule}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8" onClick={playClickSound}>
          <button
            className="bg-gradient-to-br from-[#7b4596] to-[#b153d6] text-white text-2xl font-bold py-3 px-8 rounded-full animate-bounce"
            onClick={handleRegister}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
