import {createSlice} from "@reduxjs/toolkit";
import data from '../app/data.json';

//get the initial data
const allData = data;

export const itemsListSlice = createSlice({
    name: 'itemsList',
    initialState: {
        items: allData,
        history: allData,
        currentTime: 0,
        currentTitle : 'get ready',
        currentIntervalIndex: 0,
        activePage : 'home',
        timerDisplay : false,
        playPressed: false,
        playPauseEnabled : false,
        restartEnabled: false,
        playEnabled: true,
        pageHeader: "Apollo",
        pageHeaderHistory : "Apollo"
    },
    reducers: {
        changeToDaysList: (state, action) => {
            state.items = action.payload.days;
            state.history = action.payload.days;
            state.activePage = 'days';
            state.pageHeader = action.payload.name;
            state.pageHeaderHistory = action.payload.name;
        },
        changeToIntervalsList : (state, action) => {
            state.items = action.payload.intervals;
            state.timerDisplay = true;
            state.activePage = 'intervals';
            state.pageHeader = action.payload.name;
        },
        back: (state, action) => {
            state.items = state.history;
            state.currentTime = 0;
            state.currentIntervalIndex = 0;
            state.currentTitle='get ready';
            state.timerDisplay = false;
            state.activePage = 'days';
            state.playPauseEnabled = false;
            state.restartEnabled = false;
            state.playEnabled = true;
            state.pageHeader = state.pageHeaderHistory;
        },
        backToHome: (state) => {
            state.items = allData;
            state.currentTime = 0;
            state.activePage='home';
            state.pageHeader = "Apollo";
        },
        tickTimer: (state) => {
            state.currentTime = state.currentTime - 1;
        },
        nextInterval: (state) => {
          state.currentIntervalIndex++;
          if (state.currentIntervalIndex < state.items.length) {
              state.currentTime = state.items[state.currentIntervalIndex].seconds;
              state.currentTitle = state.items[state.currentIntervalIndex].name;
          }
        },
        play: (state) => {
            state.playPressed = true;
            state.currentTitle = state.items[state.currentIntervalIndex].name;
            state.currentTime = state.items[state.currentIntervalIndex].seconds;
            state.playPauseEnabled = true;
            state.restartEnabled = true;
            state.playEnabled = false;
        },
        pause: (state) => {
            state.playPressed = !state.playPressed;
        },
        restart: (state) => {
            state.playPressed = false;
            state.playPauseEnabled = false;
            state.restartEnabled = false;
            state.playEnabled = true;
            state.currentTime = state.items[state.currentIntervalIndex].seconds;
        }
    }
})

//export actions
export const {changeToDaysList,
    changeToIntervalsList,
    tickTimer,
    nextInterval,
    backToHome,
    back,
    play,
    pause,
    restart} = itemsListSlice.actions;

//export current states
export const currentItems = state => state.itemsList.items;
export const currentTime = state => state.itemsList.currentTime;
export const intervalTitle = state => state.itemsList.currentTitle;
export const timerDisplay = state => state.itemsList.timerDisplay;
export const playPressed = state => state.itemsList.playPressed;
export const activePage = state => state.itemsList.activePage;
export const playEnabled = state => state.itemsList.playEnabled;
export const playPauseEnabled = state => state.itemsList.playPauseEnabled;
export const restartEnabled = state => state.itemsList.restartEnabled;
export const headerName = state => state.itemsList.pageHeader;

//export reducer
export default itemsListSlice.reducer;