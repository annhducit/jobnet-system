import { toast } from 'react-toastify'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineFileSearch } from 'react-icons/ai'
import clns from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaLocationDot, FaSliders } from 'react-icons/fa6'

import Button from 'Common/Button'
import Pagination from 'Common/Pagination'
import SelectChangeEvent from 'Common/type/SelectChangeEvent'
import Selection from 'Common/input/Selection'
import Input from 'Common/input/Input'
import EmptyData from 'Common/EmptyData'
import JobItemSkeleton from 'Common/skeleton/JobItemSkeleton'
import JobItem from 'Common/JobItem'

import postService from '../../services/postService'
import locationService, { LocationSearch } from '../../services/locationService'
import categoryService from '../../services/categoryService'

import type PostType from '../../types/post'
import type PaginationType from '../../types/pagination'
import professionService from '../../services/professionService'
import ProfessionType from '../../types/profession'
import CategoryType from '../../types/category'

import useScroll from '../../hooks/useScroll'

export default function PostsSearch(): JSX.Element {
  return (
    <>
      <SearchHeader />
    </>
  )
}

function SearchHeader() {
  const [params] = useSearchParams()
  const { scrollIntoView, scrollIntoViewRef } = useScroll()

  const [categories, setCategories] = useState<CategoryType[]>()
  const [professions, setProfessions] = useState<ProfessionType[]>()
  const [locations, setLocations] = useState<LocationSearch[]>()

  const [showAdvanceFilter, setShowAdvanceFilter] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()

  const [postPagination, setPostPagination] = useState<
    PaginationType<PostType>
  >({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })

  const [criteria, setCriteria] = useState({
    search: (params.get('search') as string) || '',
    categoryId: '',
    professionId: '',
    minSalary: '',
    maxSalary: '',
    provinceCode: '',
    workingFormat: '',
    sortBy: 'createdAt-desc',
  })

  const loadingSkeleton = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <JobItemSkeleton key={index} />
    ))
  }

  useEffect(() => {
    void (async () => {
      setIsLoading(true)
      const data = await postService.getPosts({
        search: (params.get('search') as string) || '',
        isExpired: false,
        activeStatus: 'Opening',
      })
      setIsLoading(false)
      setPostPagination(data)

      const professions = await professionService.getProfessions()
      const categories = await categoryService.getCategories()
      setCategories(categories)
      setProfessions(professions)
    })()
  }, [])

  const filteredProfessions = criteria.categoryId
    ? professions?.filter(
        (profession) => profession.categoryId === criteria.categoryId
      )
    : professions

  useEffect(() => {
    const data = locationService.getLocationForSearch()
    setLocations(data)
  }, [])

  const mappedLocations = useMemo(
    () =>
      locations?.map((location) => ({
        id: location.code,
        name: location.name,
      })),
    [locations]
  )

  const handlePageChange = (page: number) => {
    void (async () => {
      setIsLoading(true)

      try {
        const pagination = await postService.getPosts({
          page,
          ...criteria,
          minSalary: parseInt(criteria.minSalary),
          maxSalary: parseInt(criteria.maxSalary),
          provinceCode: parseInt(criteria.provinceCode),
          sortBy: [criteria.sortBy],
          activeStatus: 'Opening',
          isExpired: false,
        })
        setPostPagination(pagination)
        scrollIntoView()
      } catch (err) {
        console.error(err)
        toast.error('An error occured.')
      } finally {
        setIsLoading(false)
      }
    })()
  }

  const handleCriteriaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) =>
      setCriteria((prevCriteria) => ({
        ...prevCriteria,
        [e.target.name]: e.target.value,
      })),
    []
  )

  const changeLastSearchKeyword = (keyword: string) => {
    if (keyword) localStorage.setItem('lastSearchKeyword', keyword)
  }

  const handleFindJobs = () => {
    void (async () => {
      setIsLoading(true)
      changeLastSearchKeyword(criteria.search)
      try {
        const pagination = await postService.getPosts({
          ...criteria,
          minSalary: parseInt(criteria.minSalary),
          maxSalary: parseInt(criteria.maxSalary),
          provinceCode: parseInt(criteria.provinceCode),
          sortBy: undefined,
          activeStatus: 'Opening',
          isExpired: false,
        })
        setPostPagination(pagination)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }

  const handleSortByChange = (e: SelectChangeEvent) => {
    const sortBy = e.target.value
    console.log(sortBy)

    sortBy &&
      void (async () => {
        setIsLoading(true)
        try {
          const pagination = await postService.getPosts({
            ...criteria,
            minSalary: parseInt(criteria.minSalary),
            maxSalary: parseInt(criteria.maxSalary),
            provinceCode: parseInt(criteria.provinceCode),
            sortBy: [sortBy],
            activeStatus: 'Opening',
            isExpired: false,
          })
          setPostPagination(pagination)
          setCriteria((prev) => ({ ...prev, sortBy }))
        } catch (err) {
          console.error(err)
          toast.error('An error occured.')
        } finally {
          setIsLoading(false)
        }
      })()
  }

  const postSearchResultElms = postPagination.data.map((post) => (
    <JobItem key={post.id} data={post} />
  ))

  return (
    <>
      <div className="py-4 header-search bg-search-footer">
        <div className="border header-layout my-4 border-[color:var(--Gray-100,#E4E5E8)] shadow bg-white gap-3 py-3 px-3 rounded-lg border-solid max-md:flex-wrap">
          <span className="flex items-center justify-between flex-1 gap-3 px-3 bg-white rounded-md max-md:max-w-full max-md:pr-5">
            <FaSearch className="text-lg text-main" />
            <Input
              color="none"
              id="search"
              name="search"
              placeholder="Search by: Job tittle, Position, Keyword..."
              className="self-center my-auto text-base leading-6 text-gray-400 g grow whitespace-nowrap"
              value={criteria.search}
              onChange={handleCriteriaChange}
            />
          </span>
          <div className="flex items-stretch justify-between gap-5 px-3 bg-white rounded-md max-md:max-w-full max-md:flex-wrap">
            <span className="flex items-center justify-between gap-2">
              <FaLocationDot className="text-lg text-main" />
              <Input
                color="none"
                placeholder="City, state or zipcode"
                className="self-center my-auto text-base leading-6 text-gray-400 grow whitespace-nowrap"
              />
            </span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aea25c5d1532a9d740f2f25b2426b5246ef14cd691fc7a2f6e5d09eb363c5568?"
              className="items-center justify-center object-contain object-center w-6 max-w-full overflow-hidden aspect-square shrink-0"
            />
          </div>
          <div className="flex items-stretch justify-between gap-3">
            <Button
              size="xs"
              className="flex items-stretch justify-between gap-3 px-6 py-3 text-base font-semibold bg-gray-100 rounded max-md:px-5 whitespace-nowrap"
              color="empty"
              onClick={() => setShowAdvanceFilter(!showAdvanceFilter)}
            >
              <FaSliders className="mr-3 text-black rotate-90 " />
              Filters
            </Button>
            <Button
              size="xs"
              className="items-center justify-center px-8 py-3 text-base font-semibold leading-6 text-white capitalize rounded bg-main whitespace-nowrap"
              color="empty"
              onClick={handleFindJobs}
            >
              Find Job
            </Button>
          </div>
        </div>
        <span className="px-2 py-1 text-sm font-semibold text-white rounded bg-main">
          Total {postPagination.totalElements} results
        </span>

        {showAdvanceFilter && (
          <div className="flex justify-center px-2 py-6">
            <div className="w-[1200px] gap-y-6 flex flex-col">
              <div className="header-layout gap-y-6 gap-x-4">
                <InputSection
                  label={t('posts.select.category.label')}
                  className="grow"
                >
                  <Selection
                    id="categoryId"
                    name="categoryId"
                    className="bg-white"
                    placeholder={t('posts.select.category.placeholder')}
                    options={categories}
                    value={criteria.categoryId}
                    onSelectChange={handleCriteriaChange}
                  />
                </InputSection>
                <InputSection
                  label={t('posts.select.profession.label')}
                  className="grow"
                >
                  <Selection
                    id="professionId"
                    name="professionId"
                    className="flex-1 bg-white"
                    placeholder={t('posts.select.profession.placeholder')}
                    options={filteredProfessions}
                    value={criteria.professionId}
                    onSelectChange={handleCriteriaChange}
                  />
                </InputSection>
              </div>

              <div className="header-layout gap-y-6 gap-x-4">
                <div className="basis-1/2">
                  <InputSection label={t('posts.input.salary.label')}>
                    <div className="flex items-center gap-x-2">
                      <Input
                        id="minSalary"
                        name="minSalary"
                        color="emerald"
                        placeholder={t('posts.input.salary.placeholder.min')}
                        value={criteria.minSalary}
                        onChange={handleCriteriaChange}
                      />
                      {'-'}
                      <Input
                        id="maxSalary"
                        name="maxSalary"
                        color="emerald"
                        placeholder={t('posts.input.salary.placeholder.max')}
                        value={criteria.maxSalary}
                        onChange={handleCriteriaChange}
                      />
                    </div>
                  </InputSection>
                </div>
                <div className="flex gap-4 basis-1/2">
                  <InputSection
                    label={t('posts.select.location.label')}
                    className="grow"
                  >
                    <Selection
                      id="provinceCode"
                      name="provinceCode"
                      className="flex-1 bg-white"
                      placeholder={t('posts.select.location.placeholder')}
                      options={mappedLocations}
                      value={criteria.provinceCode}
                      onSelectChange={handleCriteriaChange}
                    />
                  </InputSection>
                  <InputSection
                    label={t('posts.select.workingFormat.label')}
                    className="grow"
                  >
                    <Selection
                      id="workingFormat"
                      name="workingFormat"
                      className="flex-1 bg-white"
                      placeholder={t('posts.select.workingFormat.placeholder')}
                      options={[
                        { id: 'full-time', name: 'Full-time' },
                        { id: 'part-time', name: 'Part-time' },
                        { id: 'intern', name: 'Intern' },
                      ]}
                      value={criteria.workingFormat}
                      onSelectChange={handleCriteriaChange}
                    />
                  </InputSection>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={scrollIntoViewRef} className="flex justify-center py-6">
        <div className="w-[1200px]">
          <div className="space-y-6">
            <div className="justify-between px-2 header-layout gap-y-4 ">
              <div className="flex items-center">
                <div className="text-2xl">
                  <AiOutlineFileSearch />
                </div>
                <div className="ml-2 font-semibold">
                  {t('posts.results.total')}{' '}
                  <span className="underline text-main">
                    {postPagination.totalElements}
                  </span>{' '}
                  {t('posts.results.jobs')}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="font-semibold" htmlFor="sortBy">
                  {t('posts.select.sortBy.label')}
                </label>
                <Selection
                  id="sortBy"
                  name="sortBy"
                  className="w-44"
                  placeholder={t('posts.select.sortBy.placeholder')}
                  options={[
                    {
                      id: 'createdAt-desc',
                      name: t('posts.select.sortBy.option.latest'),
                    },
                    {
                      id: 'salary-desc',
                      name: t('posts.select.sortBy.option.highestSalary'),
                    },
                    // { id: '', name: 'Cập nhật gần đây' },
                  ]}
                  value={criteria.sortBy}
                  onSelectChange={handleSortByChange}
                />
              </div>
            </div>

            <div className="gap-6 px-2 list-post_search layout-search">
              {isLoading ? (
                loadingSkeleton()
              ) : postSearchResultElms.length ? (
                postSearchResultElms
              ) : (
                <div className="col-span-2">
                  {' '}
                  <EmptyData />
                </div>
              )}
            </div>
            <Pagination
              currentPage={postPagination.currentPage}
              totalPages={postPagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* <UploadCVGif /> */}
    </>
  )
}

function InputSection({
  label,
  htmlFor,
  className,
  children,
}: {
  htmlFor?: string
  label: string
  className?: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className={clns(className, 'flex flex-col gap-2')}>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}
