import React, { useState, useEffect } from 'react';
import Searcher from './Searcher';
import Gallery from './Gallery';
import styles from '../styles/App.module.scss';

function App(){
    const APIURL = 'https://api.unsplash.com/search/photos?client_id=ABcViBTBKzZNbIX_vuOQHu-bdhhkk8xE1TcZTmhwY3U&per_page=15';
    const [pictures,setPictures] = useState([]);
    const [noResults,setNoResults] = useState(false);
    const [totalPages,setTotalPages] = useState(0);
    const [pageNum,setPageNum] = useState(0);
    const [currentSearch,setCurrentSearch] = useState('');
    const triggerSearch = (txt) => {
        setCurrentSearch(txt);
        let url = `${APIURL}&query=${txt}`;
        fetch(url).then((response) => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        }).then((response) => {
            return response.json();
        }).then((pics) => {
            setNoResults(false);
            setPictures(pics.results);
            setTotalPages(pics.total_pages);
            setPageNum(1);
            if(pics.total === 0){
                setNoResults(true);
            }
        });
    }
    const fetchMore = () => {
        if(pageNum + 1 <= totalPages){
            let url = `${APIURL}&query=${currentSearch}&page=${pageNum + 1}`;
            fetch(url).then((response) => {
                if(!response.ok){
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                return response.json();
            }).then((pics) => {
                let totalPics = [...pictures,...pics.results];
                console.log(totalPics);
                setPictures(totalPics);
                setPageNum(pageNum + 1);
            });
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return function cleanup() {
            document.removeEventListener('scroll', trackScrolling);
        };
    });
    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
    const trackScrolling = () => {
        const wrappedElement = document.getElementById('Gallery');
        if (isBottom(wrappedElement)) {
            console.log('Gallery bottom reached');
            document.removeEventListener('scroll', trackScrolling);
            fetchMore();
        }
    };
    return (
        <div className={styles.App}>
            <Searcher triggerSearch={triggerSearch} />
            <Gallery pics={pictures} noResults={noResults} />
        </div>
    );
}

export default App;