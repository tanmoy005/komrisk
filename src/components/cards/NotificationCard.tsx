
import { Pressable, Text, View } from 'react-native'
import CardContainer from './CardContainer'
import { styles } from '@/src/style'
import { SmallHeading } from '../headings/SmallHeading'
import { NotificationListDataItem, notificationCardListData } from '@/src/types'
import CardTextContainer from './CardTextContainer'
import { router } from 'expo-router'
import ChartItemSkelton from '../skelton/ChartItemSkelton'
import React, { memo } from 'react';

interface notificationCardListDataProps {
    data: NotificationListDataItem
}




const NotificationCard = memo(({ data }: notificationCardListDataProps) => {
    const CardData: notificationCardListData = {
        firstSection: {
            heading: data.complianceNature,
            description: data.complianceTitle
        },
        secondSection: {
            dateHeading: 'Notification Date',
            date: data.updatedOn,
            // sectionRight:
            // {
            //     dateHeading: 'Notification Date',
            //     date: data.updatedOn,
            // }
        }
    }
    const isObjectEmpty = (objectName: NotificationListDataItem) => {
        return Object.keys(objectName).length === 0
    }
    return (

        <View >
            {
                !isObjectEmpty(data) ?
                    <Pressable
                        onPress={() => router.push({
                            pathname: `/notification/[id]`,
                            params: {
                                type: "NOTIFICATION",
                                id: data?.id,
                                // complianceId: data?.complianceId,
                            }
                        } as never)}
                    >
                        <View style={styles.taskCard}>
                            <View>

                                <CardContainer>
                                    <CardTextContainer>
                                        {
                                            CardData?.firstSection &&
                                            CardData?.firstSection.heading && <SmallHeading>{CardData?.firstSection.heading}</SmallHeading>
                                        }
                                        {
                                            CardData?.firstSection &&
                                            CardData?.firstSection.description &&
                                            <Text style={styles.shortDescription}>{CardData?.firstSection.description?.trim()}</Text>
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
                                                    CardData?.secondSection.dateHeading &&
                                                    <SmallHeading>{CardData?.secondSection.dateHeading}</SmallHeading>
                                                }
                                                {
                                                    CardData?.secondSection.date &&
                                                    <Text style={styles.bodyInfoText}>{CardData?.secondSection.date}</Text>
                                                }
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                columnGap: 14
                                            }}>
                                                {
                                                    CardData?.secondSection?.sectionRight?.dateHeading &&
                                                    <SmallHeading>{CardData?.secondSection?.sectionRight?.dateHeading}</SmallHeading>
                                                }
                                                {
                                                    CardData?.secondSection?.sectionRight?.date &&
                                                    <Text style={styles.bodyInfoText}>{CardData?.secondSection?.sectionRight?.date}</Text>
                                                }
                                            </View>
                                        </View>
                                    </CardTextContainer>
                                </CardContainer>
                            </View>
                        </View>
                    </Pressable>
                    // </Link>
                    :
                    <View style={styles.taskCard}>
                        <CardContainer>
                            <CardTextContainer>
                                <ChartItemSkelton />
                            </CardTextContainer>
                        </CardContainer>
                    </View>
            }
        </View>
    );
});

export default NotificationCard