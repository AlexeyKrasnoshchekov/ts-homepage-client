import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalState, GoalType } from '../../types/types';
import { RootState } from '../../store/store';

const initialState: GoalState = {
    goals: []
};

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: initialState,
    reducers: {
        addGoal: (state, action: PayloadAction<GoalType>) => {
            state.goals.push(action.payload);
        },
        deleteGoal: (state, action: PayloadAction<string>) => {
            let result = state.goals.filter(goal => goal.name !== action.payload);
            state.goals = result;
        },
        setIsDone: (state, action: PayloadAction<string>) => {
            state.goals.forEach(goal => {
                if (goal.name === action.payload) {
                    goal.isDone = true;
                }
            })

        }

    }
})

export const selectGoals = (state: RootState): GoalType[] => {
    return state.goals.goals;
}

export default goalsSlice.reducer;
export const { addGoal, deleteGoal, setIsDone } = goalsSlice.actions;