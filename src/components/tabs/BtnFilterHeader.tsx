import Button from "@/src/components/Button";
import { styles } from "@/src/style";
import { BtnFilterHeaderProps } from "@/src/types";
import { useState } from "react";
import { View } from "react-native";

const BtnFilterHeader = ({ firstBtnName, fistBtnOnpress, secondBtnName, secondBtnOnpress }: BtnFilterHeaderProps) => {
    const [firstButtonSelected, setFirstButtonSelected] = useState<boolean>(true);
    const [secondButtonSelected, setSecondButtonSelected] = useState<boolean>(false);

    const _secondBtnOnpress = () => {
        setSecondButtonSelected(true);
        setFirstButtonSelected(false);
        secondBtnOnpress();
    };

    const _fistBtnOnpress = () => {
        setSecondButtonSelected(false);
        setFirstButtonSelected(true);
        fistBtnOnpress();
    };

    return (
        <View style={styles.btnFilterHeaderContainer}>
            <Button
                selectedBtnColor={'#A097DC'}
                selectedTextColor={'#F7F7F8'}
                btnColor={'#EBF6FB'}
                text={firstBtnName}
                //type='sm'
                style={{ color: '#97979A' }}
                selected={firstButtonSelected}
                onPress={_fistBtnOnpress}
            />
            {secondBtnName && (
                <Button
                    selectedBtnColor={'#A097DC'}
                    selectedTextColor={'#F7F7F8'}
                    btnColor={'#EBF6FB'}
                    text={secondBtnName}
                    //type='sm'
                    style={{ color: '#97979A' }}
                    selected={secondButtonSelected}
                    onPress={_secondBtnOnpress}
                />
            )}
        </View>
    );
};

export default BtnFilterHeader;
