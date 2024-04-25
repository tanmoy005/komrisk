import { Pressable, View } from "react-native"
import Button from "../Button"
import { styles } from "@/src/style"
import { BtnFilterHeaderProps } from "@/src/types"



const BtnFilterHeader = ({ firstBtnName, fistBtnOnpress, secondBtnName, secondBtnOnpress }: BtnFilterHeaderProps) => {


    return (
        <View style={styles.btnFilterHeaderContainer}>

            <Button
                btnColor={'#A097DC'}
                text={firstBtnName}
                type='sm'
                style={{
                    color: '#F7F7F8'
                }}
                onPress={fistBtnOnpress}
            />
            <Button
                btnColor={'#EBF6FB'}
                text={secondBtnName}
                type='sm'
                style={{
                    color: '#97979A'
                }}
                onPress={secondBtnOnpress}
            />
        </View>
    )
}
export default BtnFilterHeader