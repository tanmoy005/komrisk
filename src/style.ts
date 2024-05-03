import { StyleSheet, Dimensions, PixelRatio } from "react-native";

export const screenWidth = Math.floor(Dimensions.get('window').width);
export const screenHeight = Math.floor(Dimensions.get('window').height);

const SCALE = 350;
const scaleFontSize = (fontSize: any) => {
    const ratio = fontSize / SCALE;
    const newSize = Math.round((screenWidth * ratio));
    return newSize;
};
export const scaleCardSize = (size: number) => {
    const scaleFactor = .9;
    return Math.round(size * scaleFactor);
};

// export const smFont = scaleFontSize(14);
export const smFont = scaleFontSize(9);
const circle1Size = Math.floor(screenWidth * .076);
export const skeltonwidth = Math.floor(screenWidth * .82);
const profileImageContainerSize = Math.floor(screenWidth * 0.2);
export const size12 = Math.floor(screenWidth * 0.033);
// const size33 = Math.floor(screenWidth * 0.09);
// const size13 = Math.floor(screenWidth * 0.03);
const size33 = Math.floor(screenHeight * 0.04);
const size13 = Math.floor(screenHeight * 0.009);
const size15 = Math.floor(screenWidth * 0.04);
const size39 = Math.floor(screenWidth * 0.01);
export const filterIconBoxheight = Math.floor(screenWidth * 0.110);
const filterIconBoxWidth = Math.floor(screenWidth * 0.120);
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
    // backgroundColor: '#000'
}
const taskCardContainer = {
    padding: 8
}
export const headerColor = {
    backgroundColor: '#F6EEF4'
}
const containerPd10 = {
    // width: '100%',
    padding: 10,
}

export const profileImageSize = Math.floor(screenWidth * .133);
export const styles: { [key: string]: any } = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageSectioncontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 60,
        width: '100%',
    },
    cardContainer: {
        width: Math.floor(screenWidth * .86), // Adjust the width as needed
        height: Math.floor(screenWidth * .86),
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 30,
    },
    cardContainer2: {
        padding: Math.floor(screenWidth * .06),
        // height: Math.floor(screenHeight)
    },
    cardContainer3: {
        padding: Math.floor(screenWidth * .044),
        // height: Math.floor(screenHeight)
    },
    getDetailsContainer: containerPd10,
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
        ...taskCardContainer,
        borderRadius: 10
    },
    title: {
        fontWeight: '500',
        fontSize: scaleFontSize(14),
        marginBottom: 5,
    },

    title1: {
        fontWeight: '500',
        fontSize: scaleFontSize(14),
        marginBottom: 5,
        textAlign: 'center'
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,

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
    bigprofileImageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: profileImageSize,
        height: profileImageSize
    },
    chartContainer: {
        ...containerPd10,
        alignItems: 'center'
    },
    chartLabel: {
        fontSize: scaleFontSize(12)
    },
    taskCard: {

        // boxShadow: '4px 4px 40px 0px #786ACD1F'
        borderWidth: 1,
        borderColor: 'rgba(120, 106, 205, 0.4)',
        borderRadius: 5,
        shadowColor: 'rgba(120, 106, 205, 0.12)', // Shadow color with opacity
        shadowOffset: { width: 4, height: 4 }, // Shadow offset (horizontal and vertical)
        shadowOpacity: 1, // Shadow opacity (1 is fully opaque)
        shadowRadius: 10,
        width: 'auto',
    },
    taskCardContainer: {
        ...taskCardContainer
    },
    expandSectionHeaderContainer: {
        padding: 28,
        paddingBottom: 0,
        rowGap: 8
    },
    commentContainer: {
        width: '100%',
        ...taskCardContainer,
        backgroundColor: '#A097DC29',
        color: '#eee',
        borderRadius: 5,
        rowGap: 14
    },
    expandSectionHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    accodianHeaderContainer2: {
        // width: '100%',

        backgroundColor: '#A097DC29',
        color: '#eee',
        borderRadius: 5,
        height: 100,
        padding: 14
    },
    cardTextContainer: cardTextContainer,
    titleContainer: {
        // ...cardTextContainer,
        paddingHorizontal: 14,
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '100%',
        // width: '100%',
        color: '#eee',
        height: 100,
        // backgroundColor: '#A097DC29',
        borderRadius: 5,
        position: 'relative',
    },
    accordTitle: {
        ...commonFontStyle,
        color: '#58595B',
        fontWeight: '600',
        lineHeight: 16,
    },
    shortDescription: {
        ...commonFontStyle,
        lineHeight: 16,
        fontWeight: '400',
        paddingRight: 60,
        height: 16,
        overflow: 'hidden'
    },
    description: {
        ...commonFontStyle,
        lineHeight: 16,
        fontWeight: '400'
    },
    bodyInfoText: {
        fontSize: scaleFontSize(9),
        opacity: 0.64,
        overflow: 'hidden',
        color: '#58595B'
    },
    commentInputContainer: {
        // width: Math.floor(screenWidth * .82)
        width: '88%',
        height: 40
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
    pendingTaskOverViewSubmit: {
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        bottom: 80,
        justifyContent: 'space-around',
        left: 16,
    },
    tabBarStyle: {
        height: screenHeight * 0.115,
        backgroundColor: "#F1F1F1"
    },
    tabBarLabelStyle: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 16,
        textAlign: 'center',
        color: '#fff',
    },
    tabBarItemStyle: {
        marginBottom: 5,
        borderRadius: 6,
        margin: 5,
        padding: 10,
        backgroundColor: "#fff",

    },
    tabBarIconStyle: {
        padding: 1
    },
    dashboardContainer: {
        flex: 1,
        // alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // marginBottom: 30
        height: screenHeight * 0.1
    },
    dashboardChartContainer: {
        width: '100%',
        justifyContent: 'center',
        // marginTop: 75
        // marginTop: screenHeight * 0.05
        height: screenHeight * 0.58,
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
    },
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
    datePickerLabelContainer: {
        flexDirection: 'row',
        paddingVertical: 0,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(235, 246, 251, 1)',
        height: 49.90,
        alignItems: 'center',
    },
    profileInputFieldContainer: {
        width: '75%'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#5645C0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold'
    },
    designation: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14,
        color: '#26262C'
    },
    userTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 5,
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(120, 106, 205, 0.48)'
    },
    //   profileImageContainer: {
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //   },
    dashboardFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        columnGap: 30,
        height: screenHeight * 0.12
    },
    filterBoxContainerHorizontal: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterBoxContainerVertical: {
        alignItems: 'flex-start'
    },
    filterIconBoxContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        height: filterIconBoxheight,
        width: filterIconBoxWidth,
        backgroundColor: 'rgba(235, 246, 251, 1)',
        borderRadius: 3,
    },
    filterIcon: {
        color: 'rgba(151, 151, 154, 1)'
    },
    dropdownPicker: {
        width: size136,
        alignItems: 'center',
        backgroundColor: 'rgba(235, 246, 251, 1)',
        borderColor: 'rgba(235, 246, 251, 1)',
        paddingHorizontal: 12,
        paddingVertical: 3
    },
    dropdownListContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(186, 186, 186, 1)',
        maxHeight: 'auto',
        paddingHorizontal: 16,
    },
    dropdownItemContainer: {
        flexDirection: 'row',
        // paddingHorizontal: 16,
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderColor: 'rgba(223, 223, 223, 1)'
    },
    dropdownItem: {
        flexDirection: 'row'
    },
    directionRowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
    },
    btnFilterHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        columnGap: 32,
        paddingLeft: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: screenWidth,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 60
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    closeButton: {
        height: scaleCardSize(34),
        width: scaleCardSize(34),
        backgroundColor: 'red'
    },
    textStyle: {
        color: 'rgba(38, 38, 44, 1)',
        textAlign: 'right',
        fontSize: scaleFontSize(14)
    },
    textStyle2: {
        color: 'rgba(38, 38, 44, 1)',
        fontSize: scaleFontSize(12),
        fontWeight: '400',
        lineHeight: 14
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    defaultSeperator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }

});
