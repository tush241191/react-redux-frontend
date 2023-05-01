import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import Cart from '../components/cart/Cart'
import SideModal from '../components/modal/SideModal'
import {APP_ROUTES} from '../router/routes'
import {RootState} from '../store/store'
import {ASSETS} from '../utils/constants'
import {calculatePrice} from '../utils/utils'

const Header = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const [showModal, setShowModal] = useState<boolean>(false)
  const toggleModal = () => setShowModal(!showModal)

  useEffect(() => {
    if(items.length === 0) {
      setShowModal(false)
    }
  }, [items])

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
          <div className="flex items-center justify-end flex-1 gap-x-2">
            <HeaderCartInfo itemCount={items.length} onClick={toggleModal} />
          </div>
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
                <div className="flex items-center justify-end flex-1 gap-x-2">
                  <HeaderCartInfo
                    itemCount={items.length}
                    onClick={toggleModal}
                  />
                </div>
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
    </>
  )
}

interface HeaderCartInfoProps {
  itemCount: number;
  onClick: () => void;
}
const HeaderCartInfo = ({itemCount, onClick}: HeaderCartInfoProps) => {
  return (
    <>
      <span className="text-base">Total in cart</span>
      <div className="-m-1.5 p-1.5">
        <span className="sr-only">Cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <span
        onClick={itemCount > 0 ? onClick : () => {}}
        className="text-sm cursor-pointer"
      >{`${itemCount} item(s)`}</span>
    </>
  )
}
export default Header
