import CardContainer from '@/src/components/cards/CardContainer';
import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import DefaultDivider from '@/src/components/seperators/DefaultDivider';
import Seperator11 from '@/src/components/seperators/Seperator11';
import Seperator33 from '@/src/components/seperators/Seperator33';
import { styles } from '@/src/style';
import { NotificationOverViewProps } from '@/src/types';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Button from '@/src/components/Button';
import Seperator29 from '@/src/components/seperators/Seperator29';

const NotificationDetails = ({ notificationDetails }: NotificationOverViewProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching process
        if (notificationDetails) {
            setLoading(false);
        }
    }, [notificationDetails]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#A097DC" />
            </View>
        );
    }

    return (
        <ScrollView style={{ ...styles.taskCard, width: '100%' }} showsVerticalScrollIndicator={false}>
            <CardContainer>
                <CardTextContainer>
                    <View>
                        <SmallHeading>{'Heading'}</SmallHeading>
                        <Text style={styles.description}>{notificationDetails?.compliance_title ?? "NA"}</Text>
                    </View>

                    <Seperator33 />
                    <DefaultDivider />
                    <Seperator11 />
                    <View style={styles.directionRowSpaceBetween}>
                        <View>
                            <SmallHeading>{'Notification Date'}</SmallHeading>
                            <Text style={{ ...styles.description, lineHeight: 14 }}>{notificationDetails?.notification_date ?? "NA"}</Text>
                        </View>
                        {/* <View>
                            <SmallHeading>{'Due Date'}</SmallHeading>
                            <Text style={{ ...styles.description, lineHeight: 14 }}>{'MM/DD/YY'}</Text>
                        </View> */}
                    </View>
                    <Seperator11 />
                    {/* <View>
                        <SmallHeading>{'Watcher'}</SmallHeading>
                        <View style={{
                            flexDirection: 'row',
                            columnGap: 14
                        }}>
                            {
                                watcher && watcher.map(({ name, pic }, index) => {
                                    return (
                                        <View key={index} style={{ ...styles.taskCardBottomRightSection, alignItems: 'flex-start' }}>
                                            {pic ? pic :
                                                <Circle />
                                            }
                                            <Text style={styles.bodyInfoText}>{name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View> */}
                    <Seperator11 />
                    <DefaultDivider />
                    <Seperator11 />
                    <View style={{ justifyContent: 'space-between' }}>
                        <SmallHeading>{'Notification Details'}</SmallHeading>
                        <Text style={{ ...styles.description }}>{notificationDetails?.description?.trim() ? notificationDetails.description : "NA"}</Text>
                        <Seperator33 />
                        <DefaultDivider />
                        <Seperator11 />
                        <SmallHeading>{'Law Name'}</SmallHeading>
                        <Text style={{ ...styles.description }}> {notificationDetails?.name_of_law?.trim() ? notificationDetails.name_of_law : "NA"}</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Seperator29 />
                            <Button
                                btnColor={'#A097DC'}
                                text='Back'
                                leftIcon='chevron-left'
                                type='md-default'
                                onPress={() => router.navigate('/notification/notification_tab/alertsnotificationList')}
                            />
                        </View>
                    </View>
                </CardTextContainer>
            </CardContainer>
        </ScrollView>
    );
}

export default NotificationDetails;
