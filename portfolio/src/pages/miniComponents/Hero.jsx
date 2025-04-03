import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState(null); // Default to null for better handling
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5200/api/v1/user/portfolio/me",
          { withCredentials: true }
        );

        console.log("Fetched User Full Name:", data.user.fullName); // ✅ Log before updating state

        setUser(data.user); // Updates state (asynchronously)
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getMyProfile();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm {user?.fullName || "User"} {/* Fallback if name is missing */}
      </h1>
      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={["MERN STACK DEVELOPER", "YOUTUBER", "FREELANCER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10"
      >
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <Youtube className="text-red-500 w-7 h-7" />
        </Link>
        <Link to={user?.instagramURL || "#"} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={user?.facebookURL || "#"} target="_blank">
          <Facebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user?.linkedInURL || "#"} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user?.twitterURL || "#"} target="_blank">
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user?.githubURL || "#"} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <Github />
            <span>Github</span>
          </Button>
        </Link>
        <Link
          to="https://drive.google.com/file/d/1JRyzCjf3PknQviCe6jSMDs41bL07sbqZ/view"
          target="_blank"
        >
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <ExternalLink />
            <span>Resume</span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">
        {user?.aboutMe || "About me section is empty."}
      </p>
      <hr className="my-8 md:my-10" />
    </div>
  );
};

export default Hero;
