import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import { styles } from '@/src/style';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-elements';
import { CompliancesItemDetailsResponse } from '../../types';

type Props = {
    compliancesItemData: CompliancesItemDetailsResponse;
    itemType: string
};

export default function TaskItemDetails({ compliancesItemData, itemType }: Props) {


    return (
     
            <CardTextContainer>
                <View>
                    <SmallHeading>{'Title'}</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.title ?? "NA"}</Text>
                    <Divider
                        color='#A097DC'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 1,
                        }} />
                    <SmallHeading>{'Complliance Id'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.complianceId ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Section'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.section ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Task Description'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.description ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Law Name'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.lawName ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Law Type'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.lawType ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Regulator'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.regulator ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Penalty'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.penality ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Law Category'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{compliancesItemData?.lawCategory ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                </View>
            </CardTextContainer>
        
    )
}
