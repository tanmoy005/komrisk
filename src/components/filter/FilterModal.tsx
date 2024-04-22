import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import CardContainer from '../cards/CardContainer';
import CardTextContainer from '../cards/CardTextContainer';
import FilterDropdown from './FilterDropdown';
import { FilterModalProps } from '@/src/types';
import ChartUserFilter from './ChartUserFilter';
import { screenWidth, styles } from '@/src/style';
import ChartDataFilter from './ChartDataFilter';
import ChartFilter from './ChartFilter';
import Button from '../Button';


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
  selectedTab }: FilterModalProps) => {


  console.log("Filter Type", filterType)

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
              <Text style={styles.textStyle}>X</Text>
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
                            filterType={filterType}
                            filterTypes={filterTypes}
                            setFilterType={setFilterType}
                            filterTypemModalIsOpen={filterTypemModalIsOpen}
                            setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                          />
                          : null
                      }

                      {
                        modalVisible && filterType === 'Chart Data' ?
                          <ChartDataFilter
                            filterType={filterType}
                            filterTypes={filterTypes}
                            setFilterType={setFilterType}
                            filterTypemModalIsOpen={filterTypemModalIsOpen}
                            setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                          />
                          : null
                      }
                      {
                        modalVisible && filterType === 'Chart Filter' ?
                          <ChartFilter
                            filterType={filterType}
                            filterTypes={filterTypes}
                            setFilterType={setFilterType}
                            filterTypemModalIsOpen={filterTypemModalIsOpen}
                            setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
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