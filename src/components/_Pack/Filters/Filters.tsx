import './Filters.scss';
import React from "react";
import {SkeletonFilters} from "../Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {Range} from "../../Range/Range";
import {CardsPerPage} from "../../CardsPerPage/CardsPerPage";
import {setCardPerPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

type FiltersType = {
    pageCount?: number
    isCards: string | null
    user_id?: string | undefined
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
}

export const Filters = React.memo(({pageCount,isCards, user_id, value, setValue, minCardsCount, maxCardsCount}: FiltersType) => {
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();
    const changeCardPerPageHandler = (value: number) => {
        dispatch(setCardPerPageAC(value))
    }
    return <div className="filters">
        {isFetch === 'loading' ?
            <SkeletonFilters/> :
            <>
                {!isCards &&
                <Range step={1}
                       user_id={user_id}
                       value={value}
                       setValue={setValue}
                       minCardsCount={minCardsCount}
                       maxCardsCount={maxCardsCount}
                       title={"Number of cards"}
                />}

                <div className="filters__buttons">
                    <NavButton title="Name" iconSvg={TextSvg}/>
                    <NavButton title="Count card" iconSvg={cardsSvg}/>
                    <NavButton title="Last updated" iconSvg={timeSvg}/>
                    <NavButton title="Created by" iconSvg={updateSvg}/>
                </div>
                <CardsPerPage pageCount={pageCount} callBack={changeCardPerPageHandler}/>
            </>
        }
    </div>
});