
import { FilterModalProps } from "../types";
import { View } from "react-native";
import { screenWidth, styles } from "../style";
import CardContainer from "../components/cards/CardContainer";
import CardTextContainer from "../components/cards/CardTextContainer";
import FilterDropdown from "../components/filter/FilterDropdown";
import CustomModal from "../components/CustomModal";
import ChartUserFilter from "../components/filter/ChartUserFilter";



const FilterTypeModal = ({
    setModalVisible,
    modalVisible,
    filterType,
    filterTypes,
    setFilterType,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen,
    chartFilterPayload,
    reportType,
    selectedTab
}: FilterModalProps) => {


    return (
        <View style={{ ...styles.dashboardContainer, marginTop: 23, width: (screenWidth * 0.75) }}>
            <View style={styles.chartContainer}>
                <View style={{ ...styles.taskCard, borderWidth: 0, width: (screenWidth * 0.85), height: '100%', alignItems: 'stretch' }}>
                    <CardContainer>
                        <CardTextContainer styles={{ position: 'relative' }}>
                            <View style={{ zIndex: 2119 }}>
                                <FilterDropdown
                                    filterType={filterType}
                                    setFilterType={setFilterType}
                                    filterTypes={filterTypes}
                                    filterTypemModalIsOpen={filterTypemModalIsOpen}
                                    setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                                    labelPosition='H'
                                />
                            </View>

                            {
                                modalVisible && filterType === 'Chart User' ?
                                    <CustomModal
                                        setModalVisible={setModalVisible}
                                        modalVisible={modalVisible}
                                        component={
                                            <ChartUserFilter
                                                filterType={filterType}
                                                filterTypes={filterTypes}
                                                setFilterType={setFilterType}
                                                filterTypemModalIsOpen={filterTypemModalIsOpen}
                                                setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                                                chartFilterPayload={chartFilterPayload}
                                                reportType={reportType}
                                                selectedTab={selectedTab}
                                            />
                                        }
                                    />
                                    : null
                            }
                        </CardTextContainer>
                      
                    </CardContainer>
                </View>
            </View>
        </View>
    )
}

export default FilterTypeModal