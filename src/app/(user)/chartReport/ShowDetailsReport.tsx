import CardContainer from '@/src/components/cards/CardContainer';
import CardContainer2 from '@/src/components/cards/CardContainer2';
import CardTextContainer from '@/src/components/cards/CardTextContainer';
import CustomeCard from '@/src/components/cards/CustomeCard';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import { styles } from '@/src/style';
import { ChartListDataItem, defaultChartData } from '@/src/types';
import { hasValue } from '@/src/utils';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Card, Divider } from 'react-native-elements';

const ShowDetailsReport = () => {
    const [chartItem, setChartItem] = useState<ChartListDataItem>(defaultChartData);
    const { data } = useLocalSearchParams();
    const chartDataItem = typeof data === 'string' ? data : data[0];
    console.log('params111111', data);
    // const [data, setData] = useState(null);
    console.log('chartItem', chartItem);

    useEffect(() => {
        // if (typeof params.data === 'string') {
        // console.log('params33333333333', JSON.parse(params.data));
        // data = JSON.parse(params.data)[0];
        !hasValue(chartDataItem) &&
            setChartItem(JSON.parse(chartDataItem));
        // }
    }, [data])


    // console.log('data3213213213', data);

    // const { owner, dueDate, complianceId, nameOfLaw, taskName, description, reviewer } = data !== null || data !== undefined && data;
    // console.log('params222', owner);

    return (
        <CardContainer2>
            <CustomeCard>
                {
                    chartItem?.mapId === 0 ? <CardSkelton /> :
                        <CardTextContainer>
                            <View>
                                <SmallHeading>{'owner'}</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.owner ?? "NA"}</Text>
                                <Divider
                                    color='#A097DC'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 1,
                                    }} />
                                <SmallHeading>{'Complliance Id'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.complianceId}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Name of Law'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.nameOfLaw ?? 'NA'}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Task Description'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.description ?? 'NA'}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Owner'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.owner}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Reviewer'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.reviewer}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Due Date'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{chartItem?.dueDate}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                            </View>
                        </CardTextContainer>
                }
            </CustomeCard>
        </CardContainer2>
    )
}

export default ShowDetailsReport