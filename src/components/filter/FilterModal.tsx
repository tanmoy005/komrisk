import CardContainer from '@/src/components/cards/CardContainer';
import CardTextContainer from '@/src/components/cards/CardTextContainer';
import ChartDataFilter from '@/src/components/filter/ChartDataFilter';
import ChartUserFilter from '@/src/components/filter/ChartUserFilter';
import FilterDropdown from '@/src/components/filter/FilterDropdown';
import { screenWidth, styles } from '@/src/style';
import { FilterModalProps } from '@/src/types';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';

import ChartFilter from '@/src/components/filter/ChartFilter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterModal = ({ setModalVisible,
  modalVisible,
  filterType,
  filterTypes,
  setFilterType,
  filterTypemModalIsOpen,
  setFilterTypeModalIsOpen,
  chartFilterPayload,
  reportType,
  setChartFilterPayload,
  selectedTab,
  setChartUserFilterPayload,
  chartUserFilterPayload,
  setChartDataFilterPayload,
  chartDataFilterPayload
}: FilterModalProps) => {


  return (
    <View style={styles.centeredView}>
      <Modal
        style={{ width: '100%' }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close"
                size={25} color={"black"}
              />
            </Pressable>
            <View style={{ ...styles.dashboardContainer, marginTop: 23, width: (screenWidth * 0.75) }}>
              <View style={styles.chartContainer}>
                <View style={{ ...styles.taskCard, position: 'relative', borderWidth: 0, width: (screenWidth * 0.85), height: '100%', alignItems: 'stretch' }}>
                  <CardContainer >
                    <CardTextContainer styles={{ position: 'relative', height: '100%' }}>
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
                          <ChartUserFilter
                            setModalVisible={setModalVisible}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                            setUserFilterPayload={setChartUserFilterPayload}
                            chartUserFilterPayload={chartUserFilterPayload}
                          />
                          : null
                      }

                      {
                        modalVisible && filterType === 'Chart Data' && reportType === "COMPLIANCE" ?
                          <ChartDataFilter
                            setModalVisible={setModalVisible}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                            setDataFilterPayload={setChartDataFilterPayload}
                            chartDataFilterPayload={chartDataFilterPayload}
                          />
                          : null
                      }
                      {
                        modalVisible && filterType === 'Chart Filter' ?
                          <ChartFilter
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                            setChartFilterPayload={setChartFilterPayload}
                            setModalVisible={setModalVisible}
                          />
                          : null
                      }
                    </CardTextContainer>

                  </CardContainer>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default FilterModal;