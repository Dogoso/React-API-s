export default interface IRestantesInfo<T> {
    count: number
    next: string
    previus: string
    results: T[]
}