import React, {ReactNode} from 'react'

import CrossIcon from '../icon/CrossIcon'

interface SideModalProps {
  header?: string;
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}

const SideModal = ({header, children, visible, onClose}: SideModalProps) => {
  return (
    <div
      className={`relative z-50 ${visible ? '' : 'hidden'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
            <div className="w-screen max-w-md pointer-events-auto">
              <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                <div className="p-6 bg-white border-b">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="slide-over-title"
                    >
                      {header}
                    </h2>
                    <div className="flex items-center ml-3 h-7">
                      <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <CrossIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideModal
