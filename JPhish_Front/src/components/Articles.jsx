import React, { useEffect, useState } from 'react'
import axios from "axios"
import ArticleCard from './ArticleCard';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        axios.get("https://newsdata.io/api/1/latest?apikey=pub_63387c386243bfdc3769970a37ac444ae5f65&q=cyber&language=en")
        .then((response)=>{
            console.log(response.data.results)
            setArticles(response.data.results)})
        .catch(e => console.log(e))
    },[]);
  return (
    <div className=' mt-8 mb-4'>
        <h3 className='p-5 mb-4 font-extrabold text-4xl text-white'>&#9614; Articles to read </h3>
        <div className="flex justify-evenly flex-wrap gap-3">
        {articles.slice(0,4).map((article)=>{
            return <ArticleCard article={article} />
        })}
        </div>
    </div>
  )
}

export default Articles;

