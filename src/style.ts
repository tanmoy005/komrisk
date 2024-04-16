import { StyleSheet, Dimensions } from "react-native";
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

console.log("screenWidth", screenWidth);
export const smFont = 14;
const circle1Size = Math.floor(screenWidth * .076);
export const skeltonwidth = Math.floor(screenWidth * .82);
const profileImageContainerSize = Math.floor(screenWidth * 0.2);
export const size12 = Math.floor(screenWidth * 0.033);
const size33 = Math.floor(screenWidth * 0.09);
const size13 = Math.floor(screenWidth * 0.03);
const size15 = Math.floor(screenWidth * 0.04);
const size39 = Math.floor(screenWidth * 0.01);
export const filterIconBoxheight = Math.floor(screenWidth * 0.118);
const filterIconBoxWidth = Math.floor(screenWidth * 0.125);
export const size24 = Math.floor(screenWidth * 0.06);
export const size136 = Math.floor(screenWidth * 0.314814814815);

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
export const profileImageSize = Math.floor(screenWidth * .133);
export const styles: { [key: string]: any } = StyleSheet.create({
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
    cardContainer2: {
        padding: Math.floor(screenWidth * .06),
        // height: Math.floor(screenHeight)
    },
    cardContainer3: {
        padding: Math.floor(screenWidth * .044),
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
    cardStyle2: {
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
    profileImageContainer: {
        // padding: Math.floor(screenWidth * 0.333),
        padding: 10,
        borderColor: '#F5F5F5',
        borderWidth: 2,
        width: profileImageContainerSize,
        height: profileImageContainerSize,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: profileImageSize,
        height: profileImageSize
    },
    chartSelctorContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // width: '75%',
        // marginTop: 72
    },
    chartContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    taskCard: {

        // boxShadow: '4px 4px 40px 0px #786ACD1F'
        borderWidth: 1,
        borderColor: 'rgba(120, 106, 205, 0.4)',
        borderRadius: 5,
        shadowColor: 'rgba(120, 106, 205, 0.12)', // Shadow color with opacity
        shadowOffset: { width: 4, height: 4 }, // Shadow offset (horizontal and vertical)
        shadowOpacity: 1, // Shadow opacity (1 is fully opaque)
        shadowRadius: 10

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
    divider1: {
        // borderColor:'rgba(38, 38, 44, 0.24)'
        borderColor: 'rgba(38, 38, 44, 0.24)',
        borderWidth: .5
    },
    profileInputFiledRowContainer: {
        flexDirection: 'row',
        rowGap: 3,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    ,
    profileFormContainer: {
        rowGap: size15
    },
    text1: {
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: '400',
        fontSize: 12
    },
    input: {
        borderColor: '#D9D9D9',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%'
    },
    inputType1: {
        padding: size13,
        height: size33,
        color: '#99A3A4',

    },
    inputType2: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        color: '#B6B6B9',
        backgroundColor: '#fff'
    },
    inputType3: {
        // width: '60%',
        width: 150,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: '#fff',
        borderWidth: 0.9,
        borderColor: '#000000',
        color: '#000000'
    },
    profileInputFieldContainer: {
        width: '75%'
    },
    dashboardFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    filterIconContainer: {
        alignItems: 'center'
    },
    filterIconBoxContainer: {

        // paddingHorizontal: size8,
        // paddingHorizontal: size8,
        justifyContent: 'center',
        alignItems: 'center',
        height: filterIconBoxheight,
        width: filterIconBoxWidth,
        backgroundColor: 'rgba(235, 246, 251, 1)',
        // width: '100%',
        borderRadius: 3,
        // fontSize: size24
    },
    filterIcon: {
        color: 'rgba(151, 151, 154, 1)'
    },
    dropdownPicker: {
        width: size136,
        alignItems: 'center'
    },
    chartfilterFieldStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        right: 0
    },
    chartFilterFieldLabelContainer: {
        textAlign: 'left',
        alignSelf: 'center'
    }

});
