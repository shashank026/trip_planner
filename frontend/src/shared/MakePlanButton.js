import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import { Link, useNavigate } from 'react-router-dom';

function MakePlanButton () {
    const locationRef = useRef('');
    const startDateRef = useRef('');
    const endDateRef = useRef('');
    const budgetRef = useRef(0);
    const activityRef = useRef('');
   
    const navigate = useNavigate();

    const searchHandler = async () =>
    {
        const location = locationRef.current.value;
            const startDate = startDateRef.current.value;
            const endDate = endDateRef.current.value;
            const budget =  budgetRef.current.value;
            const activity = activityRef.current.value;

            if (location === '' || budget === '' || activity === '' || startDate === '' || endDate === '')
            {
                return alert("All fields are required ! ");
            }

            const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&budget=${budget}&activity=${activity}`)
            if (!res.ok) alert('something went wrong')

            const result = await res.json();

            navigate(`/tours/search?city=${location}&budget=${budget}&activity=${activity}`, { state: result.data });
        }


    return (
        <>
        <div>
                <button className="startPlan d-block" type="submit" >Start Planning</button>
        </div>
        </>
    )
}

export default MakePlanButton;