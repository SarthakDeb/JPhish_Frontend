import React from 'react'

function ArticleCard(props) {
  return (
    <div className='p-5 bg-gray-700/50 rounded-lg h-[30vh] w-[300px] flex flex-col'>
        <div className='text-white text-xl font-semibold w-full p-2'>
            {props.article.title}</div>
        <div className='text-blue-500 cursor-pointer text-wrap overflow-hidden  w-full p-2'>
            {props.article.link}</div>
    </div>
  )
}

export default ArticleCard;