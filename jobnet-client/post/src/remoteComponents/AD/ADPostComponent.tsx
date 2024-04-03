import { PostActiveStatus } from '../../types/post.ts'
import ADPostTable from '../../components/ADPostTable.tsx'

interface PostLoader {
  PostPageParam: object
  col: Record<string, boolean>
  status?: PostActiveStatus | undefined
}
export default function ADPostComponent({loader}: {loader:PostLoader}): JSX.Element {
  return (
    <ADPostTable
      {...loader.PostPageParam}
      col={loader.col}
      status={loader.status}
    ></ADPostTable>
  )
}
