import React, { useState } from 'react';
import Search from '@material-ui/icons/Search';
import styles from '../styles/Searcher.module.scss';

function Searcher({triggerSearch}){
    const [searchTxt,setSearchTxt] = useState('');
    const searchOnChange = (event) => {
        setSearchTxt(event.target.value);
    }
    const searchKeyPress = (key) => {
        if(key.which === 13){
            triggerSearch(searchTxt);
            setTimeout(() => {
                setSearchTxt('');
            }, 100);
        }
    }
    return(
        <div className={styles.searchContainer}>
            <div className={styles.gradient}></div>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0 L 1,0 C .85 .15, .85 1, 0.7 1 L 0,1 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.Searcher}>
                <input
                    className={styles.searchBox}
                    type="text"
                    name="PicTagSearch"
                    placeholder="Type a tag to search"
                    value={searchTxt}
                    onChange={searchOnChange}
                    onKeyPress={searchKeyPress}
                />
                <button className={styles.searchBtn} onClick={() => { triggerSearch(searchTxt) }}>
                    <Search />
                </button>
            </div>
        </div>
    )
}

export default Searcher;