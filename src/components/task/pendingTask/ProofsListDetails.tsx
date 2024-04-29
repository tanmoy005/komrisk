
import { ProofListData, ProofListPayload, Item, ProofsListDetailsProps } from "@/src/types";
import { View } from "../../Themed";
import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
import React, { useEffect, useState } from "react";
import { Alert, RefreshControl } from "react-native";
import { Text } from 'react-native';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
//import { styles } from '@/src/style';
import { FlatList, StyleSheet } from 'react-native';
import { screenHeight } from "@/src/style";




const ProofsListDetails = ({ taskId, type }: ProofsListDetailsProps) => {
    const [refreshing, setRefreshing] = useState(true);

    const [proofDataList, setProofDataList] = useState<ProofListData[]>([{}]);


    const handleGetproofListData = async (payLoad: ProofListPayload) => {
        const { data, error, status } = await GetProofDataList(payLoad);
        //console.log("data",data);


        if (status === 200) {
            const { aaData } = data
            //   const { chartData, title, subTitle, yAxisName, xAxisName } = data;
            setProofDataList(aaData);
            setRefreshing(false);

        } else {
            Alert.alert("error", error.message);
        }

    }

    const onRefresh = React.useCallback(() => {
        const defaultPayload: ProofListPayload = {
            taskId: taskId,
            objectType: type
        }
        handleGetproofListData(defaultPayload)
        setRefreshing(true);
    }, []);

    useEffect(() => {
        const updatedPayLoad: ProofListPayload = {
            taskId: taskId,
            objectType: type

        }
        updatedPayLoad
        handleGetproofListData(updatedPayLoad);
    }, [taskId, type]);

    //console.log("data**",(proofDataList));


    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.titleContainer}>
            <Text>{`${item.docTitle}.${item.extension}`}</Text>
        </View>
    );



    return (
        <View >
            <FlatList showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={proofDataList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={{ height: screenHeight * 0.5 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 50,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: '#eee',
        height: 70,
        backgroundColor: '#A097DC29',
        borderRadius: 5,
        position: 'relative',
        marginBottom: 10, // Add margin bottom for gap between containers
    },
    chartContainer: {

        padding: 10
    },


});


export default ProofsListDetails;