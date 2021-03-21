import React, {useEffect} from "react";
import {ScrollView, Text, View, useColorScheme} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {PostStatus, fetchPost} from "../../reducers/posts";
import {fetchUser} from "../../reducers/users";
import getStyles from "./styles";

export function DetailedPost({route}) {
    const styles = getStyles(useColorScheme());
    const dispatch = useDispatch();
    const {postId} = route.params;
    const post = useSelector(state =>
        state.posts.posts.find(x => x.id === postId),
    );
    const user = useSelector(state =>
        state.users.users.find(x => post != null && x.id === post.userId),
    );

    useEffect(() => {
        // Fetch the post or user if they aren't in our store yet.
        // We must fetch the post before we can fetch the user.
        if (post == null) {
            dispatch(fetchPost(postId));
        } else if (user == null) {
            dispatch(fetchUser(post.userId));
        }
    });

    if (post == null) {
        // If for whatever reason we can't load the post,
        // show an error message.
        // This should never happen.
        return (
            <View style={styles.errorBackground}>
                <Text style={styles.errorMessage}>
                    Failed to load the post! (id: {postId})
                </Text>
            </View>
        );
    }

    const authorInfo = () => {
        // Only render the author if the user has been fetched.
        if (user != null && user.loadStatus.status === PostStatus.Ready) {
            return (
                <Text style={styles.author}>
                    by {user.name} ({user.username})
                </Text>
            );
        }
    };

    return (
        <ScrollView style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.title}>{post.title}</Text>
                {authorInfo()}
            </View>
            <View style={styles.separator} />
            <Text style={styles.body}>{post.body}</Text>
        </ScrollView>
    );
}
