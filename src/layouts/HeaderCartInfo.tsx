import {UserState} from '../store/authSlice'

interface HeaderCartInfoProps {
  itemCount: number;
  authInfo: UserState;
  onClick: () => void;
  logout: () => void;
}

const HeaderCartInfo = ({
  itemCount,
  authInfo,
  onClick,
  logout
}: HeaderCartInfoProps) => {
  return (
    <div className="flex items-center justify-end flex-1 divide-x-2 divide-gray-400 gap-x-2">
      <div className="flex items-center gap-x-2">
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
          onClick={onClick}
          className="text-sm cursor-pointer"
        >{`${itemCount} item(s)`}</span>
      </div>
      {authInfo.isAuthenticated &&
        <>
          <div className="pl-1 text-base font-semibold">
            Welcome! {`${authInfo.user?.firstName} ${authInfo.user?.lastName}`}
          </div>
          <div className="pl-1">
            <span
              className="text-base text-gray-500 cursor-pointer"
              onClick={logout}
            >
              Log out
            </span>
          </div>
        </>
      }
    </div>
  )
}

export default HeaderCartInfo
