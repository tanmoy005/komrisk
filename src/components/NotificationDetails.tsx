// import React from 'react'
// import CardContainer from './cards/CardContainer'
// import CardTextContainer from './cards/CardTextContainer'
// import { Text, View } from 'react-native'
// import { SmallHeading } from './headings/SmallHeading'
// import { styles } from '../style'
// import DefaultDivider from './seperators/DefaultDivider'
// import Seperator33 from './seperators/Seperator33'
// import Seperator11 from './seperators/Seperator11'
// import Circle from './Circle'
// import Seperator29 from './seperators/Seperator29'
// import Button from './Button'
// import { router } from 'expo-router';


// const NotificationDetails = () => { 

//     return (
//         <View style={{ ...styles.taskCard, width: '100%' }}>
//             <CardContainer>
//                 <CardTextContainer>
//                     {
//                         <SmallHeading>{'Heading'}</SmallHeading>
//                     }
//                     <Seperator33 />
//                     <DefaultDivider />
//                     <Seperator11 />
//                     <View style={styles.directionRowSpaceBetween}>
//                         <View>
//                             <SmallHeading>{'Notification Date'}</SmallHeading>
//                             <Text style={{ ...styles.description, lineHeight: 14 }}>{'MM/DD/YY'}</Text>
//                         </View>
//                         <View>
//                             <SmallHeading>{'Due Date'}</SmallHeading>
//                             <Text style={{ ...styles.description, lineHeight: 14 }}>{'MM/DD/YY'}</Text>
//                         </View>
//                     </View>
//                     <Seperator11 />
//                     {/* <View>
//                         <SmallHeading>{'Watcher'}</SmallHeading>
//                         <View style={{
//                             flexDirection: 'row',
//                             columnGap: 14
//                         }}>
//                             {
//                                 watcher && watcher.map(({ name, pic }, index) => {
//                                     return (
//                                         <View key={index} style={{ ...styles.taskCardBottomRightSection, alignItems: 'flex-start' }}>
//                                             {pic ? pic :
//                                                 <Circle />
//                                             }
//                                             <Text style={styles.bodyInfoText}>{name}</Text>
//                                         </View>
//                                     )
//                                 })
//                             }
//                         </View>
//                     </View> */}
//                     <Seperator11 />
//                     <DefaultDivider />
//                     <Seperator11 />
//                     <View style={{ justifyContent: 'space-between' }}>
//                         <Text style={{ ...styles.description }}>{'Description here which can sometimes be descriptive hence there is enough space for fitting it here. Description here which can sometimes be descriptive hence there is enough space for fitting it here.Description here which can sometimes be descriptive hence there is enough space for fitting it here'}</Text>
//                         <View style={{ alignItems: 'flex-end' }}>
//                             <Seperator29 />
//                             <Button
//                                 btnColor={'#A097DC'}
//                                 text='Back'
//                                 leftIcon='chevron-left'
//                                 type='md-default'
//                                 onPress={() => router.navigate('/notification/notification_tab/alertsnotificationList')}

//                             />
//                         </View>
//                     </View>

//                 </CardTextContainer>

//             </CardContainer>
//         </View>
//     )
// }

// export default NotificationDetails


// ============================= Updated on 28-05-2024 ================================= //

import React from 'react'
import CardContainer from './cards/CardContainer'
import CardTextContainer from './cards/CardTextContainer'
import { ScrollView, Text, View } from 'react-native'
import { SmallHeading } from './headings/SmallHeading'
import { styles } from '../style'
import DefaultDivider from './seperators/DefaultDivider'
import Seperator33 from './seperators/Seperator33'
import Seperator11 from './seperators/Seperator11'
import Circle from './Circle'
import Seperator29 from './seperators/Seperator29'
import Button from './Button'
import { router } from 'expo-router';
import { NotificationOverViewProps } from '@/src/types'

const NotificationDetails = ({ notificationDetails }: NotificationOverViewProps) => {

    console.log("Notification Details got here", notificationDetails);


    return (
        <ScrollView style={{ ...styles.taskCard, width: '100%' }} showsVerticalScrollIndicator = {false}>
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
    )
}

export default NotificationDetails