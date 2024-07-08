import React from 'react'

import { Article, Aside, Hr, Main, Section } from '@/components'

const JobBlockSkeleton: React.FC = () => {
  return (
    <Main>
      <Article>
        <Section>
          <div className="animate-pulse rounded-md bg-white px-4 py-8 shadow sm:px-6 lg:px-8">
            <header className="mb-4">
              <div className="h-8 w-1/2 bg-slate-200" />
            </header>

            <div className="flex gap-2">
              <div className="h-5 w-24 rounded-full bg-slate-200" />
              <div className="h-5 w-12 rounded-full bg-slate-200" />
            </div>

            <div className="mt-6">
              <div className="h-10 w-32 rounded-md bg-slate-200" />
            </div>
            <Hr />

            <div className="flex flex-col gap-2">
              <div className="h-6 bg-slate-200" />
              <div className="h-6 bg-slate-200" />
              <div className="h-12 bg-slate-200" />
              <div className="h-6 w-2/3 bg-slate-200" />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="h-8 w-48 bg-slate-200" />
            </div>
            <Hr />

            <div className="mt-6">
              <div className="h-10 w-32 rounded-md bg-slate-200" />
            </div>
          </div>
        </Section>
        <Aside>
          <Section>
            <div className="animate-pulse overflow-hidden rounded-md bg-white">
              <div className="flex flex-col">
                <div className="h-32 bg-slate-300" />
                <div className="flex flex-col gap-2 justify-self-end p-5">
                  <div className="-mt-12 mb-2 h-16 w-16 rounded-md bg-slate-400" />
                  <div className="h-6 bg-slate-200" />
                  <div className="h-6 bg-slate-200" />
                  <div className="h-12 bg-slate-200" />
                  <div className="flex gap-2">
                    <div className="h-5 w-24 rounded-full bg-slate-200" />
                    <div className="h-5 w-12 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <div className="col-span-full animate-pulse overflow-hidden rounded-md border border-slate-200 bg-white sm:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-4 justify-self-end p-5">
                <div className="flex gap-2">
                  <div className="h-5 w-24 rounded-full bg-slate-200" />
                  <div className="h-5 w-12 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-12 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-24 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-32 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                  <div className="h-5 w-12 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </Section>
        </Aside>
      </Article>
    </Main>
  )
}

export { JobBlockSkeleton }
