import { size12, styles } from '@/src/style'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import DropDown from '../Dropdown'
import { FilterDropdownProps } from '@/src/types'


const FilterDropdown = ({
    filterType,
    setFilterType,
    filterTypes,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen,
    labelPosition = 'V',
    handleOnpressFilterItem
}: FilterDropdownProps) => {

    return (
        <View style={labelPosition === 'V' ? styles.filterBoxContainerVertical : styles.filterBoxContainerHorizontal}>
            <DropDown
                selectedValue={filterType}
                dropdownItems={filterTypes}
                setSelectedValue={setFilterType}
                open={filterTypemModalIsOpen}
                setOpen={setFilterTypeModalIsOpen}
                minWidth={175}
                onpress={handleOnpressFilterItem}
            />
            <Text style={{ marginTop: size12 }}>Filter</Text>
        </View>
    )
}

export default FilterDropdown