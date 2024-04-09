import { styles } from '@/src/style'
import React, { PropsWithChildren } from 'react'
import { Card } from 'react-native-elements'

const CustomeCard = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <Card containerStyle={styles.cardStyle2}>
            {children}
        </Card>
    )
}

export default CustomeCard