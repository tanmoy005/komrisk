import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'


const ChartItemSkelton = () => {
    return (
        <ContentLoader  height={100} width={370}>
            <Rect x="0" y="0" rx="4" ry="4" width="300" height="18" />
            <Rect x="0" y="29" rx="4" ry="4" width="300" height="16" />
            <Rect x="0" y="58" rx="4" ry="4" width="300" height="16" />
            <Rect x="0" y="87" rx="4" ry="4" width="300" height="14" />
        </ContentLoader>
    )
}

export default ChartItemSkelton