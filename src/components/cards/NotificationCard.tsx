
import { Pressable, Text, View } from 'react-native'
import CardContainer from '@/src/components/cards/CardContainer'
import { styles } from '@/src/style'
import { SmallHeading } from '@/src/components/headings/SmallHeading'
import { NotificationListDataItem, notificationCardListData, notificationSeen } from '@/src/types'
import CardTextContainer from '@/src/components/cards/CardTextContainer'
import { router, usePathname } from 'expo-router'
import ChartItemSkelton from '@/src/components/skelton/ChartItemSkelton'
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '@/src/store'

interface notificationCardListDataProps {
    data: NotificationListDataItem
}




const NotificationCard = memo(({ data }: notificationCardListDataProps) => {
    const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
    console.log('notificationSeenList4234', notificationSeenList);
    const userDetails = useSelector((state: RootState) => state.authUserDetails.payload).userDetails;
    console.log('userDetails', userDetails);
    const { username: loggedInUserId } = userDetails;
    const currentPath = usePathname();
    console.log('currentPath', currentPath);
    const [isNotificationSeen, setisNotificationSeen] = useState(false);
    const seenCardborderColor = 'rgba(120, 106, 205, 0.8)';
    const unseenCardborderColor = 'rgba(120, 106, 205, 0.16)';
    useEffect(() => {
        //console.log('data', data.id);
        if (currentPath === '/notification/notification_tab/alertsnotificationList') {
            const selectedUser = notificationSeenList.filter(({ userId }) => userId === loggedInUserId?.toString())[0];
            console.log('selectedUser', selectedUser);
            setisNotificationSeen(selectedUser && selectedUser.notificationIdList.includes(data.id.toString()));
        }

        //   if (notificationSeenList.includes(selectedUser.userId)) {

        //   }

    }, [currentPath])


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
                                complianceId: data?.complianceId,
                                complianceTitle: data?.complianceTitle,
                                newValue: data?.newValue,
                                lawNames: data?.lawNames,
                                updatedOn: data?.updatedOn
                            }
                        } as never)}
                    >
                        <View style={{ ...styles.taskCard, borderColor: isNotificationSeen ? seenCardborderColor : unseenCardborderColor }}>
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