import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadApp} from '../store/app/actions';
import {ApplicationState} from '../store/initialState';
import {LoadingView} from './LoadingView';
import {PasscodeProtection} from '../../modules/auth/components/passcode/PasscodeProtection';

interface Props {
  children: React.ReactNode;
  onReady: () => void;
}

export const RootView = ({children, onReady}: Props) => {
  const dispatch = useDispatch();
  const isAppLoaded = useSelector<ApplicationState>(
    state => state.app.isAppLoaded,
  );

  useEffect(() => {
    dispatch(loadApp());
  }, []);

  useEffect(() => {
    isAppLoaded && onReady();
  }, [isAppLoaded]);

  if (!isAppLoaded) {
    return <LoadingView />;
  }

  return <PasscodeProtection>{children}</PasscodeProtection>;
};
