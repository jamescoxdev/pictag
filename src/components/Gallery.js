import React from 'react';
import Masonry from 'react-masonry-css'
import styles from '../styles/Gallery.module.scss';

function Gallery({pics,noResults}){
    return(
        <div id="Gallery" className={styles.Gallery}>
            {
                noResults ?
                <p className={styles.noResults}>No Result Found, try searching for another tag...</p> :
                <Masonry
                    breakpointCols={{
                        default: 4,
                        1100: 3,
                        700: 2,
                        500: 1
                    }}
                    className={styles.myMasonryGrid}
                    columnClassName={styles.myMasonryGridColumn}
                >
                    {pics.map((p,i) => {
                        return <div className={styles.pic} key={i}>
                            <img alt={p.alt_description} src={p.urls.thumb} />
                        </div>
                    })}
                </Masonry>
            }
        </div>
    )
}

export default Gallery;