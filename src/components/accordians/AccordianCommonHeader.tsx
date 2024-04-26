import { AccordianCommonHeaderProps } from '@/src/types';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SmSectionSeperator from '../seperators/SmSectionSeperator';
import InputField from '../input-fields/InputField';
import Button from '../Button';
import { smFont, styles } from '@/src/style';



const AccordianCommonHeader = ({ title, descriptions, icons, expanded, setExpanded, type = 'chevron' }: AccordianCommonHeaderProps) => {
    const shortDescription = descriptions && descriptions.length > 64 ? `${descriptions.slice(0, 64)}...` : descriptions;

    function toggleItem() {
        setExpanded(!expanded);
    }
    const [first, setfirst] = useState('second');
    const handleSubmitComment = () => {

    }
    return (
        <TouchableOpacity onPress={toggleItem}>
            <View style={styles.accodianHeaderContainer}>
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.accordTitle}>{title}</Text>
                        {/* <Text style={styles.shortDescription}>{shortDescription}</Text> */}
                        <Text style={styles.shortDescription}>{shortDescription}</Text>
                    </View>
                    <View style={{right : 16}}>
                        <Icon name={expanded ? icons.open : icons.close}
                            size={24} color="#26262C" />
                    </View>
                </View>
                {
                    type === 'comment' &&
                    <View>
                        <SmSectionSeperator />

                        <View>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.bodyInfoText}>Name</Text>
                                <Text style={styles.bodyInfoText}>DD/MM/YY   16:30</Text>
                            </View>
                            <SmSectionSeperator />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.commentInputContainer}>
                                    <InputField
                                        value=''
                                        setInput={setfirst}
                                        placeholder='Write here...'
                                        type='2'
                                    />
                                </View>
                                <View >

                                    <Button
                                        btnColor={'#A097DC'}
                                        type='btnIcon'
                                        icon='chevron-right'
                                        style={{
                                            width: 40,
                                            height: 40,
                                            // padding: 10,
                                            // paddingVertical: 20,
                                            // paddingHorizontal: 48,
                                            fontWeight: '400',
                                            fontSize: 20,
                                            borderRadius: 5
                                        }}
                                        onPress={handleSubmitComment}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}


export default AccordianCommonHeader