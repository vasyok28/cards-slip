import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getPacksTC} from "../../pack/s2-bll/PackThunks";
import {Navigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Logo} from "../../../components/_Pages/Logo/Logo";
import {Navigation} from "../../../components/_Pack/Navigation/Navigation";
import {Filters} from "../../../components/_Pack/Filters/Filters";
import {Packs} from "../../../components/_Pack/Packs/Packs";
import {PackStateType} from "../../pack/s2-bll/PackInitState";
import {Cards} from "../../../components/components";

// const logoutHandler = () => {
//     dispatch(logoutTC());
// }


export const ProfilePage = React.memo(() => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const isCards = urlParams.get('id');

    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const {minCardsCount, maxCardsCount} = useSelector<AppStoreType, PackStateType>(state => state.pack);
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    useEffect(() => {
        if (!isCards) {
            dispatch(getPacksTC({user_id: user_id}));
        }
    }, [])

    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <>
            <section className="content">
                <div className="container">
                    <div className="dashboard profiles">
                        <div className="dashboard__container">
                            <div className="header">
                                <div className="header__sidebar">
                                    <Logo isProfile={true}/>
                                </div>
                                <div className="header__navigation">
                                    <Navigation user_id={user_id}/>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <div className="dashboard__sidebar">
                                    <div className="dashboard__indent">
                                        <Filters
                                            isCards={isCards}
                                            user_id={user_id}
                                            value={rangeValue}
                                            setValue={setRangeValue}
                                            minCardsCount={minCardsCount}
                                            maxCardsCount={maxCardsCount}
                                        />
                                    </div>
                                </div>
                                <div className="dashboard__page">
                                    <div className="dashboard__indent dashboard__pack">
                                        {!isCards ? <Packs/> : <Cards/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
});