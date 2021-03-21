import {StyleSheet} from "react-native";
import {DarkColors, DefaultColors} from "../../styles/colors";

export function getStyles(theme) {
    const Colors = theme === "dark" ? DarkColors : DefaultColors;
    return StyleSheet.create({
        header: {
            paddingHorizontal: 16,
            paddingTop: 16,
        },
        title: {
            color: Colors.foreground,
            fontSize: 20,
            fontWeight: "bold",
        },
        author: {
            color: Colors.foreground,
        },
        body: {
            color: Colors.foreground,
            paddingHorizontal: 16,
        },
        separator: {
            backgroundColor: Colors.border,
            height: 1,
            width: "95%",
            alignSelf: "center",
            marginVertical: 8,
        },
        errorMessage: {
            color: Colors.foreground,
            textAlign: "center",
        },
        errorBackground: {
            backgroundColor: Colors.background,
            borderTopWidth: 0.5,
            borderColor: Colors.border,
            flexGrow: 1,
        },
        background: {
            backgroundColor: Colors.background,
            borderTopWidth: 0.5,
            borderColor: Colors.border,
        },
    });
}

export default getStyles;
