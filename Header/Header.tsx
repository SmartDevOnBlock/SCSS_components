import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Link, useHistory } from 'react-router-dom'
import { useSignOut } from 'src/generated/graphql'
import { setConnectModal } from 'src/reducers/confirmReducer'
import { logout } from 'src/reducers/userReducer'
import { AppDispatch, RootState } from 'src/store'
import Button from '../Button/Button'
import './Header.scss'

const Header: React.FC = props => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>()

  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const isModel = useSelector((state: RootState) => state.user.profile?.isModel)
  const nickname = useSelector((state: RootState) => state.user.profile?.nickname)
  const activeStream = useSelector((state: RootState) => state.user.profile?.activeStream)
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const [, signOut] = useSignOut()

  useEffect(() => {
    const handleAccountsChanged = () => {
      handleSignOut()
    }

    if (isAuth && window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleSignOut)
    }

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleSignOut)
    }
  }, [])

  const handleSignOut = () => {
    signOut()
      .then(res => {
        const response = res.data.signOut
        const runtimeError = response.runtimeError

        if (runtimeError) {
          console.error(`[${runtimeError.exception}]: ${runtimeError.message}`)
          return false
        }

        dispatch(logout())
        history.push('/')
      })
      .catch(err => console.error(err))
  }

  const getPathForModel = () => {
    if (activeStream) {
      return `/stream/${activeStream?.id}`
    }

    if (isModel && nickname) {
      return '/settings'
    } else {
      return '/profile'
    }
  }

  return (
    <div className={`header ${isMenuOpen ? 'header--active' : ''}`}>
      <div className="container">
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <img src={require('assets/images/header-logo.png')} alt="" />
          </Link>
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <div className="header__body">
              <div className="header__content">
                <ul className="header__nav">
                  <li>
                    <Link to="/">Streams</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/">White Paper</Link>
                  </li>
                  <li>
                    <Link to={getPathForModel()}>For models</Link>
                  </li>
                </ul>
                {isAuth ? (
                  <Button className="header__btn header__btn" type="pink" size="small" onClick={handleSignOut}>
                    Disconnect
                  </Button>
                ) : (
                  <Button className="header__btn" type="pink" size="small" onClick={() => dispatch(setConnectModal(true))}>
                    Сonnect
                  </Button>
                )}
              </div>
              <MediaQuery maxWidth={991}>
                <div className="header__burger" onClick={() => setMenuOpen(!isMenuOpen)}>
                  <a href="#">
                    <span></span>
                  </a>
                </div>
              </MediaQuery>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  )
}

export default Header
