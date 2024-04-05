import { StyleSheet, Dimensions } from "react-native";
export const screenWidth = Dimensions.get('window').width;

console.log("screenWidth *.82", screenWidth * .82);



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: Math.floor(screenWidth * .86), // Adjust the width as needed
        height: Math.floor(screenWidth * .86),
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 35,
    },
    cardStyle: {
        // width: Math.floor(screenWidth *.82), 
        width: 360,
        flex: 1, // Adjust the width as needed
        //   height: '84%',
        //   display: 'flex',
        //   justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        // padding: 9,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5
    },

    chartSelctorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
        marginTop: 72
    },
    chartContainer: {
        width: '100%',
        alignItems: 'center'
    },
    dashboardContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
      },
      imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30
      },
      dashboardChartContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 75
      },
      
});
