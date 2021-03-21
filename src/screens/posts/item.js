import React, {useEffect} from "react";
import {Text, View, useColorScheme} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, UserLoadStatus} from "../../reducers/users";
import getStyles from "./styles";

export function PostItem(props) {
    const styles = getStyles(useColorScheme());
    const dispatch = useDispatch();
    const post = useSelector(state =>
        state.posts.posts.find(x => x.id === props.postId),
    );
    const user = useSelector(state =>
        state.users.users.find(x => post != null && x.id === post.userId),
    );

    // If we can't find the user in our store,
    // try and fetch the user.
    useEffect(() => {
        if (post != null && user == null) {
            dispatch(fetchUser(post.userId));
        }
    });

    if (post == null) {
        // Don't render anything if the postId is invalid
        return <View />;
    }

    const authorText = () => {
        // Only show the author when we've (successfully) fetched the user.
        if (user != null && user.loadStatus.status === UserLoadStatus.Ready) {
            return <Text style={styles.itemAuthor}>by {user.name}</Text>;
        }
    };

    return (
        <View style={styles.itemBackground}>
            <Text style={styles.itemTitle}>{post.title}</Text>
            {authorText()}
        </View>
    );
}
