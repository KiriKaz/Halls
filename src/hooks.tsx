// Redux (thunk, react-redux, redux toolkit, idfk)

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Notistack

import React from 'react';
import { useSnackbar } from 'notistack';
import type { SnackbarKey } from 'notistack';
import { removeSnackbar } from './features/notification';

let displayed: (SnackbarKey | undefined)[] = [];

export const useNotifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(store => store.notification);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey | undefined) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({ options: { key }, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar({ key: myKey }));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};
