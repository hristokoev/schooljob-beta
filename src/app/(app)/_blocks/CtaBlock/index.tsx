import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'

import { Button } from '@/components'
import { Checkmark } from '@/components'
import CtaIllustration from '@/public/images/cta-illustration.png'

interface CtaProps {
  title: string
  content: string
  items?: string[]
  button: string
}

const CtaBlock: React.FC<CtaProps> = ({ title, content, items, button }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="py-12 md:py-20">
        <div className="grid gap-20">
          <div className="items-center md:grid md:grid-cols-12 md:gap-6">
            <div className="relative mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6">
              <Image
                className="w-full md:max-w-none"
                src={CtaIllustration}
                width={540}
                height={538}
                alt="Features illustration"
              />
              <div className="absolute -left-2 top-[10rem] hidden -translate-y-1/2 xl:block">
                <span className="relative flex h-8 w-8">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-royal-blue-500 opacity-75"></span>
                  <span className="relative inline-flex h-8 w-8 rounded-full bg-royal-blue-500"></span>
                </span>
              </div>
            </div>
            <div className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6">
              <div className="mb-4 md:pr-4 lg:pr-12 xl:pr-16">
                <h3 className="mb-3 text-3xl font-extrabold">{title}</h3>
                <p className="mb-4 text-xl text-slate-800">{content}</p>
                {items && items.length > 0 && (
                  <ul className="-mx-2 -my-1 flex flex-col text-lg text-slate-800">
                    {items.map((item, index) => (
                      <li className="mx-2 my-1 flex items-center" key={index}>
                        <Checkmark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button className="group">
                {button}
                <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CtaBlock }
