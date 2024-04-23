import { size12, size24, styles } from '@/src/style'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import DropDown from '../CustomeDropDown'
import { FilterDropdownProps } from '@/src/types'
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomeDropDown from '../CustomeDropDown'


const FilterDropdown = ({
    filterType,
    setFilterType,
    filterTypes,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen,
    labelPosition = 'V',
    handleOnpressFilterItem
}: FilterDropdownProps) => {

    const leftIcon = () => <MuiIcon name="filter" size={size24} color="rgba(160, 151, 220, 1)" />
    return (
        <View style={labelPosition === 'V' ? styles.filterBoxContainerVertical : styles.filterBoxContainerHorizontal}>
            <CustomeDropDown
                selectedValue={filterType}
                dropdownItems={filterTypes}
                setSelectedValue={setFilterType}
                open={filterTypemModalIsOpen}
                setOpen={setFilterTypeModalIsOpen}
                minWidth={175}
                onpress={handleOnpressFilterItem}
                leftIcon={leftIcon}
            />
            <Text style={{ marginTop: size12 }}>Filter</Text>
        </View>
    )
}

export default FilterDropdown