import { Job, Organization } from '@payload-types'
import React, { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
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
import { formatDate, renderSalary } from '@/utilities'
import { ApplyForm } from './ApplyForm'
import { cz } from '@/payload/data'
import { getDocument } from '@/utilities/getDocument'
import { JobsList } from '@/blocks'

const JobBlock: React.FC<{ publicId: string; slug: string }> = async ({ publicId, slug }) => {
  const t = await getTranslations()
  const depth = 2
  const job = (await getDocument('jobs', slug, depth, publicId)) as Job

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
  const transformedCategories = categories.map(value => t(`search.options.${value}`))
  const transformedEmploymentType = employmentType.map(value => t(`search.options.${value}`))
  const transformedLocationType = locationType?.map(value => t(`search.options.${value}`)) ?? []
  const transformedEducation = education?.map(value => t(`search.options.${value}`)) ?? []
  const transformedExperience = experience?.map(value => t(`search.options.${value}`)) ?? []
  const transformedLanguage = language?.map(value => t(`search.options.${value}`)) ?? []

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
                {location &&
                  location.map(location => (
                    <Pill key={location} size="lg" color="blue">
                      {cz.find(l => l.value === location)?.label}
                    </Pill>
                  ))}
              </div>
            </div>
            <Fragment>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <ApplyForm jobId={id} organizationId={organization.id} />
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
                <List label={t('job.skills')} items={skills as string[]} />
                <Hr />
              </Fragment>
            )}
            {certifications && certifications.length > 0 && (
              <Fragment>
                <List label={t('job.certifications')} items={certifications as string[]} />
                <Hr />
              </Fragment>
            )}
            {responsibilities && responsibilities.length > 0 && (
              <Fragment>
                <List label={t('job.responsibilities')} items={responsibilities as string[]} />
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
                  <PillsWithLabel label={t('job.categories')} items={transformedCategories} />
                )}
                {transformedEmploymentType.length > 0 && (
                  <PillsWithLabel label={t('job.employment')} items={transformedEmploymentType} />
                )}
                {transformedLocationType.length > 0 && (
                  <PillsWithLabel label={t('job.locationType')} items={transformedLocationType} />
                )}
                {transformedEducation.length > 0 && (
                  <PillsWithLabel label={t('job.education')} items={transformedEducation} />
                )}
                {transformedExperience.length > 0 && (
                  <PillsWithLabel label={t('job.experience')} items={transformedExperience} />
                )}
                {transformedLanguage.length > 0 && (
                  <PillsWithLabel label={t('job.language')} items={transformedLanguage} />
                )}
                {benefits && benefits.length > 0 && (
                  <Fragment>
                    <PillsWithLabel label={t('job.benefits')} items={benefits as string[]} />
                  </Fragment>
                )}
                {Object.values(suitableFor ?? {}).some(value => value) && (
                  <div>
                    <Label>{t('job.suitableFor')}</Label>
                    <div className="flex flex-wrap gap-2">
                      {suitableFor?.students && <Pill size="lg">{t('job.students')}</Pill>}
                      {suitableFor?.mothersOnMaternityLeave && (
                        <Pill size="lg">{t('job.mothersOnMaternityLeave')}</Pill>
                      )}
                      {suitableFor?.disabledPeople && (
                        <Pill size="lg">{t('job.disabledPeople')}</Pill>
                      )}
                      {suitableFor?.retirees && <Pill size="lg">{t('job.retirees')}</Pill>}
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
          <TopLabel text={t('ui.mostRecentJobs')} url="/jobs" urlText={t('ui.viewAllJobs')} />
          <JobsList limit={3} />
        </Section>
      </Article>
    </Main>
  )
}

export { JobBlock }
export { JobBlockSkeleton } from './Skeleton'
