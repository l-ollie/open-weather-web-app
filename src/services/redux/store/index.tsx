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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

//================================================================
// import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
// import thunk, { ThunkAction } from 'redux-thunk';

// import allReducers from '../reducers';

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(allReducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
// export default store;



// export type RootState = ReturnType<typeof allReducers>
// export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     AnyAction
// >