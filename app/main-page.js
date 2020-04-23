import { VisibilityFilters, deleteTodo } from "./store/actions";
import { ObservableArray } from "@nativescript/core";
import { getResources } from "@nativescript/core/application/application";
import { getVisibleTodos } from "./store/selectors";
import { setString } from "@nativescript/core/application-settings";
import { store } from "./store";

const createViewModel = require("./main-view-model").createViewModel;
let vm;
let unsubscribeFromStore;

export function onNavigatingTo(args) {
    const page = args.object;
    vm = createViewModel();
    page.bindingContext = vm;
}

export function onPageLoaded(args) {
    unsubscribeFromStore = store.subscribe(() => {
        const state = Object.assign({}, store.getState());
        state.todos = new ObservableArray(getVisibleTodos(state));
        state.count = state.todos.length;

        vm.set('state', state);
        setString('appState', JSON.stringify(store.getState()));
    });
}

export function onPageUnloaded(args) {
    unsubscribeFromStore();
}

export function onSwipeCellStarted(args) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args.swipeView;
    if (swipeView && swipeLimits) {
        const rightItem = swipeView.getViewById('delete-view');
        rightItem.translateX = 0;
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }
}

export function onSwipeCellEnded(args) {
    const swipeView = args.swipeView;
    if (swipeView) {
        const rightItem = swipeView.getViewById('delete-view');
        if (rightItem.android) {
            rightItem.translateX = -25;
        }
    }
}

export function onRightSwipeClick(args) {
    const task = args.object.bindingContext;
    store.dispatch(deleteTodo(task.id));
}

getResources().filterFormatter = (value, count) => {
    if (!value) return;

    switch (value) {
        case VisibilityFilters.SHOW_ACTIVE: return 'Showing only incomplete tasks [' + count + ']';
        case VisibilityFilters.SHOW_ALL: return 'Showing all tasks [' + count + ']';
        case VisibilityFilters.SHOW_COMPLETED: return 'Showing only completed tasks [' + count + ']';
        default: break;
    }
};
