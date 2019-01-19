import React from 'react'
import { connect } from 'react-redux'
import { IInjectedReduxProps } from '../interfaces'
import { loadApp } from '../store/app/actions'
import { IAppReduxState } from '../store/app/reducer'
import { IApplicationState } from '../store/initialState'
import { LoadingView } from './LoadingView'

function mapStateToProps (state: IApplicationState) {
  return {
    app: state.app
  }
}

interface IInjectedProps extends IInjectedReduxProps {
  app: IAppReduxState
}
interface IProps {
  children: JSX.Element
}
type TProps = IInjectedProps & IProps

class Root extends React.PureComponent<TProps> {
  componentDidMount () {
    if (!this.props.app.isAppLoaded) {
      this.props.dispatch(loadApp())
    }
  }

  render () {
    const { isAppLoaded } = this.props.app
    return this.props.app.isAppLoaded ? this.props.children : <LoadingView />
  }
}

export const RootView = connect(mapStateToProps)(Root)
