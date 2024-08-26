'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react'
import React, { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  side?: 'left' | 'right'
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, side = 'right' }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`pointer-events-none fixed inset-y-0 ${side}-0 flex max-w-full ${side === 'left' ? 'pr-10' : 'pl-10'}`}
          >
            <DialogPanel
              transition
              className={`pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out ${
                side === 'left'
                  ? 'data-[closed]:-translate-x-full'
                  : 'data-[closed]:translate-x-full'
              } sm:duration-300`}
            >
              <TransitionChild>
                <div
                  className={`absolute ${side === 'left' ? 'right' : 'left'}-0 top-0 ${side === 'left' ? '-mr-8' : '-ml-8'} flex ${side === 'left' ? 'pl-2' : 'pr-2'} pt-4 duration-300 ease-in-out data-[closed]:opacity-0 sm:${side === 'left' ? '-mr-10 pl-4' : '-ml-10 pr-4'}`}
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                    {title}
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1">{children}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export { Drawer }
