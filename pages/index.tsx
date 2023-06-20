import Navigation from "../components/Navigation";
import Timer from "../components/Timer";
import React, { useEffect, useRef, useState } from "react";
import { WithPageAuthRequired, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Tasks from '../components/Tasks'
export default function Home() {
	const [pomodoro, setPomodoro] = useState(25);
	const [shortBreak, setShortBreak] = useState(5);
	const [longBreak, setLongBreak] = useState(10);
	const [stage, setStage] = useState(0);
	const [seconds, setSecond] = useState(0);
	const [consumedSecond, setConsumedSecond] = useState(0);
	const [ticking, setTicking] = useState(false);



  const switchStage = (index) => {
	const isYes =
		consumedSecond && stage !== index
			? confirm("Are you sure you want to switch?")
			: false;
	if (isYes) {
		reset();
		setStage(index);
	} else if (!consumedSecond) {
		setStage(index);
	}
};

  const getTickingTime = () => {
		const timeStage = {
			0: pomodoro,
			1: shortBreak,
			2: longBreak,
		};
		return timeStage[stage];
	};

  const updateMinute = () => {
		const updateStage = {
			0: setPomodoro,
			1: setShortBreak,
			2: setLongBreak,
		};
		return updateStage[stage];
	};
	const timeUp = ()=>{
		reset();
		//add tomatoe to user
	}
	const reset = () => {
		setConsumedSecond(0);
		setTicking(false);
		setSecond(0);
	};
  const clockTicking = () => {
		const minutes = getTickingTime();
		const setMinutes = updateMinute();

		if (minutes === 0 && seconds === 0) {
			timeUp();
		} else if (seconds === 0) {
			setMinutes((minute) => minute - 1);
			setSecond(59);
		} else {
			setSecond((second) => second - 1);
		}
	};
  useEffect(() => {
		

		const timer = setInterval(() => {
			if(ticking){
				setConsumedSecond((value) => value + 1);

			clockTicking()
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [seconds, pomodoro, shortBreak, longBreak, ticking]);
  return (
    <div className='bg-gray-900 min-h-screen font-inter'>
      <div className='max-w-2xl min-h-screen mx-auto'>
        <Navigation></Navigation>
        <Timer
         stage = {stage} switchStage = {switchStage} getTickingTime = {getTickingTime}
         seconds = {seconds}
		 ticking={ticking}
		 setTicking={setTicking}
         ></Timer>
		 <Tasks></Tasks>
      </div>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired()