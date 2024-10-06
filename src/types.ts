
export type State = {
  loading: boolean,
  error: string | null,
  data: ResponseData[] | null,
  current_context: Context,
  current_page: number,
  search_text: string,
  search: Record<string, SearchData>
}

export type ResponseData = {
  id: string,
  urls: { thumb: string, regular: string, small: string },
  user: { name: string, location: string }
}

export type SearchData = {
  data: ResponseData[],
  page: number,
}

export type Context = "default" | "search"