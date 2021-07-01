import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { InjectedReduxProps } from '../interfaces';
import { loadApp } from '../store/app/actions';
import { AppReduxState } from '../store/app/reducer';
import { ApplicationState } from '../store/initialState';
import { LoadingView } from './LoadingView';
//
// function mapStateToProps (state: ApplicationState) {
//   return {
//     app: state.app
//   };
// }
//
// interface InjectedProps extends InjectedReduxProps {
//   app: AppReduxState;
// }
// interface Props {
//   children: JSX.Element;
// }
// type TProps = InjectedProps & Props;
//
// class Root extends React.PureComponent<TProps> {
//   componentDidMount () {
//     if (!this.props.app.isAppLoaded) {
//       this.props.dispatch(loadApp());
//     }
//   }
//
//   render () {
//     return this.props.app.isAppLoaded ? this.props.children : <LoadingView />;
//   }
// }
//
// export const RootView = connect(mapStateToProps)(Root);
//

export const RootView: React.FC = ({children}) => {
    const dispatch = useDispatch();
    const isAppLoaded = useSelector<ApplicationState>(state => state.app.isAppLoaded);

    useEffect(() => {
        dispatch(loadApp());
    }, []);

    return isAppLoaded ? children : <LoadingView/>;
};
