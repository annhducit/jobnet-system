import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../../utils/auth.ts'
import { PostActiveStatus } from '../../types/post.ts'

import ADPostComponent from 'Post/AD/ADPostComponent'

interface PostLoader {
  PostPageParam: object
  col: Record<string, boolean>
  status?: PostActiveStatus | undefined
}
const PostPageParam = {
  posts: {},
  postsPending: { isExpired: 'false', activeStatus: 'Pending' },
  postsOpening: { isExpired: 'false', activeStatus: 'Opening' },
  postsExpired: { isExpired: 'true', activeStatus: 'Opening,Stopped,Closed' },
  postsBlocked: { activeStatus: 'Blocked' },
}

const columns: Record<string, boolean> = {
  search: true,
  businessName: true,
  recruiterName: true,
  totalViews: true,
  salary: true,
  applicationDeadline: true,
  activeStatus: true,
  action: true,
}

ADPost.loader = async function ({
  request,
}: {
  request: Request
}): Promise<PostLoader> {
  requireAuth(request, 'Admin')

  const url = request.url.split('/')
  const type = url[url.length - 1].trim()

  if (type === 'pending') {
    return Promise.resolve({
      status: 'Pending',
      PostPageParam: PostPageParam.postsPending,
      col: {
        ...columns,
        activeStatus: false,
        recruiterName: false,
        totalViews: false,
      },
    })
  } else if (type === 'opening') {
    return Promise.resolve({
      status: 'Opening',
      PostPageParam: PostPageParam.postsOpening,
      col: { ...columns, activeStatus: false, recruiterName: false },
    })
  } else if (type === 'expired') {
    return Promise.resolve({
      status: 'Closed',
      PostPageParam: PostPageParam.postsExpired,
      col: { ...columns },
    })
  } else if (type === 'blocked') {
    return Promise.resolve({
      status: 'Blocked',
      PostPageParam: PostPageParam.postsBlocked,
      col: { ...columns },
    })
  }

  return Promise.resolve({
    status: undefined,
    PostPageParam: PostPageParam.posts,
    col: { ...columns, recruiterName: false },
  })
}

export default function ADPost(): JSX.Element {
  const loader = useLoaderData() as PostLoader
  return (
    <>
      <ADPostComponent loader={loader} />
    </>
  )
}
