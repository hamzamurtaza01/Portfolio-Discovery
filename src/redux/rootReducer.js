import {combineReducers} from 'redux';
import authReducers from './Auth/AuthReducers';
import ClassIDReducers from './ClassID/ClassIDReducers';
import UserInfoReducers from './UserInfo/UserInfoReducers';

export default combineReducers({
    authReducers,
    ClassIDReducers,
    UserInfoReducers
})
