import {StyleSheet} from "react-native";
import {DarkColors, DefaultColors} from "../../styles/colors";

export function getStyles(theme) {
    const Colors = theme === "dark" ? DarkColors : DefaultColors;

    return StyleSheet.create({
        listBackground: {
            flexGrow: 1,
            backgroundColor: Colors.listBackground,
            borderTopWidth: 0.5,
            borderColor: Colors.border,
        },
        listStatusMessage: {
            color: Colors.foreground,
            marginVertical: 1,
            padding: 16,
            textAlign: "center",
        },
        listItemSeparator: {
            backgroundColor: Colors.border,
            height: 1,
            width: "100%",
        },
        itemBackground: {
            backgroundColor: Colors.background,
            padding: 16,
        },
        itemPressedOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: Colors.foreground,
        },
        itemTitle: {
            color: Colors.foreground,
            fontSize: 20,
        },
        itemAuthor: {
            color: Colors.foreground,
        },
    });
}

export default getStyles;
