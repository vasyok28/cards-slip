import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";

export type PackInitStateType = GetPackRequestType & {
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    search?: string | null
    packName?: string
    sortPacks?: string
    minCards?: number,
    maxCards?: number,
}

export const PackInitState: PackInitStateType = {
    user_id: undefined,
    cardPacks: [],
    cardPacksTotalCount: 10,
    minCardsCount: 0,
    maxCardsCount: 500,
    page: 1,
    pageCount: 6,
    search: null,
    packName: 'updated',
    sortPacks: 'updated',
    minCards: 0,
    maxCards: 1,
}
