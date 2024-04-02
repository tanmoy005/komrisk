import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'


const CardSkelton = () => {
    return (
        <ContentLoader style={{width: 300, height: "100%"}} foregroundColor ="#E1E1E1">
            <Rect  x="0" y="0" rx="4" ry="4" width="300" height="500" />
        </ContentLoader>
    )
}

export default CardSkelton