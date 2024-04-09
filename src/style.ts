import { StyleSheet, Dimensions } from "react-native";
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

console.log("screenWidth *.82", screenWidth * .82);
export const smFont = 14;
const circle1Size = Math.floor(screenWidth * .076);

const commonFontStyle = {
    fontSize: smFont,
    color: '#58595B',
    // fontFamily: 'Barlow'
}
const cardTextContainer = {
    paddingHorizontal: 9,
    paddingVertical: 3,
}
const taskCardContainer = {
    padding: 8
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // cardContainer2:{
    //     // width: Math.floor(screenWidth * .93), // Adjust the width as needed
    //     width: '100%', // Adjust the width as needed

    //     margin: 'auto',
    //     // height: Math.floor(screenHeight * .86),
    //     // width: '100%', // Adjust the width as needed
    //     // height: Math.floor(screenHeight * .90),
    //     height: Math.floor(screenHeight * .90),
    //     display: 'flex',
    //     justifyContent: 'space-around',
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     ...taskCardContainer
    //     // padding: 35,
    // },
    cardContainer: {
        width: Math.floor(screenWidth * .86), // Adjust the width as needed
        height: Math.floor(screenWidth * .86),
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 35,
    },
    cardContainer2: {
        padding: Math.floor(screenWidth * .06),
        // height: Math.floor(screenHeight)
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
    cardStyle2:{
        // width: Math.floor(screenWidth * .86), // Adjust the width as needed
        // height: Math.floor(screenWidth * .86),
        // display: 'flex',
        // justifyContent: 'space-around',
        // backgroundColor: '#F5F5F5',
        // padding:8,
        ...taskCardContainer,
        borderRadius: 10,
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
        alignItems: 'center',
        padding: 10
    },
    taskCardContainer: {
        ...taskCardContainer
    },
    accodianHeaderContainer: {
        // width: '100%',
        ...taskCardContainer,
        backgroundColor: '#A097DC29',
        color: '#eee',
        flex: 1,
        borderRadius: 5
    },
    cardTextContainer: cardTextContainer,
    titleContainer: {
        ...cardTextContainer,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: '#eee',
    },
    accordTitle: {
        ...commonFontStyle,
        fontWeight: '600',
        lineHeight: 24,
    },
    shortDescription: {
        ...commonFontStyle,
        lineHeight: 16,
        fontWeight: '400',
        paddingRight: 60,
        height: 16,
        overflow: 'hidden'
    },
    bodyInfoText: {
        ...commonFontStyle,
        opacity: 0.64
    },
    commentInputContainer: {
        // width: Math.floor(screenWidth * .82)
        width: '88%'
    },
    circle: {
        width: circle1Size,
        height: circle1Size,
        backgroundColor: '#D9D9D9',
        borderRadius: circle1Size / 2,
    },
    taskCardBottomRightSection: {
        alignItems: 'center',
        rowGap: 6
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
