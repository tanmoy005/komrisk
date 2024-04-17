import React from 'react'
import { Text, View } from 'react-native'
import CardContainer from './CardContainer'
import { styles } from '@/src/style'
import SmSectionSeperator from '../seperators/SmSectionSeperator'
import { SmallHeading } from '../headings/SmallHeading'
import Circle from '../Circle'
import { taskCardData } from '@/src/types'
import CardTextContainer from './CardTextContainer'

interface OptionCardProps {
    value: number;
    label: string;
}

const FilterOptionCard = ({ value, label }: OptionCardProps) => {

    //    const {heading:} = firstSection;

    return (
        <View style={styles.taskCard}>
            <View>
                <CardContainer>
                    <CardTextContainer>
                        {
                            label && <SmallHeading>{label}</SmallHeading>
                        }
                    </CardTextContainer>
                </CardContainer>
            </View>
        </View>
    )
}

export default FilterOptionCard