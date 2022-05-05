export interface Image {
    alt_description: any,
    blur_hash: string,
    categories: any,
    color: string
    created_at: string
    current_user_collections: any,
    description: any,
    downloads: number,
    exif: any,
    height: number,
    id: string,
    liked_by_user: false,
    likes: number,
    links: any,
    location: any,
    promoted_at: string,
    sponsorship: any,
    topic_submissions: any,
    updated_at: string,
    urls: IUrls,
    user: any,
    views: number,
    width: number
}

export interface IUrls {
    raw: string,
    full: string,
    regular: string, 
    small: string, 
    thumb: string, 

}

export interface ImageState {
    images: Image[],
    bgImageUrl: string,
    bgImageIndex: number,
    isLoadingImage: boolean,
    failedToLoadImage: boolean

}