import { styles } from '@/src/style'
import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'


const CardSkelton = () => {
    return (
        <ContentLoader style={styles.cardContainer} foregroundColor="#E1E1E1">
            <Rect x="0" y="0" rx="4" ry="4" width={styles.cardContainer.width} height={styles.cardContainer.height} />
        </ContentLoader>
    )
}

export default CardSkelton