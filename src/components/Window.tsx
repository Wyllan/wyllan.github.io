import { Transition, Dialog } from "@headlessui/react";
import { useState, useRef, Fragment } from "react";
import Draggable from "react-draggable";
import { DesktopShortcut } from "./Desktop";

export default function Window({ x, y }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeWindow() {
    setIsOpen(false);
  }

  function openWindow() {
    setIsOpen(true);
  }

  const dRef = useRef(null);

  const Shortcut = DesktopShortcut({ name: "test", onClick: openWindow, point: { x, y } });

  return (
    <>
      <div className="bg-slate-400" key="q" data-grid={{ x, y, w: 1, h: 1 }}>
        q
      </div>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeWindow}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <Draggable handle=".w-title" nodeRef={dRef}>
              <div className="fixed inset-0 overflow-y-auto" ref={dRef}>
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="window w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="w-title text-lg font-medium leading-6 text-gray-900">
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeWindow}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Draggable>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
