import React from "react";
import {FlatList, Pressable, Text, View, useColorScheme} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, PostStatus} from "../../reducers/posts";
import {PostItem} from "./item";
import getStyles from "./styles";

export function PostList({navigation}) {
    const styles = getStyles(useColorScheme());
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);

    const getStatusMessage = () => {
        if (status === PostStatus.Loading) {
            return "Loading...";
        } else if (status === PostStatus.Failed) {
            return "Failed to retrieve posts - pull down to retry";
        } else {
            return "There are no posts!";
        }
    };

    const renderPressablePostItem = ({item}) => {
        return (
            <Pressable
                onPress={() =>
                    navigation.navigate("Detailed", {postId: item.id})
                }>
                {({pressed}) => {
                    const postItem = <PostItem postId={item.id} />;
                    // If pressed, highlight the button
                    // by using a bright semitransparent overlay
                    if (pressed) {
                        return (
                            <>
                                {postItem}
                                <View style={styles.itemPressedOverlay} />
                            </>
                        );
                    } else {
                        return postItem;
                    }
                }}
            </Pressable>
        );
    };

    const postsInReverseIdOrder = [...posts].sort((x, y) => y.id > x.id);

    const listItemSeparator = () => {
        return <View style={styles.listItemSeparator} />;
    };

    return (
        <View style={styles.listBackground}>
            <FlatList
                data={postsInReverseIdOrder}
                renderItem={renderPressablePostItem}
                refreshing={status === PostStatus.Loading}
                onRefresh={() => dispatch(fetchPosts())}
                ListEmptyComponent={
                    <Text style={styles.listStatusMessage}>
                        {getStatusMessage()}
                    </Text>
                }
                ItemSeparatorComponent={listItemSeparator}
            />
        </View>
    );
}
