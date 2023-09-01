import "dotenv/config";
import {useEffect} from "react";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/workouts`, {
                mode: process.env.REACT_APP_CORS_MODE,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({
                    type: "SET_WORKOUTS",
                    payload: json,
                });
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {!workouts && <div className="loading">Yükleniyor...</div>}
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails workout={workout} key={workout._id}/>
                    ))}
            </div>
            <WorkoutForm/>
        </div>
    );
};

export default Home;
