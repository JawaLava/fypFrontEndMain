import { StyleSheet } from "react-native";

export default Theme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey"
    },
    Heading: {
        fontSize: 22,
        textAlign: "center",
        marginVertical: 20,
        color: '#000044',
        fontWeight: "bold"
    },
    MidBox: {
        paddingVertical:40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        marginHorizontal: 50,
        borderRadius: 20,
        rowGap: 30,
        marginTop: 20
    },
    HowText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    Bottom:{
        flex:1,
        marginTop:40,
        marginHorizontal:20,
        rowGap:20
    },
    bottomText:{
        color: 'grey',
        fontSize:20
    },
    loaderContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})