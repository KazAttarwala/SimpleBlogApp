export interface Comment {
    text: string,
    postedBy: string
}

export interface ArticleInfo {
    comments: Comment[],
    upvotes: number,
    canUpvote: boolean
}