import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { retrievePosts } from './actions/posts';

const middleware = [thunk];

export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    retrievePosts()(store.dispatch, store.getState)
    return store;
}
