import React, { Fragment } from 'react'
import { redirect } from 'next/navigation'
import StarIcon from '@heroicons/react/24/solid/StarIcon'

import {
  Article,
  Aside,
  Hr,
  Label,
  List,
  Main,
  OrganizationCard,
  Pill,
  PillsWithLabel,
  RichText,
  Section,
  TopLabel,
} from '@/components'
import { convertValue, formatDate, renderSalary } from '@/utilities'
import { getDocument } from '@/utilities/getDocument'
import { Job, Organization } from '@payload-types'
import { JobsList } from '@/blocks'

const JobBlock: React.FC<{ publicId: string; slug: string }> = async ({ publicId, slug }) => {
  const job = (await getDocument('jobs', slug, 1, publicId)) as Job

  if (!job) {
    redirect('/404')
  }

  const {
    id,
    title,
    employmentType,
    location,
    locationType,
    education,
    experience,
    language,
    salary,
    richText,
    skills,
    certifications,
    responsibilities,
    benefits,
    categories,
    featured,
    suitableFor,
    createdAt,
  } = job

  const organization = job.organization as Organization
  const salaryText = renderSalary(salary)

  const formattedDate = formatDate(createdAt)
  const transformedCategories = categories.map(convertValue)
  const transformedEmploymentType = employmentType.map(convertValue)
  const transformedLocationType = locationType?.map(convertValue) ?? []
  const transformedEducation = education?.map(convertValue) ?? []
  const transformedExperience = experience?.map(convertValue) ?? []
  const transformedLanguage = language?.map(convertValue) ?? []

  return (
    <Main>
      <Article>
        <Section>
          <div className="rounded-md bg-white px-4 py-8 shadow sm:px-6 lg:px-8">
            <header className="mb-4">
              <h1 className="inline-flex items-center text-2xl font-bold text-slate-800 md:text-3xl">
                {featured && <StarIcon className="mr-1 h-6 w-6 text-royal-blue-500" />}
                {title}
              </h1>
            </header>
            <div className="mb-6">
              <div className="-m-1 flex flex-wrap items-center gap-2">
                {salaryText && (
                  <Pill size="lg" color="blue">
                    {salaryText}
                  </Pill>
                )}
                {transformedEmploymentType &&
                  transformedEmploymentType.map(type => (
                    <Pill key={type} size="lg" color="blue">
                      {type}
                    </Pill>
                  ))}
                {location && (
                  <Pill size="lg" color="blue">
                    {location}
                  </Pill>
                )}
              </div>
            </div>
            <Fragment>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  {/* <ApplyForm jobId={id} organizationId={organization.id} /> */}
                  <div className="flex items-center">
                    <div className="mb-2 text-sm italic text-slate-500">{formattedDate}</div>
                  </div>
                </div>
              </div>
              {job.richText && <Hr />}
            </Fragment>

            {richText && (
              <Fragment>
                <RichText content={richText} />
                <Hr />
              </Fragment>
            )}

            {skills && skills.length > 0 && (
              <Fragment>
                <List label="Skills" items={skills as string[]} />
                <Hr />
              </Fragment>
            )}
            {certifications && certifications.length > 0 && (
              <Fragment>
                <List label="Certifications" items={certifications as string[]} />
                <Hr />
              </Fragment>
            )}
            {responsibilities && responsibilities.length > 0 && (
              <Fragment>
                <List label="Responsibilities" items={responsibilities as string[]} />
                <Hr />
              </Fragment>
            )}
          </div>
        </Section>
        <Aside>
          <Section>
            <OrganizationCard {...organization} />
          </Section>
          <Section>
            <div className="col-span-full overflow-hidden rounded-md border border-slate-200 bg-white sm:col-span-6 xl:col-span-4">
              <div className="flex flex-col gap-4 justify-self-end p-5">
                {categories.length > 0 && (
                  <PillsWithLabel label="Categories" items={transformedCategories} />
                )}
                {transformedEmploymentType.length > 0 && (
                  <PillsWithLabel label="Employment" items={transformedEmploymentType} />
                )}
                {transformedLocationType.length > 0 && (
                  <PillsWithLabel label="Location Type" items={transformedLocationType} />
                )}
                {transformedEducation.length > 0 && (
                  <PillsWithLabel label="Education" items={transformedEducation} />
                )}
                {transformedExperience.length > 0 && (
                  <PillsWithLabel label="Experience" items={transformedExperience} />
                )}
                {transformedLanguage.length > 0 && (
                  <PillsWithLabel label="Language" items={transformedLanguage} />
                )}
                {benefits && benefits.length > 0 && (
                  <Fragment>
                    <PillsWithLabel label="Benefits" items={benefits as string[]} />
                  </Fragment>
                )}
                {Object.values(suitableFor ?? {}).some(value => value) && (
                  <div>
                    <Label>Suitable For</Label>
                    <div className="flex flex-wrap gap-2">
                      {suitableFor?.students && <Pill size="lg">Students</Pill>}
                      {suitableFor?.mothersOnMaternityLeave && (
                        <Pill size="lg">Mothers on maternity leave</Pill>
                      )}
                      {suitableFor?.disabledPeople && <Pill size="lg">Disabled people</Pill>}
                      {suitableFor?.retirees && <Pill size="lg">Retirees</Pill>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </Aside>
      </Article>
      <Article>
        <Section>
          <Hr />
          <TopLabel text="Most recent jobs" url="/jobs" urlText="View all jobs" />
          <JobsList limit={3} />
        </Section>
      </Article>
    </Main>
  )
}

export { JobBlock }
export { JobBlockSkeleton } from './Skeleton'
