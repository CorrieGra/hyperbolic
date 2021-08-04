/**
 * @param s optional parameter for the title to search
 * @param y optional parameter for specifying the year of release
 * @param page optional parameter for selecting the page number to return
 * @param type optional parameter for specifying which type to return e.g. movies / series
 * @param r optional parameter for specifying which response type you'd want e.g. 'json'
 * @param i optional parameter for specifying which movie you want to retrieve
 * @param plot optional parameter for specifying if you need a full or short plot
 */
export interface AxiosParams {
    s?: string,
    y?: string,
    page?: string,
    type?: string,
    r?: string
    i?: string,
    plot?: string
}