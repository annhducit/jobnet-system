//post
declare module 'Post/services' {
  export function getPostById(id: string): Promise<PostType>
  export function getPosts(props?: Param): Promise<PaginationType<PostType>>
}
declare module 'Post/type' {
  export default PostType
}
declare module 'Post/FeatureJobs'
declare module 'Post/PostsSearch'
declare module 'Post/Post'
declare module 'Post/HiringPosts'
declare module 'Post/FavoritePosts'
declare module 'Post/PostsApplied'

declare module 'Post/Wishlist' {
  export function getWishlists(props: {
    page?: number
    pageSize?: number
    sortBy?: string
  }): Promise<PaginationType<WishlistType>>
  export function existsWishlist(postId: string): Promise<boolean>
  export function createWishlist(postId: string): Promise<WishlistType>
  export function deleteWishlist(postId: string): Promise<void>
  export default WishlistType
}
declare module 'Post/Category' {
  // export const apiBaseUrl:string
  // export const axios:any
  export function deleteCategoryById(id: string): Promise<void>
  export function updateCategory(id: string, name: string): Promise<CategoryType>
  export function createCategory(name: string): Promise<CategoryType>
  export function getCategories(props?: { search?: string }): Promise<CategoryType[]>
  export default CategoryType
}

declare module 'Post/Application' {
  export function getApplications(props?: {
    jobSeekerId?: string | undefined;
    page?: number;
    pageSize?: number;
    status?: ApplicationStatus;
}): Promise<PaginationType<ApplicationType>>

  export function getApplicationsByRecruiterId(props?: {
    page?: number
    pageSize?: number
    sortBy?: string
    applicationStatuses?: Array<ApplicationStatus>
    fromDate?: string
    toDate?: string
  }): Promise<PaginationType<ApplicationType>>
  
  export function createApplication(data: FormData): Promise<ApplicationType>
  export function updateApplicationStatus(
    id: string,
    applicationStatus: ApplicationStatus
  ): Promise<ApplicationType>
  export function isSubmitted(postId: string ): Promise<boolean>
  export default ApplicationType
}

declare module 'Post/Evaluation' {
  export default EvaluationType
  export function getEvaluationByResumeId(id: string): Promise<EvaluationType>
  export function getEvaluationByAuth(id: string): Promise<EvaluationType[]>
  export function createEvaluation(id: string, comment: string | undefined): Promise<EvaluationType>
  export function createComment(id: string, comment: string | undefined): Promise<EvaluationType>
  export function deleteEvaluation(id: string): Promise<void>
  export function deleteComment(evaluationId: string, commentId: string): Promise<void>
  export interface CommentType{
    id: string
    content: string
    createdAt: string
  }
}

