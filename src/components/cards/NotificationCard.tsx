import { Pressable, Text, View } from 'react-native';
import CardContainer from '@/src/components/cards/CardContainer';
import { styles } from '@/src/style';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import { NotificationListDataItem, notificationCardListData, notificationSeen } from '@/src/types';
import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { router, usePathname } from 'expo-router';
import ChartItemSkelton from '@/src/components/skelton/ChartItemSkelton';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import moment from 'moment';

interface NotificationCardListDataProps {
    data: NotificationListDataItem;
}

const NotificationCard = memo(({ data = {} as NotificationListDataItem }: NotificationCardListDataProps) => {
    const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
    const userDetails = useSelector((state: RootState) => state.authUserDetails.payload)?.userDetails;
    const { username: loggedInUserId } = userDetails || {};
    const currentPath = usePathname();
    const [isNotificationSeen, setIsNotificationSeen] = useState<boolean>(false); // Ensure setIsNotificationSeen is typed as boolean
    const seenCardBorderColor = 'rgba(120, 106, 205, 0.8)';
    const unseenCardBorderColor = 'rgba(120, 106, 205, 0.16)';

    useEffect(() => {
        if (currentPath === '/notification/notification_tab/alertsnotificationList') {
            const selectedUser = notificationSeenList?.find(({ userId }) => userId === loggedInUserId?.toString());
            // Check if selectedUser and notificationIdList are defined before setting state
            setIsNotificationSeen(!!selectedUser && selectedUser.notificationIdList.includes(data.id.toString()));
        }
    }, [currentPath, notificationSeenList, loggedInUserId, data.id]);

    const CardData: notificationCardListData = {
        firstSection: {
            heading: data.complianceNature,
            description: data.complianceTitle,
        },
        secondSection: {
            dateHeading: 'Notification Date',
            date: moment(data.updatedOn).format('YYYY-MM-DDTHH:mm:ssZ'), // Ensure date is in ISO format
        },
    };

    const isObjectEmpty = (objectName: NotificationListDataItem) => {
        return Object.keys(objectName).length === 0;
    };

    return (
        <View>
            {!isObjectEmpty(data) ? (
                <Pressable
                    onPress={() =>
                        router.push({
                            pathname: `/notification/[id]`,
                            params: {
                                type: 'NOTIFICATION',
                                id: data.id,
                                complianceId: data.complianceId,
                                complianceTitle: data.complianceTitle,
                                newValue: data.newValue,
                                lawNames: data.lawNames,
                                updatedOn: data.updatedOn,
                            },
                        } as never)
                    }
                >
                    <View style={{ ...styles.taskCard, borderColor: isNotificationSeen ? seenCardBorderColor : unseenCardBorderColor }}>
                        <View>
                            <CardContainer>
                                <CardTextContainer>
                                    {CardData?.firstSection?.heading && <SmallHeading>{CardData.firstSection.heading}</SmallHeading>}
                                    {CardData?.firstSection?.description && (
                                        <Text style={styles.shortDescription}>{CardData.firstSection.description.trim()}</Text>
                                    )}
                                </CardTextContainer>
                            </CardContainer>
                            <CardContainer
                                styles={{
                                    backgroundColor: 'rgba(120, 106, 205, 0.08)',
                                }}
                            >
                                <CardTextContainer>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <View style={{ width: 120 }}>
                                            {CardData?.secondSection.dateHeading && <SmallHeading>{CardData.secondSection.dateHeading}</SmallHeading>}
                                            {CardData?.secondSection.date && <Text style={styles.bodyInfoText}>{CardData.secondSection.date}</Text>}
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                columnGap: 14,
                                            }}
                                        >
                                            {CardData?.secondSection?.sectionRight?.dateHeading && (
                                                <SmallHeading>{CardData.secondSection.sectionRight.dateHeading}</SmallHeading>
                                            )}
                                            {CardData?.secondSection?.sectionRight?.date && (
                                                <Text style={styles.bodyInfoText}>{CardData.secondSection.sectionRight.date}</Text>
                                            )}
                                        </View>
                                    </View>
                                </CardTextContainer>
                            </CardContainer>
                        </View>
                    </View>
                </Pressable>
            ) : (
                <View style={styles.taskCard}>
                    <CardContainer>
                        <CardTextContainer>
                            <ChartItemSkelton />
                        </CardTextContainer>
                    </CardContainer>
                </View>
            )}
        </View>
    );
});

export default NotificationCard;
