import { Observable, ObservableArray } from "@nativescript/core";
import { VisibilityFilters, addTodo, setVisibilityFilter, toggleTodo } from "./state/actions";
import { ActionCreators } from 'redux-undo';
import { Vibrate } from "nativescript-vibrate";
import { android as _android } from '@nativescript/core/application';
import { ad } from '@nativescript/core/utils/utils';
import { getVisibleTodos } from "./state/selectors";
import { store } from "./state/store";

export function hideKeyboard(textField) {
    // textField only required for iOS
    if (_android) {
        try {
            const activity = _android.foregroundActivity;
            const Context = ad.getApplicationContext();
            const inputManager = Context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
            if (activity.getCurrentFocus()) {
                inputManager.hideSoftInputFromWindow(
                activity.getCurrentFocus().getWindowToken(),
                android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS
                );
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (!textField) return;
        textField.focus();
        textField.dismissSoftInput();
    }
}

export function createViewModel() {
    const viewModel = new Observable();
    const vibrator = new Vibrate();
    viewModel.todoText = '';
    const state = Object.assign({}, store.getState());
    state.todos = new ObservableArray(getVisibleTodos(state));
    state.count = state.todos.length;
    viewModel.state = state;

    viewModel.onAddTodo = (args) => {
        if (viewModel.todoText.trim() !== '') {
            hideKeyboard(args.object.page.getViewById('todoTextField'));
            store.dispatch(addTodo(viewModel.todoText));
            viewModel.set('todoText', '');
        }
    };

    viewModel.toggleTodo = (args) => {
        store.dispatch(toggleTodo(args.object.bindingContext.id));
        vibrator.vibrate(100);
    };

    viewModel.showCompleted = (args) => {
        store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
    };

    viewModel.showActive = (args) => {
        store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
    };

    viewModel.showAll = (args) => {
        store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));
    };

    viewModel.onUndo = (args) => {
        store.dispatch(ActionCreators.undo());
    };

    viewModel.onRedo = (args) => {
        store.dispatch(ActionCreators.redo());
    };

    viewModel.onClear = (args) => {
        store.dispatch(ActionCreators.clearHistory());
    };


    return viewModel;
}
