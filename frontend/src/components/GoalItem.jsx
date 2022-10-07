import { useDispatch } from 'react-redux'
import { deleteGoal, getGoals } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
    const dispatch = useDispatch()
    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button onClick={() => {
                Promise.resolve(dispatch(deleteGoal(goal._id)))
                    .then(() => dispatch(getGoals()))
            }} className='close'>
                X
            </button>
        </div>
    )
}
export default GoalItem
