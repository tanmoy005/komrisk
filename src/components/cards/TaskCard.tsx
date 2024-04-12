import React from 'react'
import { Text, View } from 'react-native'
import CardContainer from './CardContainer'
import { styles } from '@/src/style'
import SmSectionSeperator from '../seperators/SmSectionSeperator'
import { SmallHeading } from '../headings/SmallHeading'
import Circle from '../Circle'
import { taskCardData } from '@/src/types'
import CardTextContainer from './CardTextContainer'

interface taskCardDataProp {
    taskCard: taskCardData
}

const TaskCard = ({ taskCard }: taskCardDataProp) => {

    const { firstSection, secondSection, thirdSection } = taskCard;
    //    const {heading:} = firstSection;

    return (
        <View style={styles.taskCard}>
            <View>

                <CardContainer>
                    <CardTextContainer>
                        {
                            firstSection &&
                            firstSection.heading && <SmallHeading>{firstSection.heading}</SmallHeading>
                        }
                        {
                            firstSection &&
                            firstSection.description &&
                            <Text style={styles.shortDescription}>{firstSection.description?.trim()}</Text>
                        }
                        <SmSectionSeperator />
                        {
                            secondSection &&
                            secondSection.heading &&
                            <SmallHeading>{secondSection.heading}</SmallHeading>
                        }
                        {
                            secondSection && secondSection.description &&
                            <Text style={styles.shortDescription}>{secondSection.description?.trim()}</Text>
                        }
                    </CardTextContainer>
                </CardContainer>
                <CardContainer styles={{
                    backgroundColor: 'rgba(120, 106, 205, 0.08)'
                }}>
                    <CardTextContainer>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                            // columnGap: 24
                        }}>
                            <View style={{ width: 120 }}>
                                {
                                    thirdSection.dateHeading &&
                                    <SmallHeading>{thirdSection.dateHeading}</SmallHeading>
                                }
                                {
                                    thirdSection.date &&
                                    <Text style={styles.bodyInfoText}>{thirdSection.date}</Text>
                                }
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                columnGap: 14
                            }}>
                                {
                                    thirdSection.sectionRight && thirdSection.sectionRight.map(({ taskDesg, name, pic }, index) => {
                                        return (
                                            <View key={index} style={styles.taskCardBottomRightSection}>
                                                <SmallHeading>{taskDesg}</SmallHeading>
                                                {pic ? pic :
                                                    <Circle />
                                                }
                                                <Text style={styles.bodyInfoText}>{name}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </CardTextContainer>
                </CardContainer>
            </View>
        </View>
    )
}

export default TaskCard