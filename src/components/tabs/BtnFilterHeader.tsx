import { View } from "react-native"
import Button from "../Button"
import { styles } from "@/src/style"
import { BtnFilterHeaderProps } from "@/src/types"
import { useState } from "react"



const BtnFilterHeader = ({ firstBtnName, fistBtnOnpress, secondBtnName, secondBtnOnpress }: BtnFilterHeaderProps) => {
    const [firstButtonSelected, setfirstButtonSelected] = useState<boolean>(true);
    const [secondButtonSelected, setSecondButtonSelected] = useState<boolean>(false);

    const _secondBtnOnpress = () => {
        setSecondButtonSelected(true);
        setfirstButtonSelected(false);
        secondBtnOnpress();
    }
    const _fistBtnOnpress = () => {
        setSecondButtonSelected(false);
        setfirstButtonSelected(true);
        fistBtnOnpress();
    }

    return (
        <View style={styles.btnFilterHeaderContainer}>

            <Button
                selectedBtnColor={'#A097DC'}
                selectedTextColor={'#F7F7F8'}
                btnColor={'#EBF6FB'}
                text={firstBtnName}
                type='sm'
                style={{
                    color: '#97979A'
                }}
                selected={firstButtonSelected}
                onPress={_fistBtnOnpress}
            />
            <Button
                selectedBtnColor={'#A097DC'}
                selectedTextColor={'#F7F7F8'}
                btnColor={'#EBF6FB'}
                text={secondBtnName}
                type='sm'
                style={{
                    color: '#97979A'
                }}
                selected={secondButtonSelected}
                onPress={_secondBtnOnpress}
            />
        </View>
    )
}
export default BtnFilterHeader