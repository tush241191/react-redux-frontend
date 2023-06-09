import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import Cart from '../components/cart/Cart'
import Modal from '../components/modal/Modal'
import SideModal from '../components/modal/SideModal'
import Login from '../features/auth/login/Login'
import {useAuth} from '../hooks/useAuth'
import {APP_ROUTES} from '../router/routes'
import {clearAllItems} from '../store/cartSlice'
import {RootState} from '../store/store'
import {ASSETS} from '../utils/constants'
import {calculatePrice} from '../utils/utils'
import HeaderCartInfo from './HeaderCartInfo'

const Header = () => {
  const {validateUser, logout} = useAuth()
  const auth = useSelector((state: RootState) => state.auth)
  const items = useSelector((state: RootState) => state.cart.items)
  const [showModal, setShowModal] = useState<boolean>(false)
  const toggleModal = () => setShowModal(!showModal)

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal)

  const dispatch = useDispatch()

  useEffect(() => {
    validateUser()
  }, [])

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(clearAllItems())
      logout()
    }
    setShowLoginModal(false)
  }, [auth])

  useEffect(() => {
    if (items.length === 0) {
      setShowModal(false)
    }
  }, [items])

  const openCart = () => {
    if(!auth.isAuthenticated) {
      toggleLoginModal()
      return
    }

    if (items.length > 0) toggleModal()
  }

  const getSubtotal = () => {
    let totalPrice = 0
    items.forEach(item => {
      totalPrice = totalPrice + calculatePrice(item.quantity, item.price)
    })
    return Math.round(totalPrice * 100) / 100
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 flex h-16 border-b border-gray-200">
        <div className="flex items-center justify-between w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center flex-1">
            <img className="w-auto h-8" src={ASSETS.LOGO} alt="Malwarebytes" />
          </div>
          <HeaderCartInfo
            itemCount={items.length}
            authInfo={auth}
            onClick={openCart}
            logout={logout}
          />
        </div>

        <div className="hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 left-0 z-50 w-full px-4 pb-6 overflow-y-auto bg-white sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <div className="-ml-0.5 flex items-center justify-between w-full">
                <Link to={APP_ROUTES.ROOT} className="-m-1.5 block p-1.5">
                  <span className="sr-only">Malwarebytes</span>
                  <img
                    className="w-auto h-8"
                    src={ASSETS.LOGO}
                    alt="Malwarebytes"
                  />
                </Link>
                <HeaderCartInfo
                  itemCount={items.length}
                  authInfo={auth}
                  onClick={openCart}
                  logout={logout}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <SideModal header="Cart" onClose={toggleModal} visible={showModal}>
        <div className="px-6">
          <Cart items={items} />
          {items.length > 0 &&
            <div className="py-6 border-t border-gray-200">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${getSubtotal()}</p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          }
        </div>
      </SideModal>
      <Modal visible={showLoginModal} onClose={toggleLoginModal}>
        <Login />
      </Modal>
    </>
  )
}

export default Header
