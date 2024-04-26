// import { Link, Stack } from 'expo-router';
// import { StyleSheet } from 'react-native';
// import { Text, View } from '@/src/components/Themed';
// import PushNotificationExample from '../../Notification/PushNotificationExample';
// import AccordianCommonHeader from '../../../components/accordians/AccordianCommonHeader';
// import React, { useState,useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';

// export default function NotFoundScreen() {
//   // const [comments, setComments] = useState([]);

//   // useEffect(() => {
//   //   const loadCommentsFromStorage = async () => {
//   //     try {
//   //       const storedComments = await AsyncStorage.getItem('commentsString');
//   //       console.log("storedComments",storedComments);

//   //       if (storedComments !== null) {
//   //         setComments(JSON.parse(storedComments));
//   //       } else {
//   //         console.log('No comments stored.');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error loading comments from AsyncStorage:', error);
//   //     }
//   //   };

//   //   loadCommentsFromStorage();
//   // }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

//   // useEffect(() => {     
//   // }, [comments]);




//   // useEffect(() => {
//   //   // Fetch comments from AsyncStorage
//   //   AsyncStorage.getItem('comments').then((storedComments) => {
//   //     if (storedComments) {
//   //       setComments(JSON.parse(storedComments));
//   //     }
//   //   });
//   // }, []);


//   return (
//     <>
//       <Stack.Screen options={{ title: 'Advanced Reports' }} />
//       <View style={styles.container}>
//         <Text style={styles.title}>This screen is under construction.</Text>

//         <AccordianCommonHeader
//           title="Your Title 1"
//           descriptions="Your Description 1"
//           icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//           expanded={true}
//           setExpanded={() => { }}
//           type="comment"
//           taskId= {113}
//         />

//         {/* <View style={{ height: 20 }} />

//         <AccordianCommonHeader
//           title="Your Title 2"
//           descriptions="Your Description 2"
//           icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//           expanded={true}
//           setExpanded={() => { }}
//           type="comment"
//           taskId="114"
//         /> */}

//         {/* <PushNotificationExample /> */}
//         {/* <Link href="/" style={styles.link}>
//           <Text style={styles.linkText}>Go to home screen!</Text>
//         </Link> */}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
//   linkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });



//// Working

// import { Link, Stack } from 'expo-router';
// import { StyleSheet } from 'react-native';
// import { Text, View } from '@/src/components/Themed';
// import PushNotificationExample from '../../Notification/PushNotificationExample';
// import AccordianCommonHeader from '../../../components/accordians/AccordianCommonHeader';
// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/src/store'; // Assuming RootState is your root state type

// export default function NotFoundScreen() {
//   const [commentText, setCommentText] = useState("");
//   const [taskid, setTaskId] = useState(203)



//   const comments = useSelector((state: RootState) => state.comments.commentsList);

//   // useEffect(() => {
//   //   // You can access the comments array here
//   //   console.log('Comments from Redux:', comments);

//   // }, [taskid]);

//   useEffect(() => {
//     // You can access the comments array here
//     console.log('Comments from Redux:', comments);
//     const filteredComments = comments.filter(comment => comment[0].taskID === taskid);
//     console.log(filteredComments[0][0].commentText);
//     const gotfilteredComments = filteredComments[0][0].commentText
//     setCommentText(gotfilteredComments)

//   }, [taskid]);



//   //console.log("************",comments[0][0].commentText);



//   return (
//     <>
//       <Stack.Screen options={{ title: 'Advanced Reports' }} />
//       <View style={styles.container}>
//         <Text style={styles.title}>This screen is under construction.</Text>

//         {/* <AccordianCommonHeader
//           title="Your Title 1"
//           descriptions="Your Description 1"
//           icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//           expanded={true}
//           setExpanded={() => { }}
//           type="comment"
//           taskId= {113}
          

//         /> */}
//         {/* 
//         {comments.length > 0 ? (
//           comments.map((commentGroup, index) => (
//             <AccordianCommonHeader
//               key={index}
//               title={`Your Title ${index + 1}`}
//               descriptions={`Your Description ${index + 1}`}
//               icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//               expanded={true}
//               setExpanded={() => { }}
//               type="comment"
//               taskId={commentGroup[0].taskID || 0}
//               commenttext={commentGroup[0].commentText}
//             />
//           ))
//         ) : (
//           <AccordianCommonHeader
//             title="Your Title 1"
//             descriptions="Your Description 1"
//             icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//             expanded={true}
//             setExpanded={() => { }}
//             type="comment"
//             taskId={113}
//             commenttext=""
//           />
//         )} */}
//         <AccordianCommonHeader
//           title="Your Title 1"
//           descriptions="Your Description 1"
//           icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//           expanded={true}
//           setExpanded={() => { }}
//           type="comment"
//           taskId={103}
//           commenttext={commentText}
//         />
//         {/* <AccordianCommonHeader
//             title="Your Title 1"
//             descriptions="Your Description 1"
//             icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//             expanded={true}
//             setExpanded={() => { }}
//             type="comment"
//             taskId={103}
//             commenttext={commentText}
//           /> 
//           <AccordianCommonHeader
//           title="Your Title 1"
//           descriptions="Your Description 1"
//           icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//           expanded={true}
//           setExpanded={() => { }}
//           type="comment"
//           taskId={203}
//           commenttext={commentText}
//         /> */}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
//   linkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });



import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import PushNotificationExample from '../../notification/PushNotificationExample';

export default function NotFoundScreen() {



  return (
    <>
      <Stack.Screen options={{ title: 'Advanced Reports' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen is under construction.</Text>





        <PushNotificationExample />
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});