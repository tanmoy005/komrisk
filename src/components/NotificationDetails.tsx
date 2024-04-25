import React from 'react'
import CardContainer from './cards/CardContainer'
import CardTextContainer from './cards/CardTextContainer'
import { Text, View } from 'react-native'
import { SmallHeading } from './headings/SmallHeading'
import { styles } from '../style'
import DefaultDivider from './seperators/DefaultDivider'
import Seperator33 from './seperators/Seperator33'
import Seperator11 from './seperators/Seperator11'
import Circle from './Circle'
import Seperator29 from './seperators/Seperator29'
import Button from './Button'

const NotificationDetails = () => {

    const watcher = [
        {
            name: 'Name',
            pic: ''
        },
        {
            name: 'Name',
            pic: ''
        },
        {
            name: 'Name',
            pic: ''
        }
    ]
    return (
        <View style={{ ...styles.taskCard, width: '100%' }}>
            <CardContainer>
                <CardTextContainer>
                    {
                        <SmallHeading>{'Heading'}</SmallHeading>
                    }
                    <Seperator33 />
                    <DefaultDivider />
                    <Seperator11 />
                    <View style={styles.directionRowSpaceBetween}>
                        <View>
                            <SmallHeading>{'Notification Date'}</SmallHeading>
                            <Text style={{ ...styles.description, lineHeight: 14 }}>{'MM/DD/YY'}</Text>
                        </View>
                        <View>
                            <SmallHeading>{'Due Date'}</SmallHeading>
                            <Text style={{ ...styles.description, lineHeight: 14 }}>{'MM/DD/YY'}</Text>
                        </View>
                    </View>
                    <Seperator11 />
                    <View>
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
                    </View>
                    <Seperator11 />
                    <DefaultDivider />
                    <Seperator11 />
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{ ...styles.description }}>{'Description here which can sometimes be descriptive hence there is enough space for fitting it here. Description here which can sometimes be descriptive hence there is enough space for fitting it here.Description here which can sometimes be descriptive hence there is enough space for fitting it here'}</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Seperator29 />
                            <Button
                                btnColor={'#A097DC'}
                                text='Close'
                                leftIcon='close'
                                type='md-default'
                            // onPress={handleSubmitSignIn}
                            />
                        </View>
                    </View>

                </CardTextContainer>

            </CardContainer>
        </View>
    )
}

export default NotificationDetails