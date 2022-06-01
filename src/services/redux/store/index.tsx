import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import allReducers from '../reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
