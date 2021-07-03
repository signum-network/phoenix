import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadApp } from '../store/app/actions';
import { ApplicationState } from '../store/initialState';
import { LoadingView } from './LoadingView';
import {selectIsPasscodeModalVisible} from '../../modules/auth/store/selectors';
import {setPasscodeModalVisible} from '../../modules/auth/store/actions';
import {Text} from '../components/base/Text';
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
    const isPasscodeModalVisible = useSelector<ApplicationState>(selectIsPasscodeModalVisible);

    useEffect(() => {
        dispatch(loadApp());
    }, []);

    useEffect(() => {
        if (isAppLoaded && !isPasscodeModalVisible){
            setTimeout( () => {
                dispatch(setPasscodeModalVisible(true));
                console.log('should show passcode modal now!');
            }, 5 * 1000);
        }

    }, [isAppLoaded, isPasscodeModalVisible]);

    if (!isAppLoaded){
        return <LoadingView/>;
    }

    return isPasscodeModalVisible
                ? <Text>Passcode Modal</Text>
                : children;

};
