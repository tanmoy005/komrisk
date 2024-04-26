import { ProofListData, ProofListPayload } from "@/src/types";
import { View } from "../../Themed";
import GetProofDataList from "@/src/server/api-functions/get-proof-data-list";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

type ProofsListDetailsProps = {
    taskId: number,
    type: string,
}

const ProofsListDetails = ({ taskId, type }: ProofsListDetailsProps) => {
    const [proofDataList, setProofDataList] = useState<ProofListData>({});


    const handleGetproofListData = async (payLoad: ProofListPayload) => {
        const { data, error, status } = await GetProofDataList(payLoad);
        if (status === 200) {
            //   const { chartData, title, subTitle, yAxisName, xAxisName } = data;
            setProofDataList(data);
        } else {
            Alert.alert("error", error.message);
        }

    }

    useEffect(() => {
        const updatedPayLoad: ProofListPayload = {
            taskId: taskId,
            objectType: type

        }
        updatedPayLoad
        handleGetproofListData(updatedPayLoad);
    }, [taskId, type]);

    return (
        <View >
        </View>
    );
};

export default ProofsListDetails;
