import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as recommend_action_types } from '../modules/recommend'
import status_code from '../api/request/status-code'

// 获取recType数量为recNum的推送列表
export function* getRecommend(id, recType, recNum) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/recommend', { _id: id, recType, recNum });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getRecommendFlow() {
    while (true) {
        // 监听action，获取action参数
        let request = yield take(recommend_action_types.GET_RECOMMEND);
        const { id, recType, recNum } = request;
        let response = yield call(getRecommend, id, recType, recNum);
        if (response && response.status === status_code.SUCCEED) {
            // list获取成功
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: recommend_action_types.SET_RECOMMEND,
                recList: response.data.data
            });
        } else {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

// 获取id的收藏列表
export function* getCollections(id) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/like', { _id: id });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getCollectionsFlow() {
    // 监听action，获取action参数
    let request = yield take(recommend_action_types.GET_COLLECTIONS);
    const { id } = request;
    let response = yield call(getCollections, id);
    if (response && response.status === status_code.SUCCEED) {
        // list获取成功
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
}

// 为userID收藏musicID
export function* addCollection(userID, likedID) {
    let response;
    try {
        response = yield call(post, '/api/like', { _id: userID, likedID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* addCollectionFlow() {
    let request = yield take(recommend_action_types.ADD_COLLECTION);
    const { userID, likedID } = request;
    let response = yield call(addCollectionFlow, userID, likedID);
    if (response && response.status === status_code.SUCCEED) {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
    }
}

// 为userID取消收藏musicID
export function* delCollection(userID, likedID) {
    let response;
    try {
        response = yield call(del, '/api/like', { _id: userID, likedID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* deleteCollectionFlow() {
    // 监听action，获取action参数
    let request = yield take(recommend_action_types.DEL_COLLECTION);
    const { id, likedID } = request;
    let response = yield call(delCollection, id, likedID);
    if (response && response.status === status_code.SUCCEED) {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
    }
}