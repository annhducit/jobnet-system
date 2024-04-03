import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import JobItemSkeleton from 'Common/skeleton/JobItemSkeleton'
import JobItem from 'Common/JobItem'

import postService from '../../services/postService'

export default function FeatureJobs() {
  const params = {
    isExpired: false,
    activeStatus: 'Opening',
  }
  const [jobItems, setElms] = useState<JSX.Element[]>(() =>
    Array.from({ length: 6 }, (_, i) => <JobItemSkeleton key={i} />)
  )

  useEffect(() => {
    const loadData = async () => {
      const data = await postService.getPosts(params)
      setElms(() =>
        data.data
          .slice(0, 9)
          .map((post) => <JobItem key={post.id} data={post} />)
      )
    }
    loadData().catch((err) => {
      console.log(err)
      toast.error('Không thể tải dữ liệu')
    })
  }, [])
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
      {jobItems}
    </div>
  )
}
