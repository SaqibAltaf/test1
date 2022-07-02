import React, { useState } from 'react';
import css from './dates.module.css';
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai'
import { useEffect } from 'react';
import cx from 'classnames'


type IDateStripe = {
    selected?: Date
    onSelect ?: (date:Date) => void
}

export const DateStripe = ({selected, onSelect}:IDateStripe) => {
    const [weekDays, setWeekDays] = useState<string[] | []>([]);

    useEffect(()=>{
        getnextWeekDays();
    }, [])


    const getnextWeekDays = () => {
        let curr = weekDays[0] ? new Date(weekDays[weekDays.length]) : new Date(new Date().setDate(new Date().getDate()-1));
        let week = []
        for (let i = 0; i < 7; i++) {
            let day = new Date(curr.setDate(curr.getDate()+1)).toISOString().slice(0, 10)
            week.push(day)
        }
        setWeekDays([...week])
    }

    const getpreviosWeekDays = () => {
        let curr = weekDays[0] ? new Date(weekDays[0]) : new Date();
        let week = []
        for (let i = 0; i < 7; i++) {
            let day = new Date(curr.setDate(curr.getDate()-1)).toISOString().slice(0, 10)
            week.push(day)
        }
        setWeekDays([...week.reverse()])
    }

    return (
        <div style={{display:"flex"}}>
             <div style={{ alignItems: "center", display: "flex" }}>
                <AiFillCaretLeft size={30} color="green" className="cursor" onClick={getpreviosWeekDays} />
            </div>

            <div className={css.box}>
                {
                    weekDays.map((val, key)=>{
                        return(
                            <div onClick={() => onSelect ? onSelect(new Date(val)) : () => { }} className={cx('cursor', [css.boxmodal], { [css.active]: new Date().toDateString() === new Date(val).toDateString(), [css.selected]: selected ? new Date(selected).toDateString() === new Date(val).toDateString() : false })} key={key}>
                                {val}
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ alignItems: "center", display: "flex" }}>
                <AiFillCaretRight size={30} color="green" className="cursor" onClick={getnextWeekDays} />
            </div>

        </div>
    )
}