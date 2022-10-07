import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import GoalForm from '../components/GoalForm';
import { toast } from 'react-toastify'
import { getGoals, reset } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem';
function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) navigate('/login')
        dispatch(getGoals())
        return () => { dispatch(reset()) };
    }, [user, navigate, isError, message, dispatch])
    if (isLoading) return <Spinner />
    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            <section className='content'>
                {goals.length === 0 ? (<h3>You have not set any goals</h3>) : (
                    <div className='goals'>
                        {
                            goals.map(goal => <GoalItem key={goal._id} goal={goal} />)
                        }
                    </div>
                )}
            </section>
        </>
    )
}

export default Dashboard